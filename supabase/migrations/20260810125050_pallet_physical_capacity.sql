/*
===========================================================
FASE 23.2
Modelo Físico y Capacidad Operativa del Pallet
Proyecto: CJWMS
===========================================================


Objetivo:


Ampliar el modelo persistente de pallets para registrar
capacidad operativa, peso y dimensiones físicas de cada
unidad logística.


Estos datos permitirán validar posteriormente:


- consolidación de pallets parciales,
- compatibilidad física con posiciones de rack,
- límites de peso,
- altura máxima permitida,
- capacidad operativa por pallet.


===========================================================
*/


begin;


alter table public.pallets
add column if not exists max_quantity numeric(18,4),
add column if not exists current_weight_kg numeric(18,4),
add column if not exists max_weight_kg numeric(18,4),
add column if not exists width_m numeric(10,4),
add column if not exists length_m numeric(10,4),
add column if not exists height_m numeric(10,4);


alter table public.pallets
drop constraint if exists pallets_max_quantity_positive;

alter table public.pallets
add constraint pallets_max_quantity_positive
check (
  max_quantity is null
  or max_quantity > 0
);


alter table public.pallets
drop constraint if exists pallets_quantity_not_greater_than_max;

alter table public.pallets
add constraint pallets_quantity_not_greater_than_max
check (
  max_quantity is null
  or quantity is null
  or quantity <= max_quantity
);


alter table public.pallets
drop constraint if exists pallets_current_weight_non_negative;

alter table public.pallets
add constraint pallets_current_weight_non_negative
check (
  current_weight_kg is null
  or current_weight_kg >= 0
);


alter table public.pallets
drop constraint if exists pallets_max_weight_positive;

alter table public.pallets
add constraint pallets_max_weight_positive
check (
  max_weight_kg is null
  or max_weight_kg > 0
);


alter table public.pallets
drop constraint if exists pallets_current_weight_not_greater_than_max;

alter table public.pallets
add constraint pallets_current_weight_not_greater_than_max
check (
  current_weight_kg is null
  or max_weight_kg is null
  or current_weight_kg <= max_weight_kg
);


alter table public.pallets
drop constraint if exists pallets_width_positive;

alter table public.pallets
add constraint pallets_width_positive
check (
  width_m is null
  or width_m > 0
);


alter table public.pallets
drop constraint if exists pallets_length_positive;

alter table public.pallets
add constraint pallets_length_positive
check (
  length_m is null
  or length_m > 0
);


alter table public.pallets
drop constraint if exists pallets_height_positive;

alter table public.pallets
add constraint pallets_height_positive
check (
  height_m is null
  or height_m > 0
);


comment on column public.pallets.max_quantity is
'Cantidad máxima operativa permitida para el contenido de este pallet en su unidad registrada.';


comment on column public.pallets.current_weight_kg is
'Peso actual del pallet cargado, expresado en kilogramos.';


comment on column public.pallets.max_weight_kg is
'Peso máximo operativo soportado por este pallet, expresado en kilogramos.';


comment on column public.pallets.width_m is
'Ancho físico del pallet, expresado en metros.';


comment on column public.pallets.length_m is
'Largo físico del pallet, expresado en metros.';


comment on column public.pallets.height_m is
'Altura física actual del pallet cargado, expresada en metros.';


commit;