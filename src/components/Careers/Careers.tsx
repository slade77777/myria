import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import useCareerCategories from 'src/hooks/useCareerCategories';
import ChevronDownIcon from '../icons/ChevronDownIcon';
import { Trans } from '@lingui/macro';
import ArrowRightIcon from '../icons/ArrowRightIcon';
import useClickOutside from 'src/hooks/useClickOutside';
import Link from 'next/link';

const Careers: React.FC = () => {
  const allCategories = useCareerCategories();
  const filterRef = useRef(null);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [currentFilterName, setCurrentFilterName] = useState<string | null>(null);

  const categories = allCategories.filter((item) => item.jobs && item.jobs.length > 0);
  const departments = categories.filter((item) => !selectedCategory || item.id === selectedCategory);

  const onClickFilter = (filter: typeof categories[number] | null) => {
    setOpenFilter(false);

    if (!filter) {
      setSelectedCategory(null);
      return;
    }
    setSelectedCategory(filter.id)
    setCurrentFilterName(filter.name);
  }

  useClickOutside(filterRef, () => setOpenFilter(false));

  return (
    <div>
      <div className="relative">
        <div className="flex justify-center">
          <div
            className="mb-12 inline-flex w-80 cursor-pointer items-center justify-between rounded-lg bg-brand-deep-blue px-8 py-2 md:mb-[78px]"
            onClick={() => setOpenFilter(!openFilter)}>
            <p>{selectedCategory ? currentFilterName : 'Filter by Department'}</p>
            <div className="h-6 w-6">
              <ChevronDownIcon />
            </div>
          </div>
        </div>
        <div
          className={clsx(
            'absolute top-14 left-1/2 min-w-[365px] -translate-x-1/2 transform rounded-3xl bg-brand-deep-blue shadow-2xl',
            { hidden: !openFilter }
          )}>
          <div className="grid grid-cols-3 gap-7 p-7" ref={filterRef}>
            <p
              className={clsx('cursor-pointer text-center', {
                'text-brand-gold': !selectedCategory
              })}
              onClick={() => onClickFilter(null)}>
              All
            </p>
            {categories.map((category) => (
              <p
                className={clsx('cursor-pointer text-center', {
                  'text-brand-gold': selectedCategory === category.id
                })}
                key={category.id}
                onClick={() => onClickFilter(category)}>
                {category.name}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="-mx-3">
        {departments.map((item) => (
          <div
            className="border-t border-[rgba(151,170,181,0.2)] pt-14 md:grid md:grid-cols-3 md:gap-4"
            key={item.id}>
            <h3 className="heading-list mb-9 text-left md:mb-14">{item.name}</h3>
            <div className="pb-14 md:col-span-2 md:mt-5">
              {item.jobs?.map((pos) => (
                <Link href={pos.absolute_url} key={pos.id} passHref>
                  <a target="_blank" rel="noreferrer">
                    <div key={pos.id} className="mb-4 flex flex-row items-baseline">
                      <div className="flex-1 text-left">
                        <h3 className="body ">{pos.title}</h3>
                        <p className="text-light">{pos.location?.name || '-'}</p>
                      </div>
                      <div className="mt-6 flex text-brand-gold">
                        <p className="body font-medium">
                          <Trans>View job</Trans>
                        </p>
                        <div className="ml-2">
                          <ArrowRightIcon />
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Careers;
