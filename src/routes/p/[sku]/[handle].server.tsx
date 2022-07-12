import {
  gql,
  Seo,
  ShopifyAnalyticsConstants,
  useLocalization,
  useRouteParams,
  useServerAnalytics,
  useShopQuery,
  ProductOptionsProvider,
} from '@shopify/hydrogen';
import type {Product} from '@shopify/hydrogen/storefront-api-types';
import clsx from 'clsx';
import groq from 'groq';
import {GenericPageLayout} from '~/components/index.server';
import {NotFound} from '~/components/index.server';
import PortableText from '~/components/portableText/PortableText.server';
import ProductDetails from '~/components/product/Details.client';
import ProductGallery from '~/components/product/Gallery.client';
import RelatedProducts from '~/components/product/RelatedProducts.server';
import {PRODUCT_PAGE} from '~/fragments/sanity/pages/product';
import {PRODUCT_FIELDS} from '~/fragments/shopify/product';
import {PRODUCT_VARIANT_FIELDS} from '~/fragments/shopify/productVariant';
import useSanityQuery from '~/hooks/useSanityQuery';
import type {ProductWithNodes, SanityProductPage} from '~/types';

import {LayoutElement} from '~/components';

type ShopifyPayload = {
  product: Pick<
    Product,
    | 'handle'
    | 'id'
    | 'media'
    | 'options'
    | 'seo'
    | 'title'
    | 'variants'
    | 'vendor'
  >;
};

export default function ProductRoute() {
  const {handle} = useRouteParams();

  // Fetch Sanity document
  const {data: sanityProduct} = useSanityQuery<SanityProductPage>({
    params: {slug: handle},
    query: QUERY_SANITY,
  });

  // Conditionally fetch Shopify document
  let storefrontProduct: ProductWithNodes | null = null;
  if (sanityProduct?.gid) {
    const {
      language: {isoCode: languageCode},
      country: {isoCode: countryCode},
    } = useLocalization();

    const {
      data: {product},
    } = useShopQuery<ShopifyPayload>({
      query: QUERY_SHOPIFY,
      variables: {
        country: countryCode,
        id: sanityProduct.gid,
        language: languageCode,
      },
    });
    storefrontProduct = product;
  }

  // Shopify analytics
  useServerAnalytics(
    storefrontProduct
      ? {
          shopify: {
            pageType: ShopifyAnalyticsConstants.pageType.product,
            resourceId: storefrontProduct.id,
          },
        }
      : null,
  );

  if (!sanityProduct || !storefrontProduct) {
    // @ts-expect-error <NotFound> doesn't require response
    return <NotFound />;
  }

  const sanitySeo = sanityProduct.seo;

  const initialVariant = storefrontProduct.variants.nodes[0];

  return (
    <ProductOptionsProvider
      data={storefrontProduct}
      initialVariantId={initialVariant?.id}
    >
      <GenericPageLayout>
        <section className="relative">
          <div className="absolute  bottom-0  h-96  w-full   bg-gradient-to-t  from-white to-transparent"></div>
          <LayoutElement>
            <div className="pt-16 pb-24 sm:pt-24 sm:pb-32 lap-wide:grid lap-wide:grid-cols-12 lap-wide:gap-x-8">
              {/* Product details */}
              <div className="lap-wide:col-span-7 lap-wide:max-w-lg  lap-wide:self-end">
                <ProductDetails
                  initialVariantId={initialVariant?.id}
                  sanityProduct={sanityProduct}
                  storefrontProduct={storefrontProduct}
                />

                <div
                  className={clsx(
                    'w-full', //
                    'mt-6  lap-wide:col-span-7',
                  )}
                >
                  hello there
                  {/* Body */}
                  {sanityProduct?.body && (
                    <PortableText
                      blocks={sanityProduct.body}
                      className={clsx(
                        'max-w-[660px] px-4 pb-24 pt-8', //
                        'md:px-8',
                      )}
                      colorTheme={sanityProduct?.colorTheme}
                    />
                  )}
                </div>
              </div>
              <div className="lap-wide:col-span-5">
                {/* Gallery */}
                <ProductGallery storefrontProduct={storefrontProduct} />
              </div>
            </div>
          </LayoutElement>
        </section>

        <section className="bg-white">
          <LayoutElement>
            <RelatedProducts
              colorTheme={sanityProduct?.colorTheme}
              storefrontProduct={storefrontProduct}
            />
          </LayoutElement>
        </section>

        <Seo
          data={{
            ...(sanitySeo.image
              ? {
                  featuredImage: {
                    height: sanitySeo.image.height,
                    url: sanitySeo.image.url,
                    width: sanitySeo.image.width,
                  },
                }
              : {}),
            seo: {
              description: sanitySeo.description,
              title: sanitySeo.title,
            },
          }}
          type="product"
        />
      </GenericPageLayout>
    </ProductOptionsProvider>
  );
}

const QUERY_SANITY = groq`
  *[
    _type == 'product'
    && store.slug.current == $slug
  ][0]{
    ${PRODUCT_PAGE}
  }
`;

const QUERY_SHOPIFY = gql`
  ${PRODUCT_FIELDS}
  ${PRODUCT_VARIANT_FIELDS}

  query product($country: CountryCode, $id: ID!, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    product: product(id: $id) {
      ...ProductFields
      media(first: 20) {
        nodes {
          ... on MediaImage {
            id
            image {
              altText
              height
              id
              url
              width
            }
            mediaContentType
          }
        }
      }
      variants(first: 250) {
        nodes {
          ...ProductVariantFields
        }
      }
    }
  }
`;
