import {GenericPageLayout} from '~/components/index.server';
import {LayoutElement} from '~/components';
import {
  Image,
  useQuery,
  useRouteParams,
  HydrogenResponse,
} from '@shopify/hydrogen';
import {NotFound} from '~/components/index.server';

export const MarketingOverview = ({
  response,
}: {
  response?: HydrogenResponse;
}) => {
  const {handle} = useRouteParams();
  const endpoint = 'http://localhost:8000/api';
  const headers = {
    'content-type': 'application/json',
    Authorization: 'Bearer wIAT3SzKMjqvz01dG_rV6kUuaXAek_Hj',
  };
  const graphqlquery = {
    query: QUERY,
    variables: {
      slug: handle,
    },
  };
  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify(graphqlquery),
  };

  const queryName = 'marketingPage-' + handle;

  const {data} = useQuery(queryName, async () => {
    const response = await fetch(endpoint, options);

    return (await response.json()).data.entry;
  });

  const entry = data;

  // Return not found page if not entry exists
  if (entry == null) {
    return <NotFound />;
  }

  const heroImage = entry.image[0];
  const heroLQIP = heroImage.srcset.split(', ')[0].split(' ')[0];

  return (
    <GenericPageLayout overlayNav={true}>
      <section aria-label="Hero Image">
        <picture>
          <source
            data-srcset={heroImage.srcset}
            sizes="1542px"
            srcSet={heroImage.srcset}
          ></source>
          <Image
            className="desk:h-192  lazyautosizes  lazyload  h-96  w-full  bg-grey-lightest object-cover lap:h-[48rem]"
            loading="lazy"
            alt={heroImage.title}
            style={{
              objectPosition:
                heroImage.focalPoint[0] * 100 +
                '% ' +
                heroImage.focalPoint[1] * 100 +
                '%',
            }}
            src={heroLQIP}
            width={'auto'}
            height={'100px'}
            data-sizes="auto"
            data-srcset={heroImage.srcset}
            sizes=""
            srcSet={heroImage.srcset}
          />
        </picture>
      </section>
      <LayoutElement>
        <div className="h-screen"></div>
      </LayoutElement>
    </GenericPageLayout>
  );
};

const QUERY = `query marketingOverview($limit: Int = 1, $slug: [String]) {
  entry(slug: $slug, limit: $limit, section: "marketing") {
    ... on marketing_overview_Entry {
      id
      title
      slug
      navUseOverlay
      textColor
      image {
        id
        title
        srcset(sizes: ["128w", "640w", "1200w", "2048w"])
        focalPoint
        width
        height
      }
      children {
        id
        title
      }
      layout {
        ... on layout_feature_BlockType {
          id
          typeHandle
          actionButtons {
            ... on actionButtons_BlockType {
              id
              customUrl
              text
            }
          }
          layoutPosition
          badges {
            ... on badges_BlockType {
              id
              stat
              icon {
                id
                url
                ... on images_Asset {
                  id
                }
              }
              label
              badgeLink
              enabled
              title
            }
          }
        }
        ... on layout_heroList_BlockType {
          id
          typeHandle
        }
        ... on layout_heroText_BlockType {
          id
          typeHandle
          actionButtons {
            ... on actionButtons_BlockType {
              id
              customUrl
              text
            }
          }
          eyebrow
          headline
          text
        }
        ... on layout_heroVideo_BlockType {
          id
          typeHandle
          videoTitle
          videoUrl
          youtubeAsset {
            id
          }
        }
        ... on layout_hero2Up_BlockType {
          id
          typeHandle
          eyebrow
          headline
          text
        }
        ... on layout_badge_BlockType {
          id
          typeHandle
          badgeLink
          icon {
            url
            id
            title
          }
          text
        }
        ... on layout_fullSection_BlockType {
          id
          typeHandle
          eyebrow
          headline
          text
        }
        ... on layout_product_BlockType {
          id
          typeHandle
        }
        ... on layout_imageGallery_BlockType {
          id
          typeHandle
        }
        ... on layout_upgrades_BlockType {
          id
          typeHandle
        }
      }
    }
  }
}
`;
