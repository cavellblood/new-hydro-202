import {useShopQuery, useQuery, gql, CacheLong} from '@shopify/hydrogen';

import {BodyContent, BodyHtml, BodyJs} from '~/components';
import {SiteFooter} from '~/components/index.server';
import {SiteHeader} from '~/components';
import {CartDrawer} from '~/components';
import React, {ReactNode, Suspense} from 'react';
import {Menu, Shop} from '@shopify/hydrogen/storefront-api-types';
import {parseMenu} from '../../../src-new/lib/utils';

const SHOP_NAME_FALLBACK = 'Farmers Friend';
const HEADER_MENU_HANDLE = 'hydrogen-main-nav';
const FOOTER_MENU_HANDLE = 'hydrogen-footer-nav';

export function GenericPageLayout({
  children,
  bodyJs,
  overlayNav,
}: {
  children: React.ReactNode;
  bodyJs: string;
  overlayNav: boolean;
}) {
  return (
    <BodyContent
      bodyHtml={<Html overlayNav={overlayNav}>{children}</Html>}
      bodyJs={<Js>{bodyJs}</Js>}
    ></BodyContent>
  );
}

const Html = ({
  children,
  overlayNav,
}: {
  children: React.ReactNode;
  overlayNav: boolean;
}) => {
  const {data} = useShopQuery<{
    shop: Shop;
    mainNav: Menu;
    footerNav: Menu;
  }>({
    query: SHOP_QUERY,
    variables: {
      mainNavHandle: HEADER_MENU_HANDLE,
      footerNavHandle: FOOTER_MENU_HANDLE,
    },
    cache: CacheLong(),
    preload: '*',
  });

  const storeName = data ? data.shop.name : SHOP_NAME_FALLBACK;
  const mainNav = data?.mainNav ? parseMenu(data.mainNav) : undefined;
  const footerNav = data?.footerNav ? parseMenu(data.footerNav) : undefined;

  return (
    <BodyHtml>
      <Suspense fallback={null}>
        <SiteHeader isOverlay={overlayNav} menu={mainNav} />
      </Suspense>
      <div id="content-container">
        <main role="main">{children}</main>
      </div>
      <SiteFooter storeName={storeName} nav={footerNav} />
    </BodyHtml>
  );
};

const Js = ({children}: {children: React.ReactNode}) => {
  return <BodyJs>{children}</BodyJs>;
};

const SHOP_QUERY = gql`
  fragment MenuItem on MenuItem {
    title
    type
    url
    id
    resourceId
    tags
  }
  query layoutContent($mainNavHandle: String!, $footerNavHandle: String!) {
    shop {
      name
    }
    mainNav: menu(handle: $mainNavHandle) {
      title
      handle
      id
      items {
        ...MenuItem
        items {
          ...MenuItem
          items {
            ...MenuItem
          }
        }
      }
    }
    footerNav: menu(handle: $footerNavHandle) {
      title
      handle
      id
      items {
        ...MenuItem
        items {
          ...MenuItem
        }
      }
    }
  }
`;
