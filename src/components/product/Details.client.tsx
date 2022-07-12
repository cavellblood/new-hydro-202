import {ProductOptionsProvider} from '@shopify/hydrogen';
import type {ProductVariant} from '@shopify/hydrogen/storefront-api-types';
import clsx from 'clsx';
import type {ProductWithNodes, SanityProductPage} from '../../types';
import {ProductPrices} from './Widget.client';

import {
  CheckIcon,
  StarIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
} from '@heroicons/react/solid';

type Props = {
  storefrontProduct: ProductWithNodes;
};

const reviews = {
  average: 4,
  totalCount: 1624,
  counts: [
    {rating: 5, count: 1019},
    {rating: 4, count: 162},
    {rating: 3, count: 97},
    {rating: 2, count: 199},
    {rating: 1, count: 147},
  ],
  featured: [
    {
      id: 1,
      rating: 5,
      content: `
        <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
      `,
      author: 'Emily Selman',
      avatarSrc:
        'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
    },
    // More reviews...
  ],
};

export default function ProductDetails({storefrontProduct}: Props) {
  return (
    <>
      {/* Gallery */}
      {/* <ProductGallery storefrontProduct={storefrontProduct} /> */}

      {/* <nav aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2">
                  {storefrontProduct.collections.map(
                    (breadcrumb, breadcrumbIdx) => (
                      <li key={breadcrumb.node.id}>
                        <div className="flex items-center text-sm">
                          <a
                            href={`/collections/${breadcrumb.node.handle}`}
                            className="font-medium text-gray-500 hover:text-gray-900"
                          >
                            {breadcrumb.node.title}
                          </a>
                          {breadcrumbIdx !==
                          storefrontProduct.collections.length - 1 ? (
                            <svg
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              aria-hidden="true"
                              className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
                            >
                              <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                            </svg>
                          ) : null}
                        </div>
                      </li>
                    ),
                  )}
                </ol>
              </nav> */}

      <div className="mt-4">
        <h1 className="text-3xl font-black tracking-tight text-gray-900 lap-wide:text-4xl  desk:text-5xl">
          {storefrontProduct.title}
        </h1>
      </div>

      <section aria-labelledby="information-heading" className="mt-4">
        <h2 id="information-heading" className="sr-only">
          Product information
        </h2>

        <div className="flex items-center">
          <div className="text-lg  font-semibold text-gray-900 desk:text-2xl">
            {/* Prices */}
            <ProductPrices storefrontProduct={storefrontProduct} />
          </div>

          <div className="ml-4 border-l border-gray-300 pl-4">
            <h2 className="sr-only">Reviews</h2>
            <div className="flex items-center">
              <div>
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={clsx(
                        reviews.average > rating
                          ? 'text-amber-500'
                          : 'text-gray-300',
                        'h-5 w-5 flex-shrink-0',
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
              </div>
              <p className="ml-2 text-sm text-gray-500">
                {reviews.totalCount} reviews
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center">
          <CheckIcon
            className="h-5 w-5 flex-shrink-0 text-green-500"
            aria-hidden="true"
          />
          <p className="ml-2 text-sm text-gray-500">
            In stock and ready to ship
          </p>
        </div>

        {/* Product form */}
        <div className="mt-4 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
          <section aria-labelledby="options-heading">
            <h2 id="options-heading" className="sr-only">
              Product options
            </h2>

            {/* Product options
                    {multipleProductOptions && (
                      <ProductOptions
                        customProductOptions={
                          sanityProduct.customProductOptions
                        }
                      />
                    )} */}

            <div className="mt-4">
              <a
                href="#"
                className="group inline-flex text-sm text-gray-500 hover:text-gray-700"
              >
                <span>What size should I buy?</span>
                <QuestionMarkCircleIcon
                  className="ml-2 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
              </a>
            </div>

            <div className="mt-6 text-center">
              <a href="#" className="group inline-flex text-base font-medium">
                <ShieldCheckIcon
                  className="mr-2 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                <span className="text-gray-500 hover:text-gray-700">
                  365-day Guarantee
                </span>
              </a>
            </div>
          </section>
        </div>
      </section>

      {/* Product image */}
      {/* <Gallery /> */}
    </>
  );
}
