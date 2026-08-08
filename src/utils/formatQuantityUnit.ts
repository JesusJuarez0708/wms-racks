function normalizeUnit(unit: string | null | undefined): string {
  return (unit ?? '').trim().toUpperCase();
}

function getPluralUnit(unit: string): string {
  if (!unit) {
    return '';
  }

  const pluralUnits: Record<string, string> = {
    CAJA: 'CAJAS',
    PIEZA: 'PIEZAS',
    SACO: 'SACOS',
    TAMBOR: 'TAMBORES',
    PAQUETE: 'PAQUETES',
    CUBETA: 'CUBETAS',
  };

  return pluralUnits[unit] ?? unit;
}

export function formatQuantityUnit(
  quantity: number | null | undefined,
  unit: string | null | undefined
): string {
  if (quantity === null || quantity === undefined) {
    return '-';
  }

  const normalizedUnit = normalizeUnit(unit);

  if (!normalizedUnit) {
    return String(quantity);
  }

  const displayUnit =
    Math.abs(quantity) === 1
      ? normalizedUnit
      : getPluralUnit(normalizedUnit);

  return `${quantity} ${displayUnit}`;
}