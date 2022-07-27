import { Trans } from '@lingui/macro';
import { CollectionItems } from 'myria-core-sdk/dist/types/src/types/CollectionTypes';
import { CommonPaginateDataTypes } from 'myria-core-sdk/dist/types/src/types/CommonTypes';
import Link from 'next/link';
import React, {useCallback} from 'react';
import { useQuery } from 'react-query';
import { collectionModule } from 'src/services/myriaCore';
import { validatedImage } from 'src/utils';
import {useGA4} from "../../../lib/ga";
import {useAuthenticationContext} from "../../../context/authentication";
import {useWalletContext} from "../../../context/wallet";

const HotCollection: React.FC = () => {
  const { event } = useGA4();
  const { user } = useAuthenticationContext();
  const { address } = useWalletContext();

  const payload = {
    limit: 10,
    page: 1,
    isHot: true
  };

  const { data, isLoading, error } = useQuery(['marketplace', 'hotCollection'], () =>
    collectionModule?.getCollectionList(payload)
  );

  const onClickCollectionTracking = useCallback((itm: CollectionItems) => {
    return event('MKP Collection Selected', {
      myria_id: user?.user_id,
      wallet_address: `_${address}`,
      collection_name: itm?.name,
      collection_author: itm?.project?.name
    });
  }, [user, address])

  const hotCollection: CommonPaginateDataTypes<CollectionItems[]> | undefined = data?.data;

  if (isLoading) return <></>;
  return (
    <>
      <div className="grid gap-8 overflow-x-scroll md:grid-cols-2 ">
        {hotCollection?.items.map((itm: CollectionItems, idx: number) => {
          return (
            <Link href={`/marketplace/collection?id=${itm.publicId}`} key={idx}>
              <a
                onClick={() => onClickCollectionTracking(itm)}
                href={`/marketplace/collection?id=${itm.publicId}`}
                className="bg-base/3 cursor-pointer rounded-lg">
                <div key={idx} className={`bg-base/3 overflow-hidden rounded-lg`}>
                  <div
                    className="h-[248px] bg-cover bg-center "
                    style={{
                      backgroundImage: `url(${validatedImage(itm.collectionImageUrl)})`
                    }}></div>
                  <div className="bg-base/3 relative flex  flex-col  items-center pb-[32px]">
                    <div
                      className="border-base/3 absolute left-1/2 h-[80px] w-[80px] -translate-x-1/2 -translate-y-1/2 transform rounded-[40px] border-[4px] bg-center "
                      style={{
                        backgroundImage: `url(${
                          itm.iconUrl ? itm.iconUrl : '/images/marketplace/collection-2-logo.png'
                        })`
                      }}></div>
                    <div className="mt-[40px] text-center">
                      <p className="mt-[16px] text-xl font-bold">
                        <Trans>{itm.name}</Trans>
                      </p>
                      <p className="text-light mt-[9px] text-[16px]">
                        by
                        <Trans>
                          <span className="text-blue/6">{' ' + itm.project.companyName} </span>
                        </Trans>
                      </p>
                      <p className="text-light mt-[16px] px-[32px] text-center text-[16px]">
                        <Trans>{itm.description}</Trans>
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default HotCollection;
