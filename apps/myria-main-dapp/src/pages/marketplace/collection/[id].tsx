import Collection from '../../../components/marketplace/Collection';
import useMarketplaceCollection from '../../../hooks/useMarketplaceCollection';
import { useRouter } from 'next/router';
import useCollectionAsset from 'src/hooks/useCollectionAsset';

const CollectionDetailPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { collection } = useMarketplaceCollection(parseInt(id));
  const {
    assets: { items }
  } = useCollectionAsset(id);

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
