import {Fragment, useState} from 'react';
import {Popover, Transition} from '@headlessui/react';
import {
  InstantSearch,
  SearchBox,
  Hits,
  Configure,
} from 'react-instantsearch-hooks-web';
import {useNavigate} from '@shopify/hydrogen';
import {AlgoliaSearchClient} from '~/components/algolia/SearchClient';

function Hit({hit}) {
  return (
    <a href={'/p/' + hit.sku + '/' + hit.handle}>
      <div className="flex">
        <div className="mr-4 flex-shrink-0">
          <figure className=" flex  h-16  w-16  items-center  justify-center">
            <img src={hit.product_image} className="" alt={hit.title} />
          </figure>
        </div>
        <div>
          <h1 className="font-semibold  text-brand-500">{hit.title}</h1>
          <p>${hit.price}</p>
        </div>
      </div>
    </a>
  );
}

export const SearchBar = () => {
  const [searchIsShowing, setSearchIsShowing] = useState(false);

  const navigate = useNavigate();

  function navigateToSearch(event) {
    const query = event.target[0].value;
    navigate(`/search?q=${query}`);
  }

  return (
    <InstantSearch
      searchClient={AlgoliaSearchClient}
      indexName="shopify_products"
    >
      <Configure hitsPerPage={6} />
      <div className="">
        <Popover>
          <>
            <SearchBox
              placeholder="Search"
              classNames={{
                input:
                  'block  border-stone-200 w-full pl-10 pr-3 py-2 border rounded-xl leading-5 bg-white  hover:border-stone-400 transition-colors  duration-100 text-white-warm-900 placeholder-white-warm-700 focus:outline-none focus:bg-white focus:border-brand-500 focus:ring-white focus:text-gray-900 text-base',
                submit: 'absolute  inset-y-0',
                reset: 'absolute  inset-y-0',
                loadingIndicator: 'absolute  inset-y-0',
                submitIcon: 'flex items-center pointer-events-none',
                resetIcon: 'flex items-center pointer-events-none',
                loadingIcon: 'flex items-center pointer-events-none',
              }}
              onSubmit={navigateToSearch}
              onClick={() => setSearchIsShowing(true)}
              onFocus={() => setSearchIsShowing(true)}
            />

            <Transition
              as={Fragment}
              show={searchIsShowing}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              {searchIsShowing && (
                <Popover.Panel
                  static
                  className="absolute -left-7 z-30 mt-3 w-full px-4 hands:px-0"
                >
                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="relative  bg-white p-7">
                      <Hits
                        classNames={{
                          root: '',
                          list: 'grid  grid-cols-2  lap-wide:grid-cols-3',
                        }}
                        hitComponent={Hit}
                      />
                    </div>
                  </div>
                </Popover.Panel>
              )}
            </Transition>
          </>
        </Popover>
      </div>
    </InstantSearch>
  );
};
