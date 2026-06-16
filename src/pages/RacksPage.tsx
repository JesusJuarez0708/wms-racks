import { useEffect, useMemo, useRef, useState } from 'react';
import { racks } from '../data/racks';

import { getInventory, type InventoryItem } from '../services/inventoryService';
import { getRackPositions, type RackPosition } from '../services/rackPositionService';
import { getPallets, type Pallet } from '../services/palletService';
import { getProducts, type Product } from '../services/productService';
import { getMovements, type MovementItem } from '../services/movementService';

type Rack = (typeof racks)[number];

type LiveInventory = {
  inventory: InventoryItem;
  position: RackPosition;
  pallet: Pallet | undefined;
  product: Product | undefined;
};

function getProgressClass(percentage: number) {
  if (percentage >= 95) return 'bg-red-600';
  if (percentage >= 80) return 'bg-orange-500';
  if (percentage >= 60) return 'bg-amber-400';
  if (percentage > 0) return 'bg-blue-600';
  return 'bg-slate-300';
}

function getOperationalStatus(percentage: number) {
  if (percentage >= 95) return 'Lleno';
  if (percentage >= 80) return 'Crítico';
  if (percentage >= 60) return 'Alto uso';
  if (percentage > 0) return 'En uso';
  return 'Disponible';
}

function getOperationalStatusClass(percentage: number) {
  if (percentage >= 95) return 'bg-red-100 text-red-700';
  if (percentage >= 80) return 'bg-orange-100 text-orange-700';
  if (percentage >= 60) return 'bg-amber-100 text-amber-700';
  if (percentage > 0) return 'bg-blue-100 text-blue-700';
  return 'bg-emerald-100 text-emerald-700';
}

function obtenerCarrilDriveIn(location: string) {
  const partes = location.split('-');

  if (partes.length < 4) return null;

  return partes[1];
}

function obtenerNivelDriveIn(location: string) {
  const partes = location.split('-');

  if (partes.length < 4) return null;

  return partes[2];
}

function obtenerProfundidadDriveIn(location: string) {
  const partes = location.split('-');

  if (partes.length < 4) return 0;

  return Number(partes[3]);
}

function obtenerColorProducto(
  sku?: string | null,
  skusRack: string[] = []
) {
  if (!sku) {
    return {
      bg: 'bg-blue-600',
      border: 'border-blue-600',
      text: 'text-white',
    };
  }

  const colores = [
    { bg: 'bg-blue-600', border: 'border-blue-600', text: 'text-white' },
    { bg: 'bg-orange-500', border: 'border-orange-500', text: 'text-white' },
    { bg: 'bg-emerald-500', border: 'border-emerald-500', text: 'text-white' },
    { bg: 'bg-pink-500', border: 'border-pink-500', text: 'text-white' },
    { bg: 'bg-violet-500', border: 'border-violet-500', text: 'text-white' },
    { bg: 'bg-cyan-500', border: 'border-cyan-500', text: 'text-white' },
    { bg: 'bg-amber-500', border: 'border-amber-500', text: 'text-white' },
    { bg: 'bg-lime-600', border: 'border-lime-600', text: 'text-white' },
    { bg: 'bg-red-500', border: 'border-red-500', text: 'text-white' },
    { bg: 'bg-slate-700', border: 'border-slate-700', text: 'text-white' },
  ];

  const indexSku = skusRack.indexOf(sku);

  if (indexSku >= 0) {
    return colores[indexSku % colores.length];
  }

  return colores[0];
}

