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
import searchRouting from '~/components/marketing/tunnel-configure-routing.js';

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
        <div className="mt-4"></div>
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
    <>
      {items.map((item, index) => (
        <label
          key={item.label}
          className="relative block cursor-pointer rounded-lg border bg-white px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between"
        >
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
            className={`pointer-events-none absolute -inset-px rounded-lg border-2 ${
              item.isRefined
                ? 'border  border-brand-500'
                : 'border-2  border-transparent'
            }`}
            aria-hidden="true"
          ></span>
        </label>
      ))}
    </>
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

export default function TunnelResults() {
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
              <Panel header="Width">
                <Menu
                  attribute="named_tags.width"
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
              <Panel header="Style">
                <Menu
                  attribute="named_tags.style"
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
              <Panel header="Length">
                <Menu
                  attribute="named_tags.length"
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
}
