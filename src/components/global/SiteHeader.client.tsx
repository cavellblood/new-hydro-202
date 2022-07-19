import clsx from 'clsx';
import {Link, useUrl, useCart} from '@shopify/hydrogen';
import {useWindowScroll} from 'react-use';

import {Fragment} from 'react';

import {
  Heading,
  IconAccount,
  IconBag,
  IconMenu,
  IconSearch,
  Input,
  LayoutElement,
  CartDrawer,
  useDrawer,
  SiteLogo,
  SearchBar,
} from '~/components';
// @ts-expect-error @headlessui/react incompatibility with node16 resolution
import {Disclosure, Popover, Tab, Transition} from '@headlessui/react';
import {UserCircleIcon, SearchIcon} from '@heroicons/react/solid';
import {MenuIcon, ShoppingCartIcon, XIcon} from '@heroicons/react/outline';

import {MenuDrawer} from './MenuDrawer.client';

import type {EnhancedMenu} from '~/lib/utils';

/**
 * A client component that specifies the content of the header on the website
 */
export const SiteHeader = ({
  title,
  menu,
  isOverlay,
}: {
  title?: string;
  menu?: EnhancedMenu;
  isOverlay: boolean;
}) => {
  const {pathname} = useUrl();

  const localeMatch = /^\/([a-z]{2})(\/|$)/i.exec(pathname);
  const countryCode = localeMatch ? localeMatch[1] : undefined;

  const isHome = pathname === `/${countryCode ? countryCode + '/' : ''}`;

  const {
    isOpen: isCartOpen,
    openDrawer: openCart,
    closeDrawer: closeCart,
  } = useDrawer();

  const {
    isOpen: isMenuOpen,
    openDrawer: openMenu,
    closeDrawer: closeMenu,
  } = useDrawer();

  return (
    <>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      <MenuDrawer isOpen={isMenuOpen} onClose={closeMenu} menu={menu!} />
      <DesktopHeader
        countryCode={countryCode}
        isOverlay={isOverlay}
        title={title}
        menu={menu}
        openCart={openCart}
      />
      {/* <MobileHeader
        countryCode={countryCode}
        isHome={isHome}
        title={title}
        openCart={openCart}
        openMenu={openMenu}
      /> */}
    </>
  );
};

const superNav = [
  {title: 'About Us', url: '/about-us'},
  {title: 'Films', url: '/films'},
  {title: 'Need Help?', url: '/support/help-center'},
];

function MobileHeader({
  countryCode,
  title,
  isHome,
  openCart,
  openMenu,
}: {
  countryCode?: string | null;
  title: string;
  isHome: boolean;
  openCart: () => void;
  openMenu: () => void;
}) {
  const {y} = useWindowScroll();

  const styles = {
    button: 'relative flex items-center justify-center w-8 h-8',
    container: `${
      isHome
        ? 'bg-primary/80 dark:bg-contrast/60 text-contrast dark:text-primary shadow-darkHeader'
        : 'bg-contrast/80 text-primary'
    } ${
      y > 50 && !isHome ? 'shadow-lightHeader ' : ''
    }flex lap-wide:hidden items-center h-nav sticky backdrop-blur-lg z-40 top-0 justify-between w-full leading-none gap-4 px-4 lap:px-8`,
  };

  return (
    <header role="banner" className={styles.container}>
      <div className="flex w-full items-center justify-start gap-4">
        <button onClick={openMenu} className={styles.button}>
          <IconMenu />
        </button>
        <form
          action={`/${countryCode ? countryCode + '/' : ''}search`}
          className="items-center gap-2 hands:flex"
        >
          <button type="submit" className={styles.button}>
            <IconSearch />
          </button>
          <Input
            className={
              isHome
                ? 'focus:border-contrast/20 dark:focus:border-primary/20'
                : 'focus:border-primary/20'
            }
            type="search"
            variant="minisearch"
            placeholder="Search"
            name="q"
          />
        </form>
      </div>

      <Link
        className="flex h-full w-full flex-grow items-center justify-center self-stretch leading-[3rem] lap:leading-[4rem]"
        to="/"
      >
        <Heading className="text-center font-bold" as={isHome ? 'h1' : 'h2'}>
          {title}
        </Heading>
      </Link>

      <div className="flex w-full items-center justify-end gap-4">
        <Link to={'/account'} className={styles.button}>
          <IconAccount />
        </Link>
        <button onClick={openCart} className={styles.button}>
          <IconBag />
          <CartBadge dark={isHome} />
        </button>
      </div>
    </header>
  );
}

