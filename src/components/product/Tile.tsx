import {Link} from '@shopify/hydrogen';
import clsx from 'clsx';
import {Suspense} from 'react';
import {ProductWithNodes} from '../../types';
import {getProductOptionString, hasMultipleProductOptions} from '~/lib/utils';
import MoneyCompareAtPrice from './money/CompareAtPrice.client';
import MoneyPrice from './money/Price.client';

type Props = {
  storefrontProduct: ProductWithNodes;
};

export default function ProductTile({storefrontProduct}: Props) {
  if (!storefrontProduct) {
    return null;
  }

  const firstVariant = storefrontProduct.variants.nodes[0];

  const {availableForSale, compareAtPriceV2, priceV2} = firstVariant;

  const multipleProductOptions = hasMultipleProductOptions(
    storefrontProduct.options,
  );
  const productOptions = getProductOptionString(storefrontProduct.options);

  return (
    <Link to={`/products/${storefrontProduct.handle}`}>
      <div
        className={clsx(
          'group min-w-[12.5em] rounded-md bg-white p-5 transition-[border-radius] duration-500 ease-out',
          'hover:rounded-xl',
        )}
        role="row"
      >
        <div className="overflow-hidden">
          {/* Sold out */}
          {!availableForSale && (
            <div className="text-darkGray mb-2 text-xs font-bold uppercase">
              Sold out
            </div>
          )}

          {/* Sale */}
          {availableForSale && compareAtPriceV2 && (
            <div className="text-red mb-2 text-xs font-bold uppercase">
              Sale
            </div>
          )}

          {/* Title */}
          <div className="truncate text-lg font-bold group-hover:underline">
            {storefrontProduct.title}
          </div>

          {/* Vendor */}
          {storefrontProduct.vendor && (
            <div className="text-darkGray mt-1 truncate text-sm">
              {storefrontProduct.vendor}
            </div>
          )}

          {/* Product options */}
          {multipleProductOptions && (
            <div className="text-darkGray mt-1 truncate text-sm">
              {productOptions}
            </div>
          )}
        </div>

        {/* Price / sold out */}
        <div className="mt-2 flex text-sm font-bold">
          {compareAtPriceV2 && (
            <span className="text-darkGray">
              <Suspense fallback={null}>
                <MoneyCompareAtPrice money={compareAtPriceV2} />
              </Suspense>
            </span>
          )}
          {priceV2 && (
            <Suspense fallback={null}>
              <MoneyPrice money={priceV2} />
            </Suspense>
          )}
        </div>
      </div>
    </Link>
  );
}
