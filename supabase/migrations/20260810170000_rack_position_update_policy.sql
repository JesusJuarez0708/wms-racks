/*
FASE 23.3 — Política UPDATE para rack_positions

Objetivo:

Permitir que el Laboratorio Operativo CJWMS actualice
las capacidades físicas de posiciones existentes.

La tabla rack_positions tiene RLS habilitado y actualmente
dispone de políticas SELECT e INSERT para el rol anon,
pero no de UPDATE.

Esta política permite actualizar posiciones durante el
Seeder reproducible del ambiente de desarrollo.
===========================================================
*/

begin;

drop policy if exists dev_update_rack_positions
on public.rack_positions;

create policy dev_update_rack_positions
on public.rack_positions
for update
to anon
using (true)
with check (true);

commit;
