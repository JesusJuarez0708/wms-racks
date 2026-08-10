/*
===========================================================
FASE 23.3 — Tara física del pallet
===========================================================

Objetivo:

Registrar el peso propio de la unidad logística vacía para
mantener coherencia entre cantidad de producto y peso actual
durante salidas parciales.

===========================================================
*/

begin;

alter table public.pallets
add column if not exists tare_weight_kg numeric(18,4);

alter table public.pallets
drop constraint if exists pallets_tare_weight_non_negative;

alter table public.pallets
add constraint pallets_tare_weight_non_negative
check (
  tare_weight_kg is null
  or tare_weight_kg >= 0
);

alter table public.pallets
drop constraint if exists pallets_current_weight_not_less_than_tare;

alter table public.pallets
add constraint pallets_current_weight_not_less_than_tare
check (
  current_weight_kg is null
  or tare_weight_kg is null
  or current_weight_kg >= tare_weight_kg
);

comment on column public.pallets.tare_weight_kg is
'Peso propio del pallet vacío, expresado en kilogramos.';

commit;
