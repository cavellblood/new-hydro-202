import {AlgoliaSearchClient} from '~/components/algolia/SearchClient';
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
} from 'react-instantsearch-hooks-web';
import Imgix, {buildURL} from 'react-imgix';
import 'lazysizes';
import 'lazysizes/plugins/attrchange/ls.attrchange';
import {searchRouting} from './tunnel-configure-routing';

import {Money} from '@shopify/hydrogen';
const imgixDomain = 'https://farmersfriend-shopify.imgix.net/';

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

function CustomMenu(props) {
  const {
    items,
    createURL,
    refine,
    canRefine,
    isShowingMore,
    toggleShowMore,
    canToggleShowMore,
    sendEvent,
  } = useMenu(props);

  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={item.label}>
          <label className="relative block cursor-pointer rounded-lg border bg-white  px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between">
            <input
              type="radio"
              name="testing"
              className="sr-only"
              aria-labelledby={props.attribute + '-' + index + '-label'}
              value={item.value}
              onChange={(event) => refine(event.currentTarget.value)}
            />
            <span className="flex items-center">
              <span className="flex flex-col text-sm">
                <span
                  id={props.attribute + '-' + index + '-label'}
                  className="font-medium text-gray-900"
                >
                  {item.label}
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
      ))}
    </ul>
  );
}

function Panel({header, footer, children}) {
  return (
    <div className="">
      {header && <div className="mb-1  font-semibold">{header}</div>}
      <div className="">{children}</div>
      {footer && <div className="">{footer}</div>}
    </div>
  );
}

const index = 'shopify_products';

function titleCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map(function (word) {
      return word.replace(word[0], word[0].toUpperCase());
    })
    .join(' ');
}

export const TunnelResults = () => {
  return (
    <div className="pt-8  pb-16">
      <InstantSearch
        searchClient={AlgoliaSearchClient}
        routing={searchRouting}
        indexName={index}
      >
        <Configure hitsPerPage={20} filters={'tags:TUN'} />
        <div>{/* <CurrentRefinements /> */}</div>
        <div className="flex">
          <div className="mr-6  w-[238px]">
            <div className="space-y-6">
              <Panel header="Width">
                <CustomMenu
                  attribute="named_tags.width"
                  sortBy={['name:asc']}
                  transformItems={(items) => {
                    return items.map((item) => ({
                      ...item,
                      label: titleCase(item.label),
                    }));
                  }}
                />
              </Panel>
              <Panel header="Style">
                <CustomMenu
                  attribute="named_tags.style"
                  sortBy={['name:asc']}
                  transformItems={(items) => {
                    return items.map((item) => ({
                      ...item,
                      label: titleCase(item.label),
                    }));
                  }}
                />
              </Panel>
              <Panel header="Length">
                <CustomMenu
                  attribute="named_tags.length"
                  sortBy={['name:asc']}
                  transformItems={(items) => {
                    return items.map((item) => ({
                      ...item,
                      label: titleCase(item.label),
                    }));
                  }}
                />
              </Panel>
              <Panel header="Bow Spacing">
                <CustomMenu
                  attribute="named_tags.bow-spacing"
                  sortBy={['name:asc']}
                  transformItems={(items) => {
                    return items.map((item) => ({
                      ...item,
                      label: titleCase(item.label),
                    }));
                  }}
                />
              </Panel>
              <Panel header="Bow Spacing">
                <Menu
                  attribute="named_tags.bow-spacing"
                  sortBy={['name:asc']}
                  transformItems={(items) => {
                    return items.map((item) => ({
                      ...item,
                      label: titleCase(item.label),
                    }));
                  }}
                  classNames={menuClasses}
                />
              </Panel>
            </div>
          </div>
          <div className="mb-16  flex-1">
            <Hits
              classNames={{
                root: 'mb-8',
                list: '-mx-px grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4',
                item: 'ml-2  mb-2 rounded-lg overflow-hidden border border-gray-100 bg-white hover:border-brand-500',
              }}
              hitComponent={Hit}
            />
          </div>
        </div>
      </InstantSearch>
    </div>
  );
};
