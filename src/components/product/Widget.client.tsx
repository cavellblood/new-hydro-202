import {ProductPrice, useProductOptions} from '@shopify/hydrogen';
import clsx from 'clsx';
import type {ProductWithNodes, SanityProductPage} from '../../types';
import {hasMultipleProductOptions} from '~/lib/utils';
import SelectedVariantBuyNowButton from './buttons/SelectedVariantBuyNow.client';
import SelectedVariantAddToCartButton from './buttons/SelectedVariantAddToCart.client';
import ProductOptions from './options/ProductOptions.client';

type Props = {
  sanityProduct: SanityProductPage;
  storefrontProduct: ProductWithNodes;
};

export const ProductPrices = ({
  storefrontProduct,
}: {
  storefrontProduct: ProductWithNodes;
}) => {
  const {selectedVariant} = useProductOptions();

  if (!storefrontProduct || !selectedVariant) {
    return null;
  }

  return (
    <div className="text-md mt-2 flex font-bold">
      <ProductPrice
        className="text-darkGray decoration-red mr-3 line-through"
        data={storefrontProduct}
        priceType="compareAt"
        variantId={selectedVariant.id}
      />
      <ProductPrice data={storefrontProduct} variantId={selectedVariant.id} />
    </div>
  );
};

export default function ProductWidget({
  sanityProduct,
  storefrontProduct,
}: Props) {
  const {selectedVariant} = useProductOptions();
  const multipleProductOptions = hasMultipleProductOptions(
    storefrontProduct.options,
  );

  const availableForSale = selectedVariant?.availableForSale;

  if (!selectedVariant) {
    return null;
  }

  return (
    <div
      className={clsx(
        'pointer-events-auto z-10 ml-auto rounded bg-white px-4 py-6 shadow',
        'md:px-6',
      )}
    >
      {/* Sold out */}
      {!availableForSale && (
        <div className="text-darkGray mb-3 text-xs font-bold uppercase">
          Sold out
        </div>
      )}

      {/* Sale */}
      {availableForSale && selectedVariant?.compareAtPriceV2 && (
        <div className="text-red mb-3 text-xs font-bold uppercase">Sale</div>
      )}

      {/* Title */}
      {storefrontProduct?.title && (
        <h1 className="text-md font-bold uppercase">
          {storefrontProduct.title}
        </h1>
      )}

      {/* Vendor */}
      {storefrontProduct?.vendor && (
        <div className="text-md text-darkGray mt-1">
          {storefrontProduct.vendor}
        </div>
      )}

      {/* Prices */}
      <ProductPrices storefrontProduct={storefrontProduct} />

      {/* Divider */}
      <div className="border-gray my-4 w-full border-b" />

      {/* Product options */}
      {multipleProductOptions && (
        <ProductOptions
          customProductOptions={sanityProduct.customProductOptions}
        />
      )}

      {/* Product actions */}
      <div className="mt-4 flex flex-col space-y-2">
        <SelectedVariantAddToCartButton />
        <SelectedVariantBuyNowButton />
      </div>
    </div>
  );
}