function RacksPage() {
  const zones = Array.from(new Set(racks.map((rack) => rack.zone)));

  const [activeZone, setActiveZone] = useState(zones[0]);
  const [selectedRack, setSelectedRack] = useState<Rack | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [showPositionModal, setShowPositionModal] = useState(false);
  const [locationSearch, setLocationSearch] = useState('');
  const [selectedCarril, setSelectedCarril] = useState<string | null>(null);
  const [loadingInventory, setLoadingInventory] = useState(true);

  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [rackPositions, setRackPositions] = useState<RackPosition[]>([]);
  const [pallets, setPallets] = useState<Pallet[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [movements, setMovements] = useState<MovementItem[]>([]);

  const detailRef = useRef<HTMLElement | null>(null);

  async function loadLiveInventory() {
    try {
      setLoadingInventory(true);

      const [inventoryData, positionsData, palletsData, productsData, movementsData] =
        await Promise.all([
          getInventory(),
          getRackPositions(),
          getPallets(),
          getProducts(),
          getMovements(),
        ]);

      setInventory(inventoryData);
      setRackPositions(positionsData);
      setPallets(palletsData);
      setProducts(productsData);
      setMovements(movementsData);
    } catch (error) {
      console.error('Error al cargar inventario vivo:', error);
    } finally {
      setLoadingInventory(false);
    }
  }

  function getLiveInventoryByLocation(locationCode: string): LiveInventory | null {
    const position = rackPositions.find((item) => item.code === locationCode);

    if (!position) return null;

    const latestInventoryByPallet = new Map<string, InventoryItem>();

    inventory
      .filter((item) => item.status === 'available')
      .forEach((item) => {
        const current = latestInventoryByPallet.get(item.pallet_id);

        const itemDate = item.updated_at ?? item.stored_at ?? '';
        const currentDate = current?.updated_at ?? current?.stored_at ?? '';

        if (!current || new Date(itemDate).getTime() > new Date(currentDate).getTime()) {
          latestInventoryByPallet.set(item.pallet_id, item);
        }
      });

    const inventoryItem =
      Array.from(latestInventoryByPallet.values()).find(
        (item) => item.rack_position_id === position.id
      ) ?? null;

    if (!inventoryItem) return null;

    const pallet = pallets.find((item) => item.id === inventoryItem.pallet_id);

    const product = products.find((item) => item.id === pallet?.product_id);

    return {
      inventory: inventoryItem,
      position,
      pallet,
      product,
    };
  }

  function getRackStats(rack: Rack) {
    const occupied = rack.locations.filter((location) =>
      getLiveInventoryByLocation(location)
    ).length;

    const available = rack.capacity - occupied;
    const percentage = Math.round((occupied / rack.capacity) * 100);

    return {
      occupied,
      available,
      percentage,
    };
  }

  function obtenerResumenCarriles(rack: Rack) {
    const resumen = new Map<
      string,
      {
        total: number;
        ocupados: number;
      }
    >();

    rack.locations.forEach((location) => {
      const carril = obtenerCarrilDriveIn(location);

      if (!carril) return;

      const actual = resumen.get(carril) ?? {
        total: 0,
        ocupados: 0,
      };

      actual.total += 1;

      if (getLiveInventoryByLocation(location)) {
        actual.ocupados += 1;
      }

      resumen.set(carril, actual);
    });

    return Array.from(resumen.entries()).map(([carril, datos]) => ({
      carril,
      total: datos.total,
      ocupados: datos.ocupados,
      libres: datos.total - datos.ocupados,
      porcentaje: Math.round((datos.ocupados / datos.total) * 100),
    }));
  }

  function obtenerCarrilRecomendado(rack: Rack) {
    const carriles = obtenerResumenCarriles(rack);

    const disponibles = carriles
      .filter((carril) => carril.porcentaje < 60)
      .sort((a, b) => {
        if (a.porcentaje !== b.porcentaje) {
          return a.porcentaje - b.porcentaje;
        }

        return b.libres - a.libres;
      });

    return disponibles[0] ?? null;
  }

  function obtenerRecomendacionesCarriles(rack: Rack) {
    const carriles = obtenerResumenCarriles(rack);

    const llenos = carriles.filter((carril) => carril.porcentaje >= 95);
    const criticos = carriles.filter(
      (carril) => carril.porcentaje >= 80 && carril.porcentaje < 95
    );
    const disponibles = carriles
      .filter((carril) => carril.porcentaje < 60)
      .sort((a, b) => a.porcentaje - b.porcentaje);

    const recomendaciones: string[] = [];

    llenos.forEach((carril) => {
      recomendaciones.push(
        `Línea ${carril.carril} está llena. Evita nuevas entradas en esta línea.`
      );
    });

    criticos.forEach((carril) => {
      recomendaciones.push(
        `Línea ${carril.carril} está en capacidad crítica. Se recomienda usar otra línea.`
      );
    });

    if (disponibles.length > 0 && (llenos.length > 0 || criticos.length > 0)) {
      recomendaciones.push(
        `Sugerencia operativa: usar Línea ${disponibles[0].carril}, tiene mayor disponibilidad.`
      );
    }

    if (recomendaciones.length === 0) {
      recomendaciones.push(
        'La distribución actual se encuentra estable. No hay alertas operativas relevantes.'
      );
    }

    return recomendaciones;
  }

  function obtenerLeyendaProductos(
    rack: Rack,
    carrilSeleccionado?: string | null
  ) {
    const locationsParaLeyenda =
      rack.zone === 'Drive In' && carrilSeleccionado
        ? rack.locations.filter(
            (location) => obtenerCarrilDriveIn(location) === carrilSeleccionado
          )
        : rack.locations;

    const inventarios = locationsParaLeyenda
      .map((location) => getLiveInventoryByLocation(location))
      .filter(Boolean) as LiveInventory[];

    const skusRack = Array.from(
      new Set(
        inventarios
          .map((item) => item.product?.sku)
          .filter(Boolean)
      )
    ) as string[];

    const resumen = new Map<
      string,
      {
        sku: string;
        descripcion: string;
        cantidad: number;
        color: ReturnType<typeof obtenerColorProducto>;
      }
    >();

    inventarios.forEach((item) => {
      const sku = item.product?.sku ?? 'SIN-SKU';
      const descripcion = item.product?.description ?? 'Producto no identificado';

      const actual = resumen.get(sku);

      if (actual) {
        actual.cantidad += 1;
        return;
      }

      resumen.set(sku, {
        sku,
        descripcion,
        cantidad: 1,
        color: obtenerColorProducto(sku, skusRack),
      });
    });

    const ocupadas = inventarios.length;

    return {
      productos: Array.from(resumen.values()),
      totalUbicaciones: locationsParaLeyenda.length,
      libres: locationsParaLeyenda.length - ocupadas,
    };
  }

  function obtenerOpinionUbicacion(liveInventory: LiveInventory | null) {
    if (!liveInventory) {
      return {
        titulo: 'Ubicación disponible',
        mensaje:
          'Esta posición está libre y puede utilizarse para nuevos ingresos según la recomendación del sistema.',
        clase: 'border-emerald-200 bg-emerald-50 text-emerald-800',
        icono: '✅',
      };
    }

    const rotation = liveInventory.product?.rotation;

    if (rotation === 'alta') {
      return {
        titulo: 'Ubicación prioritaria',
        mensaje:
          'Producto de alta rotación. Se recomienda mantenerlo en posiciones de fácil acceso para reducir tiempos de operación.',
        clase: 'border-red-200 bg-red-50 text-red-800',
        icono: '⚡',
      };
    }

    if (rotation === 'media') {
      return {
        titulo: 'Ubicación adecuada',
        mensaje:
          'Producto de rotación media. La ubicación actual es aceptable, pero puede ajustarse si se requiere optimizar espacio.',
        clase: 'border-amber-200 bg-amber-50 text-amber-800',
        icono: '🧠',
      };
    }

    if (rotation === 'baja') {
      return {
        titulo: 'Revisar profundidad',
        mensaje:
          'Producto de baja rotación. Se recomienda ubicarlo en posiciones más profundas para reservar el frente a productos de mayor movimiento.',
        clase: 'border-blue-200 bg-blue-50 text-blue-800',
        icono: '📦',
      };
    }

    return {
      titulo: 'Sin datos suficientes',
      mensaje:
        'No hay información suficiente de rotación para emitir una recomendación operativa.',
      clase: 'border-slate-200 bg-slate-50 text-slate-700',
      icono: 'ℹ️',
    };
  }

  useEffect(() => {
    loadLiveInventory();

    const refresh = () => {
      loadLiveInventory();
    };

    window.addEventListener('focus', refresh);
    window.addEventListener('cjwms-inventory-updated', refresh);

    return () => {
      window.removeEventListener('focus', refresh);
      window.removeEventListener('cjwms-inventory-updated', refresh);
    };
  }, []);

  const zoneRacks = racks.filter((rack) => rack.zone === activeZone);

  const filteredLocations = useMemo(() => {
    if (!selectedRack) return [];

    return selectedRack.locations.filter((location) => {
      const matchesSearch = location
        .toLowerCase()
        .includes(locationSearch.toLowerCase());

      const matchesCarril =
        selectedRack.zone !== 'Drive In' ||
        !selectedCarril ||
        obtenerCarrilDriveIn(location) === selectedCarril;

      return matchesSearch && matchesCarril;
    });
  }, [selectedRack, locationSearch, selectedCarril]);

  const selectedLiveInventory =
    selectedPosition ? getLiveInventoryByLocation(selectedPosition) : null;

  function getLastMovementByLocation(locationCode: string) {
    const position = rackPositions.find((item) => item.code === locationCode);

    if (!position) return null;

    return movements
      .filter(
        (movement) =>
          movement.origin_position_id === position.id ||
          movement.destination_position_id === position.id
      )
      .sort((a, b) => {
        const fechaA = a.created_at ? new Date(a.created_at).getTime() : 0;
        const fechaB = b.created_at ? new Date(b.created_at).getTime() : 0;

        return fechaB - fechaA;
      })[0] ?? null;
  }

  function getPositionCodeById(positionId?: string | null) {
    if (!positionId) return 'Sin ubicación';

    return (
      rackPositions.find((position) => position.id === positionId)?.code ??
      'Ubicación no encontrada'
    );
  }

  function formatMovementType(type?: string | null) {
    if (type === 'entrada') return 'Entrada';
    if (type === 'salida') return 'Salida';
    if (type === 'reubicacion') return 'Reubicación';
    if (type === 'ajuste') return 'Ajuste';
    if (type === 'bloqueo') return 'Bloqueo';
    if (type === 'desbloqueo') return 'Desbloqueo';

    return 'Movimiento';
  }

  const selectedLastMovement = selectedPosition
    ? getLastMovementByLocation(selectedPosition)
    : null;

  return (
    <div className="space-y-6">
      <header className="rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          Layout de almacén
        </p>

        <h1 className="mt-2 text-3xl font-bold">Racks y Drive In</h1>

        <p className="mt-2 text-slate-600">
          Visualización de capacidad, ocupación y estado operativo por zona.
        </p>

        {loadingInventory && (
          <p className="mt-3 text-sm font-semibold text-blue-600">
            Cargando inventario vivo...
          </p>
        )}
      </header>

      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-wrap gap-3">
          {zones.map((zone) => (
            <button
              key={zone}
              onClick={() => {
                setActiveZone(zone);
                setSelectedRack(null);
                setSelectedPosition(null);
                setSelectedCarril(null);
                setLocationSearch('');
              }}
              className={`rounded-xl px-5 py-3 text-sm font-semibold transition ${
                activeZone === zone
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {zone}
            </button>
          ))}
        </div>

        <div className="mb-5">
          <h2 className="text-xl font-bold">{activeZone}</h2>
          <p className="text-sm text-slate-500">
            {zoneRacks.length} racks registrados
          </p>
        </div>

        <div className="grid items-start gap-4 md:grid-cols-2 xl:grid-cols-4">
          {zoneRacks.map((rack) => {
            const { occupied, available, percentage } = getRackStats(rack);

            return (
              <button
                key={rack.id}
                onClick={() => {
                  setSelectedRack(rack);
                  setSelectedPosition(null);
                  setShowPositionModal(false);
                  setLocationSearch('');
                  setSelectedCarril(null);

                  setTimeout(() => {
                    detailRef.current?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    });
                  }, 100);
                }}
                className={`rounded-2xl border bg-slate-50 p-5 text-left transition hover:-translate-y-1 hover:shadow-md ${
                  selectedRack?.id === rack.id
                    ? 'border-blue-500 ring-2 ring-blue-100'
                    : 'border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-bold">{rack.name}</h3>

                  <span
                    className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${getOperationalStatusClass(
                      percentage
                    )}`}
                  >
                    {getOperationalStatus(percentage)}
                  </span>
                </div>

                <p className="mt-2 text-sm text-slate-500">
                  Capacidad: {rack.capacity} ubicaciones
                </p>

                <div className="mt-5">
                  <div className="mb-2 flex justify-between text-sm text-slate-600">
                    <span>Ocupación</span>
                    <span>{percentage}%</span>
                  </div>

                  <div className="h-3 rounded-full bg-slate-200">
                    <div
                      className={`h-3 rounded-full ${getProgressClass(percentage)}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl bg-white p-3">
                    <p className="text-slate-500">Ocupados</p>
                    <p className="text-xl font-bold">{occupied}</p>
                  </div>

                  <div className="rounded-xl bg-white p-3">
                    <p className="text-slate-500">Libres</p>
                    <p className="text-xl font-bold">{available}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {selectedRack && (
        <section
          ref={detailRef}
          className="rounded-2xl bg-white p-6 shadow-sm"
        >
          {(() => {
            const { occupied, available, percentage } = getRackStats(selectedRack);
            const leyenda = obtenerLeyendaProductos(selectedRack, selectedCarril);
            const carrilRecomendado =
              selectedRack.zone === 'Drive In'
                ? obtenerCarrilRecomendado(selectedRack)
                : null;

            return (
              <div>
                <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                      Detalle visual
                    </p>

                    <h2 className="mt-1 text-2xl font-bold">
                      {selectedRack.zone} / {selectedRack.name}
                    </h2>

                    <p className="mt-1 text-slate-500">
                      Capacidad: {selectedRack.capacity} ubicaciones · Ocupación:{' '}
                      {percentage}%
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedRack(null)}
                    className="rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-200"
                  >
                    Cerrar detalle
                  </button>
                </div>

                <div className="mb-6 grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
                    <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
                      Ocupados
                    </p>
                    <p className="mt-2 text-3xl font-black text-blue-900">
                      {occupied}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                    <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">
                      Libres
                    </p>
                    <p className="mt-2 text-3xl font-black text-emerald-900">
                      {available}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                      Porcentaje
                    </p>
                    <p className="mt-2 text-3xl font-black text-slate-900">
                      {percentage}%
                    </p>
                  </div>
                </div>

                {selectedRack.zone === 'Drive In' && (
                  <>
                    {carrilRecomendado && (
                      <div className="mb-6 rounded-2xl border border-emerald-300 bg-emerald-50 p-5">
                        <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">
                          Línea recomendada
                        </p>

                        <p className="mt-2 text-3xl font-black text-emerald-900">
                          Línea {carrilRecomendado.carril}
                        </p>

                        <p className="mt-1 text-sm font-semibold text-emerald-700">
                          Mejor opción disponible por baja ocupación y mayor capacidad libre.
                        </p>
                      </div>
                    )}

                    <div className="mb-6 rounded-2xl border border-blue-200 bg-blue-50 p-5">
                      <p className="text-sm font-bold uppercase tracking-wide text-blue-700">
                        Recomendaciones inteligentes
                      </p>

                      <div className="mt-3 space-y-2">
                        {obtenerRecomendacionesCarriles(selectedRack).map(
                          (recomendacion) => (
                            <p
                              key={recomendacion}
                              className="text-sm font-semibold text-blue-900"
                            >
                              🧠 {recomendacion}
                            </p>
                          )
                        )}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="mb-3 text-lg font-bold">
                        Capacidad por línea
                      </h3>

                      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                        {obtenerResumenCarriles(selectedRack).map((carril) => (
                          <button
                            key={carril.carril}
                            onClick={() => setSelectedCarril(carril.carril)}
                            className={`rounded-2xl border p-4 text-left transition hover:-translate-y-1 hover:shadow-md ${
                              selectedCarril === carril.carril
                                ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-100'
                                : carril.porcentaje >= 95
                                ? 'border-red-300 bg-red-50'
                                : carril.porcentaje >= 80
                                ? 'border-orange-300 bg-orange-50'
                                : carril.porcentaje >= 60
                                ? 'border-amber-300 bg-amber-50'
                                : carril.porcentaje > 0
                                ? 'border-blue-300 bg-blue-50'
                                : 'border-slate-200 bg-white'
                            }`}
                          >
                            <p className="text-sm font-bold text-slate-900">
                              Línea {carril.carril}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              {carril.ocupados} ocupados / {carril.total}{' '}
                              ubicaciones
                            </p>

                            <div className="mt-3 h-2 rounded-full bg-slate-200">
                              <div
                                className={`h-2 rounded-full ${getProgressClass(
                                  carril.porcentaje
                                )}`}
                                style={{ width: `${carril.porcentaje}%` }}
                              />
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <input
                    value={locationSearch}
                    onChange={(e) => setLocationSearch(e.target.value)}
                    placeholder="Buscar ubicación... Ej. A01A o D2-F"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500 lg:max-w-md"
                  />

                  {selectedCarril && (
                    <button
                      onClick={() => setSelectedCarril(null)}
                      className="rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                    >
                      Ver todos
                    </button>
                  )}
                </div>

                <div className="mb-4">
                  <h3 className="text-2xl font-black text-slate-900">
                    Mapa de ubicaciones
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Las ubicaciones ocupadas se muestran en color y las libres en blanco.
                  </p>
                </div>

                <div className="mt-5 space-y-3">
                  {selectedRack.zone === 'Drive In' ? (
                    (() => {
                      const grupos = new Map<string, string[]>();

                      filteredLocations.forEach((location) => {
                        const carril = obtenerCarrilDriveIn(location);
                        const nivel = obtenerNivelDriveIn(location);

                        if (!carril || !nivel) return;

                        const key = `${carril}-${nivel}`;

                        if (!grupos.has(key)) {
                          grupos.set(key, []);
                        }

                        grupos.get(key)?.push(location);
                      });

                      return Array.from(grupos.entries()).map(([key, locations]) => {
                        const ordenadas = [...locations].sort(
                          (a, b) =>
                            obtenerProfundidadDriveIn(b) -
                            obtenerProfundidadDriveIn(a)
                        );

                        return (
                          <div
                            key={key}
                            className="grid grid-cols-6 gap-3"
                          >
                            {ordenadas.map((location) => {
                              const liveInventory =
                                getLiveInventoryByLocation(location);

                              const skuVisual = liveInventory?.product?.sku;

                              const skusRack = leyenda.productos.map(
                                (producto) => producto.sku
                              );

                              const colorProducto = obtenerColorProducto(
                                skuVisual,
                                skusRack
                              );

                              return (
                                <button
                                  key={location}
                                  onClick={() => {
                                    setSelectedPosition(location);
                                    setShowPositionModal(true);
                                  }}
                                  className={`flex min-h-16 items-center justify-center rounded-xl border px-3 py-4 text-center text-sm font-bold transition hover:scale-105 ${
                                    selectedPosition === location
                                      ? 'ring-2 ring-blue-400'
                                      : ''
                                  } ${
                                    liveInventory
                                      ? `${colorProducto.border} ${colorProducto.bg} ${colorProducto.text}`
                                      : 'border-slate-200 bg-white text-slate-600'
                                  }`}
                                >
                                  {location}
                                </button>
                              );
                            })}

                            {ordenadas.length === 5 && (
                              <div className="min-h-16" />
                            )}
                          </div>
                        );
                      });
                    })()
                  ) : (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                      {filteredLocations.map((location) => {
                        const liveInventory = getLiveInventoryByLocation(location);

                        const skuVisual = liveInventory?.product?.sku;

                        const skusRack = leyenda.productos.map(
                          (producto) => producto.sku
                        );

                        const colorProducto = obtenerColorProducto(
                          skuVisual,
                          skusRack
                        );

                        return (
                          <button
                            key={location}
                            onClick={() => {
                              setSelectedPosition(location);
                              setShowPositionModal(true);
                            }}
                            className={`flex min-h-16 items-center justify-center rounded-xl border px-3 py-4 text-center text-sm font-bold transition hover:scale-105 ${
                              selectedPosition === location
                                ? 'ring-2 ring-blue-400'
                                : ''
                            } ${
                              liveInventory
                                ? `${colorProducto.border} ${colorProducto.bg} ${colorProducto.text}`
                                : 'border-slate-200 bg-white text-slate-600'
                            }`}
                          >
                            {location}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {locationSearch.trim() && filteredLocations.length === 0 && (
                  <div className="mt-5 rounded-2xl border border-dashed border-amber-300 bg-amber-50 p-5 text-sm font-semibold text-amber-800">
                    No se encontró la ubicación "{locationSearch}" en{' '}
                    {selectedRack.name}. Revisa si pertenece a otra zona como
                    Drive In.
                  </div>
                )}

                <div className="mt-6">
                  <h4 className="mb-3 text-lg font-black text-slate-900">
                    Leyenda de productos
                  </h4>

                  <div className="flex flex-wrap gap-4 rounded-2xl border border-slate-200 bg-white p-4">
                    {leyenda.productos.map((producto) => {
                      const porcentaje = Math.round(
                        (producto.cantidad / leyenda.totalUbicaciones) * 100
                      );

                      return (
                        <div
                          key={producto.sku}
                          className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3"
                        >
                          <span
                            className={`h-5 w-5 rounded-md ${producto.color.bg} ${producto.color.border}`}
                          />

                          <div>
                            <p className="text-sm font-bold text-slate-900">
                              {producto.descripcion}
                            </p>

                            <p className="text-xs font-semibold text-slate-500">
                              {producto.cantidad} pallets ({porcentaje}%)
                            </p>
                          </div>
                        </div>
                      );
                    })}

                    <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
                      <span className="h-5 w-5 rounded-md border border-slate-300 bg-white" />

                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          Ubicación libre
                        </p>

                        <p className="text-xs font-semibold text-slate-500">
                          {leyenda.libres} espacios (
                          {Math.round(
                            (leyenda.libres / leyenda.totalUbicaciones) * 100
                          )}
                          %)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedPosition && showPositionModal && (
                  <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    onClick={() => setShowPositionModal(false)}
                  >
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                            Posición seleccionada
                          </p>

                          <div className="mt-2 flex items-center gap-4">
                            <h3 className="text-5xl font-black text-slate-900">
                              {selectedPosition}
                            </h3>

                            <span
                              className={`rounded-full px-4 py-2 text-sm font-bold ${
                                selectedLiveInventory
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-emerald-100 text-emerald-700'
                              }`}
                            >
                              {selectedLiveInventory ? 'Ocupado' : 'Libre'}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => setShowPositionModal(false)}
                          className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-200"
                        >
                          ✕
                        </button>
                      </div>

                      {(() => {
                        const opinion =
                          obtenerOpinionUbicacion(selectedLiveInventory);

                        return (
                          <div
                            className={`mt-4 rounded-xl border px-5 py-4 ${opinion.clase}`}
                          >
                            <p className="text-xs font-bold uppercase tracking-wider">
                              {opinion.icono} Opinión del sistema
                            </p>

                            <p className="mt-2 text-xl font-bold">
                              {opinion.titulo}
                            </p>

                            <p className="mt-2 text-sm leading-relaxed">
                              {opinion.mensaje}
                            </p>
                          </div>
                        );
                      })()}

                      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 xl:col-span-2">
                          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                            SKU / Producto
                          </p>

                          <p className="mt-2 text-2xl font-black text-slate-900">
                            {selectedLiveInventory?.product?.sku ?? '--'}
                          </p>

                          <p className="mt-2 text-sm leading-relaxed text-slate-500">
                            {selectedLiveInventory?.product?.description ??
                              'Ubicación disponible'}
                          </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                            Pallet
                          </p>

                          <p className="mt-2 break-all text-xl font-bold text-slate-900">
                            {selectedLiveInventory?.pallet?.pallet_code ?? '--'}
                          </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                            Lote
                          </p>

                          <p className="mt-2 break-all text-xl font-bold text-slate-900">
                            {selectedLiveInventory?.pallet?.lot ?? '--'}
                          </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                            Rotación
                          </p>

                          <p className="mt-2 text-xl font-bold text-slate-900">
                            {selectedLiveInventory?.product?.rotation ?? '--'}
                          </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                            Cantidad
                          </p>

                          <p className="mt-2 text-xl font-bold text-slate-900">
                            {selectedLiveInventory?.pallet?.quantity ?? '--'}
                          </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                            Unidad
                          </p>

                          <p className="mt-2 text-xl font-bold text-slate-900">
                            {selectedLiveInventory?.pallet?.unit ?? '--'}
                          </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                            Estado inventario
                          </p>

                          <p className="mt-2 text-xl font-bold text-slate-900">
                            {selectedLiveInventory?.inventory.status ?? '--'}
                          </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 md:col-span-2 xl:col-span-4">
                          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                            Última actualización
                          </p>

                          <p className="mt-2 text-xl font-bold text-slate-900">
                            {selectedLiveInventory?.inventory.updated_at
                              ? new Date(
                                  selectedLiveInventory.inventory.updated_at
                                ).toLocaleString()
                              : selectedLiveInventory?.inventory.stored_at
                              ? new Date(
                                  selectedLiveInventory.inventory.stored_at
                                ).toLocaleString()
                              : '--'}
                          </p>
                        </div>
                      </div>

                      {selectedLastMovement && (
                        <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-5">
                          <p className="text-xs font-bold uppercase tracking-wide text-blue-700">
                            Último movimiento
                          </p>

                          <p className="mt-2 text-2xl font-black text-blue-900">
                            {formatMovementType(selectedLastMovement.movement_type)}
                          </p>

                          <div className="mt-4 grid gap-4 md:grid-cols-2">
                            <div className="rounded-xl bg-white p-4">
                              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                                Origen
                              </p>
                              <p className="mt-2 text-lg font-bold text-slate-900">
                                {getPositionCodeById(selectedLastMovement.origin_position_id)}
                              </p>
                            </div>

                            <div className="rounded-xl bg-white p-4">
                              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                                Destino
                              </p>
                              <p className="mt-2 text-lg font-bold text-slate-900">
                                {getPositionCodeById(selectedLastMovement.destination_position_id)}
                              </p>
                            </div>

                            <div className="rounded-xl bg-white p-4">
                              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                                Fecha
                              </p>
                              <p className="mt-2 text-lg font-bold text-slate-900">
                                {selectedLastMovement.created_at
                                  ? new Date(selectedLastMovement.created_at).toLocaleString()
                                  : '--'}
                              </p>
                            </div>

                            <div className="rounded-xl bg-white p-4">
                              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                                Notas
                              </p>
                              <p className="mt-2 text-lg font-bold text-slate-900">
                                {selectedLastMovement.notes ?? '--'}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </section>
      )}
    </div>
  );
}

export default RacksPage;