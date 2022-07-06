
import {HydrogenResponse} from '@shopify/hydrogen';
import TunnelResults from '~/components/marketing/TunnelResults.client';

export default function Overview({
  response,
  type = 'page',
}: {
  response?: HydrogenResponse;
  type?: string;
}) {
  return <TunnelResults />;
}