function DesktopHeader({
  countryCode,
  isOverlay,
  menu,
  openCart,
  title,
}: {
  countryCode?: string | null;
  isOverlay: boolean;
  openCart: () => void;
  menu?: EnhancedMenu;
  title: string;
}) {
  const {y} = useWindowScroll();

  return (
    <header className="sticky  top-0  z-30">
      <div
        className={clsx(
          isOverlay ? 'absolute  inset-x-0  bg-opacity-50' : 'bg-opacity-50',
          'border-b  border-white-warm-100  bg-white-warm  backdrop-blur-lg  backdrop-filter',
        )}
      >
        <div className="absolute  inset-0  bg-gradient-to-b  from-white-warm  to-transparent"></div>
        <Disclosure as="nav" className={'relative  z-10'}>
          {({open}) => (
            <>
              <LayoutElement>
                <div className="relative flex items-center  space-x-6  py-6  lap-wide:py-4">
                  <div className="flex items-center px-2 lap-wide:px-0">
                    <div className="flex-shrink-0">
                      <a href="/">
                        <SiteLogo />
                      </a>
                    </div>
                  </div>
                  <div className="relative  flex  flex-1  items-center  justify-between  space-x-6">
                    <div className="flex flex-1 justify-center">
                      <div className="w-full">
                        <label htmlFor="search" className="sr-only">
                          Search
                        </label>
                        <div className="">
                          <SearchBar />
                        </div>
                      </div>
                    </div>
                    <div>
                      <ul className="flex  items-center  space-x-6">
                        {superNav.map((item) => (
                          <li
                            key={item.title}
                            className="flex  text-base  font-semibold"
                          >
                            <a
                              href={item.url}
                              className={
                                item.url == '/support/help-center'
                                  ? 'inline-flex items-center rounded-md border border-transparent bg-brand-600 px-4 py-2 text-white shadow-sm hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2'
                                  : 'hover:text-gray-800'
                              }
                            >
                              {item.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex lap-wide:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                          <MenuIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                    <div className="hidden lap-wide:ml-4 lap-wide:block">
                      <div className="flex items-center">
                        <button onClick={openCart}>
                          <div className="relative">
                            <ShoppingCartIcon className="h-6  w-6  text-stone-500  hover:text-stone-800" />
                          </div>
                          <CartBadge />
                        </button>

                        {/* Profile dropdown */}
                        <Popover className="relative ml-4 flex-shrink-0">
                          <div>
                            <Popover.Button className="flex  rounded-full text-sm text-stone-500  hover:text-stone-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                              <span className="sr-only">Open user menu</span>
                              <UserCircleIcon className="block  h-8  w-8" />
                            </Popover.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Popover.Panel
                              as="ul"
                              className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                              <li>
                                <a
                                  href="/account"
                                  className="block px-4 py-2 text-sm text-gray-700  hover:bg-gray-100"
                                >
                                  Account
                                </a>
                              </li>
                              <li>
                                <a
                                  href="/account/order-history"
                                  className="block px-4 py-2 text-sm text-gray-700  hover:bg-gray-100"
                                >
                                  Order History
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="block px-4 py-2 text-sm text-gray-700  hover:bg-gray-100"
                                >
                                  Sign out
                                </a>
                              </li>
                            </Popover.Panel>
                          </Transition>
                        </Popover>
                      </div>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="lap-wide:hidden">
                  <div className="space-y-1 px-2 pt-2 pb-3">
                    {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                    <Disclosure.Button
                      as="a"
                      href="#"
                      className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
                    >
                      Dashboard
                    </Disclosure.Button>
                    <Disclosure.Button
                      as="a"
                      href="#"
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      Team
                    </Disclosure.Button>
                    <Disclosure.Button
                      as="a"
                      href="#"
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      Projects
                    </Disclosure.Button>
                    <Disclosure.Button
                      as="a"
                      href="#"
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      Calendar
                    </Disclosure.Button>
                  </div>
                  <div className="border-t border-gray-700 pt-4 pb-3">
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium text-white">
                          Tom Cook
                        </div>
                        <div className="text-sm font-medium text-gray-400">
                          tom@example.com
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                      <Disclosure.Button
                        as="a"
                        href="#"
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        Your Profile
                      </Disclosure.Button>
                      <Disclosure.Button
                        as="a"
                        href="#"
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        Settings
                      </Disclosure.Button>
                      <Disclosure.Button
                        as="a"
                        href="#"
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        Sign out
                      </Disclosure.Button>
                    </div>
                  </div>
                </Disclosure.Panel>
              </LayoutElement>
            </>
          )}
        </Disclosure>
        <div className="relative  z-0  border-t  border-white/40  bg-white/25">
          <LayoutElement>
            <div className="flex  justify-center">
              <MainNav nav={menu} />
            </div>
          </LayoutElement>
        </div>
      </div>
    </header>
  );
}

function CartBadge({dark}: {dark: boolean}) {
  const {totalQuantity} = useCart();

  if (totalQuantity < 1) {
    return null;
  }
  return (
    <div
      className={`${
        dark
          ? 'bg-contrast dark:text-contrast text-primary dark:bg-primary'
          : 'text-contrast bg-primary'
      } absolute bottom-1 right-1 flex h-3 w-auto min-w-[0.75rem] items-center justify-center rounded-full px-[0.125rem] pb-px text-center text-[0.625rem] font-medium leading-none subpixel-antialiased`}
    >
      <span>{totalQuantity}</span>
    </div>
  );
}

const MainNav = ({nav}: {nav: EnhancedMenu}) => {
  return (
    <Popover.Group className="hidden lap-wide:ml-8 lap-wide:block lap-wide:self-stretch">
      <div className="flex h-full space-x-12">
        {(nav?.items || []).map((navItem) => (
          <Popover key={navItem.title} className="flex">
            {({open}) => (
              <>
                <div className="relative flex">
                  <Popover.Button
                    className={clsx(
                      open
                        ? 'border-brand-600 text-brand-600'
                        : 'border-transparent text-gray-700 hover:text-gray-800',
                      'relative z-10 -mb-px flex items-center border-b-2 py-2 text-base font-semibold  transition-colors duration-200 ease-out',
                    )}
                  >
                    {navItem.title}
                  </Popover.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Popover.Panel className="absolute inset-x-[4rem] top-full text-sm text-gray-500">
                    <div
                      className="absolute inset-0 top-[0.5rem] rounded-b-3xl  bg-white shadow"
                      aria-hidden="true"
                    />

                    <div className="relative rounded-b-3xl  bg-white">
                      <div className="mx-auto max-w-7xl px-8">
                        <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-12">
                          <div className="col-start-2 grid grid-cols-2 gap-x-8">
                            {/* {navItem.items.map((childNavItem) => (
                              <div
                                key={childNavItem.title}
                                className="group relative text-base sm:text-sm"
                              >
                                <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                                  <img
                                                      src={childNavItem.imageSrc}
                                                      alt={childNavItem.imageAlt}
                                                      className="object-center object-cover"
                                                    />
                                </div>
                                <a
                                  href={childNavItem.url}
                                  className="mt-6 block font-medium text-gray-900"
                                >
                                  <span
                                    className="absolute z-10 inset-0"
                                    aria-hidden="true"
                                  />
                                  {childNavItem.name}
                                </a>
                                <p aria-hidden="true" className="mt-1">
                                  Shop now
                                </p>
                              </div>
                            ))} */}
                          </div>
                          <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
                            {navItem.items.map((section) => (
                              <div key={section.title}>
                                <p
                                  id={`${section.title}-heading`}
                                  className="text-lg font-semibold  text-gray-900"
                                >
                                  {section.title}
                                </p>
                                <ul
                                  role="list"
                                  aria-labelledby={`${section.title}-heading`}
                                  className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                >
                                  {section.items.map((item) => (
                                    <li key={item.title} className="flex">
                                      <a
                                        href={item.url.replace(
                                          'https://farmers-friend.myshopify.com',
                                          '',
                                        )}
                                        className="text-base  hover:text-gray-800"
                                      >
                                        {item.title}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        ))}
      </div>
    </Popover.Group>
  );
};
