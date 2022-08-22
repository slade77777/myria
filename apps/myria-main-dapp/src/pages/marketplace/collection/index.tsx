import Collection from 'src/components/marketplace/Collection';
import useMarketplaceCollection from 'src/hooks/useMarketplaceCollection';
import { useRouter } from 'next/router';
import useCollectionAsset from 'src/hooks/useCollectionAsset';
import NotFoundPage from 'src/pages/404';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { refresh } from 'aos';
import { AssetByCollectionIdResponse } from 'myria-core-sdk/dist/types/src/types/AssetTypes';
import { APIResponseType } from 'myria-core-sdk/dist/types/src/types/APIResponseType';
import { CommonPaginateDataTypes } from 'myria-core-sdk/dist/types/src/types/CommonTypes';
import { Loading } from 'src/components/Loading';
import MessageMobileView from 'src/components/marketplace/Modals/MessageMobileView';
import useCheckMobileView from 'src/hooks/useCheckMobileView';

const DEFAULT_PARAMS = {
  PAGE: 1,
  LIMIT: 10
};

const CollectionDetailPage = () => {
  const router = useRouter();
  const publicId = router.query.id as string;
  const { collection } = useMarketplaceCollection(publicId);
  const [loadMore, setLoadMore] = useState(false);
  const [payload, setPayload] = useState({
    page: DEFAULT_PARAMS.PAGE,
    limit: DEFAULT_PARAMS.LIMIT
  });
  const { isMobile, isResolution, setIsSolution } = useCheckMobileView();

  const [assetDataList, setAssetDataList] =
    useState<APIResponseType<CommonPaginateDataTypes<AssetByCollectionIdResponse>>>();

  const { assets, refetch, isLoading } = useCollectionAsset({
    collectionId: collection.id,
    page: payload.page,
    limit: payload.limit
  });

  useEffect(() => {
    if (assets?.data.meta.currentPage === DEFAULT_PARAMS.PAGE) {
      setAssetDataList(assets);
    }
  }, [assets]);

  //handle event scroll
  const handleScroll = (e: any) => {
    const { scrollTop, scrollHeight } = e.target.documentElement;
    if (scrollTop + window.innerHeight + 1 > scrollHeight && !isLoading) {
      setLoadMore(true);
    }
  };
  //event scroll
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (loadMore && payload.page < Number(assetDataList?.data.meta.totalPages)) {
      setPayload({ ...payload, page: ++payload.page });
      setLoadMore(false);
    }
  }, [loadMore]);

  useEffect(() => {
    if (payload.page > DEFAULT_PARAMS.PAGE) {
      refetch().then((res) => {
        if (`${res?.data?.data.items}`.length !== 0) {
          const currentAssetList = res.data?.data.items;
          setAssetDataList((prev: any) => {
            return {
              ...prev,
              data: {
                ...prev?.data,
                items: prev?.data.items?.concat(currentAssetList)
              }
            };
          });
        } else if (`${res?.data?.data.items}`.length === 0) {
          // setPayload({ ...payload, page: Number(res.data?.data.meta.currentPage) - 1 });
        }
      });
    }
  }, [payload]);

  if (isMobile) {
    return <MessageMobileView isShow={isResolution} handleClose={() => setIsSolution(false)} />;
  }

  return <Collection collection={collection} assetItems={assetDataList?.data} />;
};

export default CollectionDetailPage;
