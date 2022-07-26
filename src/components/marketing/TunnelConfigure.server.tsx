import {
  type HydrogenRouteProps,
  HydrogenResponse,
  Image,
  Seo,
} from '@shopify/hydrogen';
import clsx from 'clsx';
import groq from 'groq';

import {GenericPageLayout} from '~/components/index.server';
import {LayoutElement} from '~/components';
import useSanityQuery from '~/hooks/useSanityQuery';
import {NotFound} from '~/components/index.server';
import {TunnelResults} from '~/components';
import type {
  SanityMarketingOverviewPage,
  SanityMarketingSubPage,
} from '~/types';

export const TunnelConfigure = ({params}: {params?: HydrogenRouteProps}) => {
  const {handle, subpagehandle} = params;

  const {data: overviewPage} = useSanityQuery<SanityMarketingOverviewPage>({
    query: QUERY_SANITY_OVERVIEW,
    params: {slug: handle},
  });

  const {data: marketingSubPage} = useSanityQuery<SanityMarketingSubPage>({
    query: QUERY_SANITY_SUBPAGE,
    params: {slug: subpagehandle},
  });

  console.log(params);

  if (!overviewPage) {
    // @ts-expect-error <NotFound> doesn't require response
    return <NotFound />;
  }

  const sanitySeo = overviewPage.seo;

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
            className="desk:h-192  lazyautosizes  lazyload  h-96  w-full  bg-grey-lightest object-cover lap:h-96"
            loading="lazy"
            alt={'Hero image of ' + overviewPage.title}
            // style={{
            //   objectPosition:
            //     heroImage.focalPoint[0] * 100 +
            //     '% ' +
            //     heroImage.focalPoint[1] * 100 +
            //     '%',
            // }}
            src={overviewPage.image.modules.image.blurDataURL}
            width={'auto'}
            height={'100px'}
            data-sizes="auto"
            data-srcset={overviewPage.image.modules.image.url}
            sizes=""
            srcSet={overviewPage.image.modules.image.url}
          />
        </picture>
      </section>
      <LayoutElement>
        <TunnelResults />
      </LayoutElement>
    </GenericPageLayout>
  );
};

const QUERY_SANITY_OVERVIEW = groq`
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

const QUERY_SANITY_SUBPAGE = groq`
 *[
    _type == 'marketingSubPage' 
    && slug.current == $slug
  ][0]{
    title,
    "slug": slug.current,
  }
`;
