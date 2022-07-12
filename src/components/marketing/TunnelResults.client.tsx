import {AlgoliaSearchClient} from '~/components/algolia/SearchClient';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  SearchBox,
  Menu,
  Hits,
  Configure,
  RefinementList,
  ToggleRefinement,
  CurrentRefinements,
  useClearRefinements,
  Pagination,
  useMenu,
  useMenuProps,
  useCurrentRefinements,
} from 'react-instantsearch-hooks-web';
import Imgix, {buildURL} from 'react-imgix';
import 'lazysizes';
import 'lazysizes/plugins/attrchange/ls.attrchange';
import {searchRouting} from './tunnel-configure-routing';

import {Money} from '@shopify/hydrogen';
import React from 'react';
const imgixDomain = 'https://farmersfriend-shopify.imgix.net/';

const index = 'shopify_products';
const AlgoliaIndex = AlgoliaSearchClient.initIndex(index);

function Hit({hit}) {
  const version =
    hit.product_image !== null ? hit.product_image.split('?v=')[1] : '0';
  const imgSrc =
    hit.product_image !== null
      ? imgixDomain + String(hit.product_image).slice(53, -13) + '?v=' + version
      : '';
  const lqip = buildURL(imgSrc, {w: 150});

  return (
    <div className="group  relative">
      <figure className="aspect-w-1 aspect-h-1 overflow-hidden bg-white  group-hover:opacity-75">
        {hit.product_image !== null ? (
          <Imgix
            src={imgSrc}
            htmlAttributes={{
              alt: hit.title,
              src: lqip,
            }}
            imgixParams={{}}
            className="lazyload  h-full  w-full  object-contain  object-center"
            attributeConfig={{
              src: 'data-src',
              srcSet: 'data-srcset',
              sizes: 'data-sizes',
            }}
            width={300}
            srcSetOptions={{
              devicePixelRatios: [1, 2, 3],
            }}
          />
        ) : (
          ''
        )}
      </figure>
      <div className="px-4 pt-10  pb-4 text-center">
        <h3 className="text-base font-medium text-gray-900  group-hover:text-brand-500">
          <a
            href={'/p/' + hit.sku + '/' + hit.handle}
            className="hover:underline"
          >
            <span aria-hidden="true" className="absolute inset-0" />
            {hit.title}
          </a>
        </h3>
        {/* <div className="mt-3 flex flex-col items-center">
                  <p className="sr-only">{product.rating} out of 5 stars</p>
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          product.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                          'flex-shrink-0 h-5 w-5'
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{product.reviewCount} reviews</p>
                </div> */}
        <div className="mt-4">
          {hit.variants_count == 1 ? (
            <Money
              data={{amount: String(hit.price), currencyCode: 'USD'}}
              className="text-lg font-semibold text-gray-900"
            />
          ) : (
            <>
              <Money
                data={{
                  amount: String(hit.variants_min_price),
                  currencyCode: 'USD',
                }}
                className="text-lg font-semibold text-gray-900"
              />
              <span className="text-sm">
                and <span className="font-bold">{hit.variants_count - 1}</span>{' '}
                other {hit.variants_count - 1 == 1 ? 'option' : 'options'}
              </span>
            </>
          )}
        </div>
        <div className="text-xs  text-stone-400">{hit.sku}</div>
      </div>
    </div>
  );
}

const HitDetails = ({hit}) => {
  return (
    <>
      <div className="flex justify-between">
        <div className="flex flex-col justify-between">
          <div className="flex items-baseline space-x-4">
            <h3 className="text-xl font-bold text-brand-500 desk:text-4xl">
              {hit.named_tags.length} {titleCase(hit.named_tags.style)}
            </h3>
            <p className="font-mono text-base text-gray-400">{hit.sku}</p>
          </div>
          <div className="flex items-center justify-start space-x-4 divide-x">
            <div className="font-semibold text-brand-500">In Stock</div>
            <div className="pl-4">
              <span className="font-semibold">Ships in:</span> 3–4 weeks
            </div>
          </div>
          <p className="inline-flex items-center font-semibold text-gray-800">
            {hit.weight} shipping weight
          </p>
        </div>
        <div className="flex flex-col items-end">
          <div className="my-2 text-xl font-normal text-gray-800 xl:text-4xl">
            {hit.variants_count == 1 ? (
              <Money data={{amount: String(hit.price), currencyCode: 'USD'}} />
            ) : (
              <>
                <Money
                  data={{
                    amount: String(hit.variants_min_price),
                    currencyCode: 'USD',
                  }}
                  className="text-lg font-semibold text-gray-900"
                />
                <span className="text-sm">
                  and{' '}
                  <span className="font-bold">{hit.variants_count - 1}</span>{' '}
                  other {hit.variants_count - 1 == 1 ? 'option' : 'options'}
                </span>
              </>
            )}
          </div>
          <button className="relative inline-flex flex-1 flex-grow-0 items-center justify-center rounded-lg border border-brand-500 bg-brand-500 px-4 py-2 text-base font-medium text-white transition-colors duration-150 hover:bg-brand-500 focus:z-10 focus:outline-none focus:ring-4 focus:ring-brand-300 focus:ring-opacity-30 lg:text-lg xl:text-xl">
            Add to cart
          </button>
        </div>
      </div>
    </>
  );
};

const menuClasses = {
  count: 'text-stone-500  text-sm  font-medium',
  link: 'flex items-center  justify-between  cursor-pointer  px-4 py-3',
  labelText: 'font-medium  flex-grow',
  selectedItem: 'font-bold border-brand-500 ring-2 ring-brand-500',
  item: 'relative block bg-white border rounded-lg shadow-sm  cursor-pointer focus:outline-none  border-gray-300',
  list: 'space-y-2',
};

