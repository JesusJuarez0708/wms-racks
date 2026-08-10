/*
===========================================================
FASE 23.3B — Capacidad física de posiciones de rack
===========================================================

Objetivo:

Ampliar el modelo persistente de rack_positions para
registrar restricciones físicas máximas de cada posición.

Estos datos permitirán validar posteriormente:

- altura máxima permitida para un pallet,
- peso máximo permitido por posición,
- compatibilidad física pallet ↔ ubicación,
- recomendaciones de ubicación físicamente seguras.

Los valores permanecen inicialmente opcionales para no
invalidar posiciones existentes ni inventar capacidades que
todavía no han sido definidas operacionalmente.

===========================================================
*/

begin;

alter table public.rack_positions
add column if not exists max_height_m numeric(10,4),
add column if not exists max_weight_kg numeric(18,4);

alter table public.rack_positions
drop constraint if exists rack_positions_max_height_positive;

alter table public.rack_positions
add constraint rack_positions_max_height_positive
check (
  max_height_m is null
  or max_height_m > 0
);

alter table public.rack_positions
drop constraint if exists rack_positions_max_weight_positive;

alter table public.rack_positions
add constraint rack_positions_max_weight_positive
check (
  max_weight_kg is null
  or max_weight_kg > 0
);

comment on column public.rack_positions.max_height_m is
'Altura máxima permitida para una unidad logística almacenada en esta posición, expresada en metros.';

comment on column public.rack_positions.max_weight_kg is
'Peso máximo operativo permitido para una unidad logística almacenada en esta posición, expresado en kilogramos.';

commit;
