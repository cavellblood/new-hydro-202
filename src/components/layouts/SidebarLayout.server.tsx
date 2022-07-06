import {Link} from '@shopify/hydrogen';
import { GenericPageLayout } from '~/components/index.server';
import {LayoutElement} from '~/components';

export default function SidebarLayout({children, header, sidebar, bodyJs}) {
  return (
    <GenericPageLayout bodyJs={<BodyJs />}>
      <LayoutElement>
        {header}
        <DefaultHeader data={{section: 'About Us', title: 'Our Mission'}}>
          child
        </DefaultHeader>
        <div className="flex  space-x-4">
          <div className="lap:w-1/4  desk:w-1/5">
            <SidebarNav nav={sidebar} />
          </div>
          <div className="lap:w-3/4  desk:w-4/5">{children}</div>
        </div>
      </LayoutElement>
    </GenericPageLayout>
  );
}

const Content = ({children}) => {
  return <p>{children}</p>;
};

const Header = ({children, data}) => {
  return (
    <>
      <div>{children}</div>
    </>
  );
};

const SidebarNav = ({nav}) => {
  return (
    <nav className="mb-6">
      <ul className="mt-0  mb-0  lap:mb-8">
        {nav.map((item, index) => (
          <li
            className={`${index > 0 ? 'border-t' : ''} border-grey-lightest`}
            key={item.title}
          >
            <Link
              className={`${index == 0 ? 'rounded-t-lg' : ''}
                    ${index == nav.length - 1 ? 'rounded-b-lg' : ''}
                    ${item.level == 2 ? 'lap:pl-8' : 'pl-4'}
                     link  block  bg-near-white  py-2  pr-2  hover:bg-white  lap:bg-transparent  lap:py-4  lap:pr-4`}
              to={item.url}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}


const DefaultHeader = ({data}) => {
  return (
    <header className="mb-8  text-center  lap:pb-2  desk:mb-16  desk:pb-0">
      <h3 className="relative  my-0  text-base  font-normal  text-grey-dark  lap:text-2xl  desk:-mb-4  desk:mt-4">
        {data.section}
      </h3>

      <h2 className="my-0  inline-block  bg-white-warm  px-2  text-4xl  font-bold  leading-none  lap:px-4  lap:pb-2  lap:text-5xl  lap-wide:leading-normal  desk:text-7xl">
        {data.title}
      </h2>

      <hr className="-mt-4  border-t-2  border-grey-lightest  lap:-mt-8  lap:border-t-4  lap-wide:-mt-10  desk:-mt-16" />
    </header>
  );
};

const BodyJs = () => {
  return '';
};
