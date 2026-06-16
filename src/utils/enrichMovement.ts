import type { MovementItem } from '../services/movementService';
import type { Product } from '../services/productService';
import type { Pallet } from '../services/palletService';
import type { RackPosition } from '../services/rackPositionService';

export type EnrichedMovement = MovementItem & {
  productName: string;
  palletName: string;
  originName: string;
  destinationName: string;
};

export function enrichMovement(
  movement: MovementItem,
  products: Product[],
  pallets: Pallet[],
  positions: RackPosition[]
): EnrichedMovement {
  const product = products.find((item) => item.id === movement.product_id);
  const pallet = pallets.find((item) => item.id === movement.pallet_id);
  const origin = positions.find(
    (item) => item.id === movement.origin_position_id
  );
  const destination = positions.find(
    (item) => item.id === movement.destination_position_id
  );

  return {
    ...movement,
    productName: product
      ? `${product.sku} - ${product.description}`
      : 'Sin producto',

    palletName: pallet
      ? `${pallet.pallet_code}${pallet.lot ? ` · ${pallet.lot}` : ''}`
      : 'Sin pallet',

    originName: origin?.code ?? 'Sin origen',

    destinationName: destination?.code ?? 'Sin destino',
  };
}

export function enrichMovements(
  movements: MovementItem[],
  products: Product[],
  pallets: Pallet[],
  positions: RackPosition[]
): EnrichedMovement[] {
  return movements.map((movement) =>
    enrichMovement(movement, products, pallets, positions)
  );
}