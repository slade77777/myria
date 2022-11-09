import Collection from 'src/components/marketplace/Collection';
import useMarketplaceCollection from 'src/hooks/useMarketplaceCollection';
import { useRouter } from 'next/router';
import useCheckStatusMarketplacePage from 'src/hooks/useCheckStatusMarketplacePage';
import MaintainPage from 'src/components/marketplace/MaintainPage/MaintainPage';
import { STATUS_PAGE } from '..';

const CollectionDetailPage = () => {
  const router = useRouter();
  const publicId = router.query.id as string;
  const { collection, isFetched } = useMarketplaceCollection(publicId);
  const { isLoading, error, data } = useCheckStatusMarketplacePage();

  if (data && data?.data.status !== STATUS_PAGE.AVAILABLE) return <MaintainPage />;

  if (data && data?.data.status === STATUS_PAGE.AVAILABLE)
    return <Collection collection={collection} collectionFetched={isFetched} />;

  return <div className="bg-base/3 h-screen w-screen"></div>;
};

export default CollectionDetailPage;
