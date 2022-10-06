import { Trans } from '@lingui/macro';
import { CollectionListResponse, CommonPaginateDataTypes } from 'myria-core-sdk';
import Link from 'next/link';
import React, { useCallback, useMemo } from 'react';
import { useQuery } from 'react-query';
import { collectionModule } from 'src/services/myriaCore';
import { validatedImage } from 'src/utils';
import { useGA4 } from '../../../lib/ga';
import { useAuthenticationContext } from '../../../context/authentication';
import { useWalletContext } from '../../../context/wallet';
import Slider, { Settings } from 'react-slick';

const HotCollectionMobile: React.FC = () => {
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

  const settings: Settings = useMemo(
    () => ({
      arrows: false,
      dots: false,
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplaySpeed: 30000,
      pauseOnHover: true,
      centerMode: true,
      className: 'left',
      centerPadding: '24px 0 0'
    }),
    []
  );

  const hotCollection: CommonPaginateDataTypes<CollectionListResponse[]> | undefined = data?.data;

  if (isLoading) return <></>;
  return (
    <div className="relative">
      <Slider {...settings}>
        {hotCollection?.items.map((itm: CollectionListResponse, idx: number) => {
          return (
            <div key={idx}>
              <div className="flex h-[366px] flex-col justify-end md:justify-center pl-6 md:min-h-[calc(100vw/2.38)] rounded-xl">
                <div className="h-full">
                  <Link href={`/marketplace/collection?id=${itm.publicId}`} key={idx}>
                    <a
                      onClick={() => onClickCollectionTracking(itm)}
                      href={`/marketplace/collection?id=${itm.publicId}`}
                      className="bg-base/3 cursor-pointer rounded-lg">
                      <div key={idx} className={`bg-base/3 overflow-hidden rounded-lg h-full`}>
                        <div
                          className="h-[124px] bg-cover bg-center "
                          onError={() => console.log(idx)}
                          style={{
                            backgroundImage: `url(${validatedImage(itm.collectionImageUrl)})`
                          }}
                        />
                        <div className="bg-base/3 relative flex flex-col items-center pb-8">
                          <div
                            className="border-base/3 absolute left-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/4 transform rounded-full border-[4px] bg-contain bg-center "
                            style={{
                              backgroundImage: `url(${
                                itm.iconUrl
                                  ? itm.iconUrl
                                  : '/images/marketplace/collection-2-logo.png'
                              })`
                            }}
                          />
                          <div className="mt-10 w-full px-8 text-center">
                            <p className="text-[20px] font-bold truncate">
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
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default HotCollectionMobile;