function ClearRefinementsButton(props) {
  const {canRefine, refine} = useClearRefinements(props);

  return (
    <>
      <button onClick={refine} className={canRefine == true ? '' : 'hidden'}>
        Reset
      </button>
    </>
  );
}

const transformItems = (items, results) => {
  return items.map((item) => ({
    ...item,
    label: titleCase(item.label),
  }));
};

const getPriceDelta = (item, uid) => {
  const priceDeltas = document.querySelectorAll(
    '.ais-RefinementList-container .price-delta',
  );

  for (let index = 0; index < priceDeltas.length; index++) {
    const element = priceDeltas[index];
    element.classList.add('hidden');
  }
  AlgoliaIndex.search('tunnel', {
    hitsPerPage: 1,
    filters: 'tags:TUN',
  }).then(({hits}) => {
    const priceDeltaEl = document.querySelector('.' + uid + ' .price-delta');
    if (priceDeltaEl) {
      priceDeltaEl.classList.remove('hidden');
      priceDeltaEl.innerHTML = hits[0].price;
    }
  });
};

function CustomMenu(props: useMenuProps) {
  const {items, refine, createURL} = useMenu(props);

  return (
    <ul
      className="ais-RefinementList space-y-2"
      data-search-attribute={props.attribute}
    >
      {items.map((item, index) => {
        const uid =
          'ais-RefinementList-item-' +
          props.attribute.split('.')[1] +
          '-' +
          index;
        return (
          <li key={item.label} className={`ais-RefinementList-item ${uid}`}>
            <label className="ais-RefinementList-label relative block cursor-pointer rounded-lg border bg-white  px-6 py-4 leading-7 shadow-sm focus:outline-none sm:flex  sm:justify-between">
              <input
                type="radio"
                name="testing"
                className="ais-RefinementList-checkbox  sr-only"
                aria-labelledby={props.attribute + '-' + index + '-label'}
                value={item.value}
                onClick={(event) => refine(event.currentTarget.value)}
                defaultChecked={item.isRefined ? true : false}
              />
              <span className="flex  w-full  items-center">
                <span className="flex  w-full  justify-between">
                  <span
                    id={props.attribute + '-' + index + '-label'}
                    className={`ais-RefinementList-text text-gray-900 ${
                      item.isRefined ? 'font-bold' : 'font-medium'
                    }`}
                  >
                    {item.label}
                  </span>
                  <span className="price-delta">
                    {''}
                    {!item.isRefined ? getPriceDelta(item, uid) : ''}
                  </span>
                </span>
              </span>
              {/* <!--
          Active: "border", Not Active: "border-2"
          Checked: "border-indigo-500", Not Checked: "border-transparent"
        --> */}
              <span
                className={`pointer-events-none absolute -inset-px rounded-lg  border-2 ${
                  item.isRefined
                    ? 'border-brand-500  ring-1  ring-brand-500'
                    : 'border-transparent'
                }`}
                aria-hidden="true"
              ></span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}

function Panel({
  header,
  footer,
  children,
}: {
  header: any;
  footer?: any;
  children: React.ReactNode;
}) {
  return (
    <div className="ais-RefinementList-panel">
      {header && (
        <div className="mb-1  mt-6  flex  justify-between">
          <div className="text-lg  font-semibold">{header}</div>
          <div className="cursor-pointer  text-sm  text-brand-500  hover:underline">
            Learn more
          </div>
        </div>
      )}
      <div className="ais-RefinementList-container">{children}</div>
      {footer && <div className="">{footer}</div>}
    </div>
  );
}

function titleCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map(function (word) {
      return word.replace(word[0], word[0].toUpperCase());
    })
    .join(' ');
}

const onStateChange = ({uiState, setUiState}) => {
  console.log('state change');
  setUiState(uiState);
};

export const TunnelResults = () => {
  return (
    <div className="pt-8  pb-16">
      <InstantSearch
        searchClient={AlgoliaSearchClient}
        routing={searchRouting}
        indexName={index}
      >
        <Configure hitsPerPage={1} filters={'tags:TUN'} />
        <div>{/* <CurrentRefinements /> */}</div>
        <div className="flex  justify-center  space-x-14">
          <div className="mb-16  w-[30rem]">
            <Hits
              classNames={{
                root: 'mb-8',
                list: '-mx-px',
                item: ' rounded-lg overflow-hidden border border-gray-100 bg-white hover:border-brand-500',
              }}
              hitComponent={Hit}
            />
          </div>
          <div className="mr-6  w-[30rem]">
            <div>
              <Hits hitComponent={HitDetails} />
            </div>
            <hr className="my-6 border-t border-gray-200"></hr>
            <div className="space-y-6">
              <Panel header="Width">
                <CustomMenu
                  attribute="named_tags.width"
                  sortBy={['name:asc']}
                  transformItems={transformItems}
                />
              </Panel>
              <Panel header="Style">
                <CustomMenu
                  attribute="named_tags.style"
                  sortBy={['name:asc']}
                  transformItems={transformItems}
                />
              </Panel>
              <Panel header="Length">
                <CustomMenu
                  attribute="named_tags.length"
                  sortBy={['name:asc']}
                  transformItems={transformItems}
                />
              </Panel>
              <Panel header="Bow Spacing">
                <CustomMenu
                  attribute="named_tags.bow-spacing"
                  sortBy={['name:asc']}
                  transformItems={transformItems}
                />
              </Panel>
              <Panel header="Lift Kit">
                <CustomMenu
                  attribute="named_tags.lift-kit"
                  sortBy={['name:asc']}
                  transformItems={transformItems}
                />
              </Panel>
            </div>
          </div>
        </div>
      </InstantSearch>
    </div>
  );
};
