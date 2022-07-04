import Collection from '../../../components/marketplace/Collection';
import useMarketplaceCollection from '../../../hooks/useMarketplaceCollection';
import { useRouter } from 'next/router';
import useCollectionAsset from 'src/hooks/useCollectionAsset';

const CollectionDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { collection } = useMarketplaceCollection(parseInt(id as string));
  const {
    assets: { items }
  } = useCollectionAsset(id as string);

  return (
    <Collection
      collectionImageUrl={collection?.collectionImageUrl}
      name={collection.name}
      createdBy=""
      description={collection.description}
      assetItems={items || []}
    />
  );
};

export default CollectionDetailPage;
