import {useRef} from 'react';
import {useScroll} from 'react-use';
import {fetchSync} from '@shopify/hydrogen';
import {Button, Text, Heading, Skeleton} from '~/components';
import {ProductCard} from '~/components';
import type {Product} from '@shopify/hydrogen/storefront-api-types';
import {Suspense} from 'react';

export function CartEmpty({
  onClose,
  layout = 'drawer',
}: {
  onClose?: () => void;
  layout?: 'page' | 'drawer';
}) {
  const scrollRef = useRef(null);
  const {y} = useScroll(scrollRef);

  const container = {
    drawer: `grid content-start gap-4 px-6 pb-8 transition overflow-y-scroll lap:gap-12 lap:px-12 h-screen-no-nav lap:pb-12 ${
      y > 0 ? 'border-t' : ''
    }`,
    page: `grid pb-12 w-full lap:items-start gap-4 lap:gap-8 lap-wide:gap-12`,
  };

  const topProductsContainer = {
    drawer: '',
    page: 'lap:grid-cols-4 hands:grid-col-4',
  };

  return (
    <div ref={scrollRef} className={container[layout]}>
      <section className="grid gap-6">
        <Text format>
          Looks like you haven&rsquo;t added anything yet, let&rsquo;s get you
          started!
        </Text>
        <div>
          <Button onClick={onClose}>Continue shopping</Button>
        </div>
      </section>
      <section className="grid gap-8 pt-4">
        <Heading format size="copy">
          Shop Best Sellers
        </Heading>
        <div
          className={`grid grid-cols-2 gap-x-6 gap-y-8 ${topProductsContainer[layout]}`}
        >
          <Suspense fallback={<Loading />}>
            <TopProducts onClose={onClose} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}

function TopProducts({onClose}: {onClose?: () => void}) {
  const products: Product[] = fetchSync('/api/bestSellers').json();

  if (products.length === 0) {
    return <Text format>No products found.</Text>;
  }

  return (
    <>
      {products.map((product) => (
        <ProductCard product={product} key={product.id} onClick={onClose} />
      ))}
    </>
  );
}

function Loading() {
  return (
    <>
      {[...new Array(4)].map((_, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={i} className="grid gap-2">
          <Skeleton className="aspect-[3/4]" />
          <Skeleton className="h-4 w-32" />
        </div>
      ))}
    </>
  );
}
