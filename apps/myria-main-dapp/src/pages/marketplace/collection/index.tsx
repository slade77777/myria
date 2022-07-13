import Collection from 'src/components/marketplace/Collection';
import useMarketplaceCollection from 'src/hooks/useMarketplaceCollection';
import { useRouter } from 'next/router';
import useCollectionAsset from 'src/hooks/useCollectionAsset';
import NotFoundPage from 'src/pages/404';

const CollectionDetailPage = () => {
  const router = useRouter();
  const publicId = router.query.id as string;
  const { collection } = useMarketplaceCollection(publicId);
  const {
    assets: { items }
  } = useCollectionAsset(collection?.id);

  if (!collection) {
    return <NotFoundPage />;
  }

  return <Collection collection={collection} assetItems={items} />;
};

export default CollectionDetailPage;
