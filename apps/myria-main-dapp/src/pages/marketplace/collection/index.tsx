import Collection from 'src/components/marketplace/Collection';
import useMarketplaceCollection from 'src/hooks/useMarketplaceCollection';
import { useRouter } from 'next/router';
import MessageMobileView from 'src/components/marketplace/Modals/MessageMobileView';
import useCheckMobileView from 'src/hooks/useCheckMobileView';

const CollectionDetailPage = () => {
  const router = useRouter();
  const publicId = router.query.id as string;
  const { collection, isFetched } = useMarketplaceCollection(publicId);
  const { isMobile, isResolution, setIsSolution } = useCheckMobileView();

  if (isMobile) {
    return <MessageMobileView isShow={isResolution} handleClose={() => setIsSolution(false)} />;
  }

  return <Collection collection={collection} collectionFetched={isFetched} />;
};

export default CollectionDetailPage;
