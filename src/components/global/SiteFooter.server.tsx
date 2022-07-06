import {Link, Image} from '@shopify/hydrogen';
import {LayoutElement} from '~/components';

import {Amex, ApplePay, Discover, MasterCard, PayPal, Visa} from '~/components';

/**
 * A server component that specifies the content of the footer on the website
 */
export const SiteFooter = ({storeName, nav, isFallback}) => {
  return (
    <footer className="bg-near-black  py-8  lap-wide:pt-16">
      <LayoutElement>
        <div className="flex  flex-wrap  justify-start  lap-wide:justify-between">
          <div className="flex  w-full  flex-wrap  justify-start  space-x-2  lap-wide:w-2/3">
            {nav.items.map((section) => (
              <div
                key={section.title}
                className="lap:w-1/3  lap-wide:w-auto  lap-wide:pr-12"
              >
                <h4 className="mb-1  mt-4  text-sm  font-bold  lap:mb-4  lap-wide:mt-0">
                  <a
                    href="{{ node.url }}"
                    className="uppercase  tracking-wider  text-grey-lighter no-underline  hover:underline"
                  >
                    {section.title}
                  </a>
                </h4>
                <ul className="list-reset  mb-3  mt-0  desk:mb-0">
                  {section.items.map((child) => (
                    <li key={child.title} className="pb-1  pt-0  text-base">
                      <Link
                        className="text-grey  no-underline  hover:text-grey-lighter"
                        to={child.url.replace(
                          'https://farmers-friend.myshopify.com',
                          '',
                        )}
                      >
                        {child.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="max-w-lg  lap:max-w-full  lap-wide:w-1/3">
            <h4 className="mb-1  mt-8  text-sm  font-bold  lap:mb-4  lap-wide:mt-0">
              <span className="uppercase  tracking-wider text-grey-lighter">
                {storeName} Newsletter
              </span>
            </h4>
            <p className="mb-4  text-sm  text-grey">
              Join our occasional newsletter for product launches, growing tips,
              and announcements:
            </p>
            <a
              href="https://farmersfriendllc.us10.list-manage.com/subscribe?u=90bab6faae9548499b8830586&amp;id=8697f3fa09"
              target="_blank"
              className="o-btn  o-btn--xl  group  flex  items-center  justify-between  bg-grey-darkest  py-4  text-grey-light  hover:bg-black  focus:bg-black"
              rel="noreferrer"
            >
              <span className="">Subscribe to Our Newsletter</span>
              <svg
                className="h-5  w-5  text-primary"
                data-icon="arrow-right"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </a>
          </div>
        </div>
        <div className="mt-6  w-full">
          <div className="flex  flex-wrap  items-center  justify-start  space-x-2">
            <div>
              <p className="text-grey-darker">
                &copy; {new Date().getFullYear()} {storeName}.{' '}
              </p>
            </div>
            <div>
              <div className="rounded-full  bg-black  px-2  text-xs  font-bold  text-grey-darker">
                <p className="js-app-version"></p>
              </div>
            </div>
            <div className="mt-3  w-full  lap:mt-0  lap:w-auto">
              <div className="flex  space-x-3">
                <div>
                  <Visa></Visa>
                </div>
                <div>
                  <Discover></Discover>
                </div>
                <div>
                  <MasterCard></MasterCard>
                </div>
                <div>
                  <Amex></Amex>
                </div>
                <div>
                  <ApplePay></ApplePay>
                </div>
                <div>
                  <PayPal></PayPal>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="fixed  left-0  bottom-0  z-10  w-full">
            <a
              href="/support/help-center"
              className="o-btn  o-btn--primary  o-btn--xl  w-full  rounded-t-lg  rounded-b-none  text-center  lap-wide:hidden"
            >
              Need Help?
            </a>
          </div>
        </div>
      </LayoutElement>
    </footer>
  );
};
