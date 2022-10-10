import { Trans } from '@lingui/macro';
import { CollectionListResponse, CommonPaginateDataTypes } from 'myria-core-sdk';
import Link from 'next/link';
import React, { useCallback } from 'react';
import { useQuery } from 'react-query';
import { collectionModule } from 'src/services/myriaCore';
import { validatedImage } from 'src/utils';
import { useGA4 } from '../../../lib/ga';
import { useAuthenticationContext } from '../../../context/authentication';
import { useWalletContext } from '../../../context/wallet';

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

  const onClickCollectionTracking = useCallback(
    (itm: CollectionListResponse) => {
      return event('MKP Collection Selected', {
        myria_id: user?.user_id,
        wallet_address: `_${address}`,
        collection_name: itm?.name,
        collection_author: itm?.project?.name
      });
    },
    [user, address]
  );

  const hotCollection: CommonPaginateDataTypes<CollectionListResponse[]> | undefined = data?.data;

  if (isLoading) return <></>;
  return (
    <>
      <div className="grid gap-8 overflow-x-scroll md:grid-cols-2 ">
        {hotCollection?.items.map((itm: CollectionListResponse, idx: number) => {
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
                    }}
                  />
                  <div className="bg-base/3 relative flex  flex-col  items-center pb-8">
                    <div
                      className="border-base/3 absolute left-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-[4px] bg-contain bg-center "
                      style={{
                        backgroundImage: `url(${
                          itm.iconUrl ? itm.iconUrl : '/images/marketplace/collection-2-logo.png'
                        })`
                      }}
                    />
                    <div className="mt-10 w-full px-8 text-center">
                      <p className="mt-4 text-xl font-bold">
                        <Trans>{itm.name}</Trans>
                      </p>
                      <p className="text-light mt-[9px] text-base">
                        by
                        <Trans>
                          <span className="text-blue/6 font-medium">
                            {' ' + itm.project.companyName}{' '}
                          </span>
                        </Trans>
                      </p>
                      <p className="text-light mt-4 truncate text-center text-base">
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
