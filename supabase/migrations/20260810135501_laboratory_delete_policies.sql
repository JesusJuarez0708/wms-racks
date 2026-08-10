/*
===========================================================
FASE 23.2
Políticas DELETE para Reset del Laboratorio
Proyecto: CJWMS
===========================================================

Objetivo:

Permitir que el Reset Inteligente del Laboratorio Operativo
pueda eliminar de forma controlada los registros de:

- movements
- inventory
- pallets

Estas políticas son necesarias para que el rol anon pueda
ejecutar la limpieza selectiva implementada por el Seeder.

===========================================================
*/

begin;


drop policy if exists dev_delete_movements
on public.movements;

create policy dev_delete_movements
on public.movements
for delete
to anon
using (true);


drop policy if exists dev_delete_inventory
on public.inventory;

create policy dev_delete_inventory
on public.inventory
for delete
to anon
using (true);


drop policy if exists dev_delete_pallets
on public.pallets;

create policy dev_delete_pallets
on public.pallets
for delete
to anon
using (true);


commit;