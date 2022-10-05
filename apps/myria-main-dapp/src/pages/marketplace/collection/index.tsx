import Collection from 'src/components/marketplace/Collection';
import useMarketplaceCollection from 'src/hooks/useMarketplaceCollection';
import { useRouter } from 'next/router';

const CollectionDetailPage = () => {
  const router = useRouter();
  const publicId = router.query.id as string;
  const { collection, isFetched } = useMarketplaceCollection(publicId);

  return <Collection collection={collection} collectionFetched={isFetched} />;
};

export default CollectionDetailPage;
