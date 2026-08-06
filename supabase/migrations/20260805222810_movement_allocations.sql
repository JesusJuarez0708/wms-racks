/*
===========================================================
FASE 22.2.5
Modelo Persistente de Asignaciones de Surtido
Proyecto: CJWMS
===========================================================

Objetivo:

Registrar cómo se distribuye una solicitud de salida entre
uno o varios pallets, conservando trazabilidad cuantitativa
desde la planeación hasta la ejecución definitiva.

===========================================================
*/

begin;

create table if not exists public.movement_allocations (
  id uuid primary key default gen_random_uuid(),

  movement_id uuid not null,
  pallet_id uuid not null,
  inventory_id uuid,

  allocated_quantity numeric(18,4) not null,
  executed_quantity numeric(18,4) not null default 0,
  unit text not null,

  status text not null default 'planned',

  created_at timestamptz not null default now(),
  updated_at timestamptz,

  constraint movement_allocations_movement_fk
    foreign key (movement_id)
    references public.movements(id)
    on delete cascade,

  constraint movement_allocations_pallet_fk
    foreign key (pallet_id)
    references public.pallets(id)
    on delete restrict,

  constraint movement_allocations_inventory_fk
    foreign key (inventory_id)
    references public.inventory(id)
    on delete set null,

  constraint movement_allocations_status_check
    check (
      status in (
        'planned',
        'reserved',
        'executed',
        'cancelled',
        'failed'
      )
    ),

  constraint movement_allocations_allocated_quantity_positive
    check (allocated_quantity > 0),

  constraint movement_allocations_executed_quantity_non_negative
    check (executed_quantity >= 0),

  constraint movement_allocations_executed_not_greater_than_allocated
    check (executed_quantity <= allocated_quantity),

  constraint movement_allocations_unit_not_blank
    check (btrim(unit) <> ''),

  constraint movement_allocations_movement_pallet_unique
    unique (movement_id, pallet_id)
);

create index if not exists movement_allocations_movement_id_idx
  on public.movement_allocations(movement_id);

create index if not exists movement_allocations_pallet_id_idx
  on public.movement_allocations(pallet_id);

create index if not exists movement_allocations_inventory_id_idx
  on public.movement_allocations(inventory_id);

create index if not exists movement_allocations_status_idx
  on public.movement_allocations(status);

comment on table public.movement_allocations is
'Asignaciones cuantitativas de pallets asociadas a una solicitud de salida.';

comment on column public.movement_allocations.movement_id is
'Movimiento principal de salida al que pertenece la asignación.';

comment on column public.movement_allocations.pallet_id is
'Pallet seleccionado por el plan de surtido.';

comment on column public.movement_allocations.inventory_id is
'Registro de inventario reservado para ejecutar la asignación. Puede quedar nulo cuando el inventario sea eliminado por una salida total.';

comment on column public.movement_allocations.allocated_quantity is
'Cantidad planificada para surtir desde el pallet.';

comment on column public.movement_allocations.executed_quantity is
'Cantidad efectivamente descontada del pallet.';

comment on column public.movement_allocations.unit is
'Unidad de medida de la cantidad asignada y ejecutada.';

comment on column public.movement_allocations.status is
'Estado operativo de la asignación: planned, reserved, executed, cancelled o failed.';

alter table public.movement_allocations
enable row level security;

create policy dev_select_movement_allocations
on public.movement_allocations
for select
to anon
using (true);

create policy dev_insert_movement_allocations
on public.movement_allocations
for insert
to anon
with check (true);

create policy dev_update_movement_allocations
on public.movement_allocations
for update
to anon
using (true)
with check (true);

commit;