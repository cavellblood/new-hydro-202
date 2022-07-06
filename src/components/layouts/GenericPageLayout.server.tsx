import {useShopQuery, useQuery, gql, CacheLong} from '@shopify/hydrogen';

import {BodyContent, BodyHtml, BodyJs} from '~/components';
import {SiteFooter} from '~/components/index.server';
import {SiteHeader} from '~/components';
import {CartDrawer} from '~/components';
import React, {ReactNode, Suspense} from 'react';

const SHOP_NAME_FALLBACK = 'Farmers Friend';

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
  const {data} = useShopQuery({
    query: QUERY,
    cache: CacheLong(),
    variables: {
      mainNavHandle: 'hydrogen-main-nav',
      footerNavHandle: 'hydrogen-footer-nav',
    },
    preload: '*',
  });
  const storeName = data ? data.shop.name : '';
  const mainNav = data ? data.mainNav : '';
  const footerNav = data ? data.footerNav : '';

  return (
    <BodyHtml>
      <Suspense fallback={null}>
        <SiteHeader isOverlay={overlayNav} />
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

const QUERY = gql`
  fragment menuItemFields on MenuItem {
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
        ...menuItemFields
        items {
          ...menuItemFields
          items {
            ...menuItemFields
          }
        }
      }
    }
    footerNav: menu(handle: $footerNavHandle) {
      title
      handle
      id
      items {
        ...menuItemFields
        items {
          ...menuItemFields
        }
      }
    }
  }
`;
