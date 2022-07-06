import { Suspense } from 'react';
import {SiteHeader} from '~/components';
// import {SiteFooter} from '@/components/SiteFooter.client';
import {LayoutElement} from '~/components';
import {BodyHtml} from '~/components';

const MainNavigation = () => {
  const navItems = [{title: '', url: '#', items: [{title: '', url: ''}]}];
  return {
    title: 'Main Fallback Nav',
    items: [
      {
        title: 'Tunnels',
        url: '#',
        items: navItems,
      },
      {
        title: 'Tools',
        url: '#',
        items: navItems,
      },
      {
        title: 'Tarps & Rolls',
        url: '#',
        items: navItems,
      },
      {
        title: 'Parts',
        url: '#',
        items: navItems,
      },
      {
        title: 'Books',
        url: '#',
        items: navItems,
      },
      {
        title: 'Software',
        url: '#',
        items: navItems,
      },
      {
        title: 'Swag',
        url: '#',
        items: navItems,
      },
    ],
  };
};

const FooterNavigation = () => {
  return {
    title: '',
    items: [
      {
        title: 'About Us',
        items: [
          {title: 'Our Mission', url: '#'},
          {title: 'Our History', url: '#'},
          {title: 'The Team', url: '#'},
          {title: 'Careers', url: '#'},
        ],
      },
      {
        title: 'Customer Support',
        items: [
          {title: 'Service Update', url: '#'},
          {title: 'Help Center', url: '#'},
          {title: 'Satisfaction Guarantee', url: '#'},
          {title: 'Returns & Exchanges', url: '#'},
          {title: 'Privacy Policy', url: '#'},
        ],
      },
    ],
  };
};

/**
 * A shared component and Suspense call that's used in `App.server.jsx` to let your app wait for code to load while declaring a loading state
 */
export const LoadingFallback = () => {
  return (
    <BodyHtml>
      <Suspense fallback={ null}>
      </Suspense>
      <div id="content-container">
        <main role="main">
          <LayoutElement>
            <div className="flex  items-center  justify-center  py-20">
              <div>Loading indicator here</div>
            </div>
          </LayoutElement>
        </main>
      </div>
      {/* <SiteFooter
        storeName="Farmers Friend"
        nav={FooterNavigation()}
        isFallback={true}
      /> */}
    </BodyHtml>
  );
};
