import {type HydrogenRouteProps, Seo} from '@shopify/hydrogen';
import clsx from 'clsx';
import groq from 'groq';
import {GenericPageLayout} from '~/components/index.server';
import {LayoutElement} from '~/components';
import {
  Image,
  useQuery,
  useRouteParams,
  HydrogenResponse,
} from '@shopify/hydrogen';
import useSanityQuery from '~/hooks/useSanityQuery';
import {PAGE} from '~/fragments/sanity/pages/page';
import {NotFound} from '~/components/index.server';
import type {SanityMarketingOverviewPage} from '~/types';

export const MarketingOverview = ({params}: {params?: HydrogenRouteProps}) => {
  const {handle} = params;
  const {data: entry} = useSanityQuery<SanityMarketingOverviewPage>({
    query: QUERY_SANITY,
    params: {slug: handle},
  });

  console.log(entry);

  if (!entry) {
    // @ts-expect-error <NotFound> doesn't require response
    return <NotFound />;
  }

  const sanitySeo = entry.seo;

  return (
    <GenericPageLayout overlayNav={true}>
      <section aria-label="Hero Image">
        <picture>
          {/* <source
            data-srcset={heroImage.srcset}
            sizes="1542px"
            srcSet={heroImage.srcset}
          ></source> */}
          <Image
            className="desk:h-192  lazyautosizes  lazyload  h-96  w-full  bg-grey-lightest object-cover lap:h-[48rem]"
            loading="lazy"
            alt={'Hero image of ' + entry.title}
            // style={{
            //   objectPosition:
            //     heroImage.focalPoint[0] * 100 +
            //     '% ' +
            //     heroImage.focalPoint[1] * 100 +
            //     '%',
            // }}
            src={entry.image.modules.image.blurDataURL}
            width={'auto'}
            height={'100px'}
            data-sizes="auto"
            data-srcset={entry.image.modules.image.url}
            sizes=""
            srcSet={entry.image.modules.image.url}
          />
        </picture>
      </section>
      <LayoutElement>
        <div>
          {entry.title} {entry.slug}
        </div>
        <ul>
          {entry.subpages.map((item) => (
            <li>
              <a href={'/' + entry.slug + '/' + item.slug}>{item.title}</a>
            </li>
          ))}
        </ul>
        <div className="h-screen"></div>
      </LayoutElement>
    </GenericPageLayout>
  );
};

const QUERY_SANITY = groq`
 *[
    _type == 'marketingOverview'
    && slug.current == $slug
  ][0]{
    title,
    "slug": slug.current,
    image {
      ...,
      modules[0]{
        _key,
        _type,
        (_type == "module.image") => {
          image {
            ...,
            "altText": asset->altText,
            "blurDataURL": asset->metadata.lqip,
            'height': asset->metadata.dimensions.height,
            'url': asset->url,
            'width': asset->metadata.dimensions.width,
          }
        }
      }
    },
    "subpages": marketingSubPage[]-> {
      title,
      "slug": slug.current
    }
  }
`;
