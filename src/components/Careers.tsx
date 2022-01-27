import clsx from 'clsx';
import React, { useState } from 'react';
import useCareerCategories from 'src/hooks/useCareerCategories';
import Collapse from './Collapse';
import ChevronDownIcon from './icons/ChevronDownIcon';

const Careers: React.FC = () => {
  const categories = useCareerCategories();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const positions = categories
    .filter((item) => !selectedCategory || selectedCategory == item.id)
    .flatMap((item) => item.jobs);

  return (
    <div>
      <div className="flex flex-wrap -mx-3 -mt-3">
        <button
          onClick={() => {
            setSelectedCategory(null);
          }}
          className={clsx('mx-2 my-2 btn-lg btn-dark-blue', {
            active: selectedCategory === null
          })}>
          All positions
        </button>
        {categories.map((item) => (
          <button
            onClick={() => {
              setSelectedCategory(item.id);
            }}
            key={item.id}
            className={clsx('mx-2 my-2 btn-lg btn-dark-blue', {
              active: selectedCategory === item.id
            })}>
            {item.label}
          </button>
        ))}
      </div>
      <div className="lg:px-[70px] mt-[56px]">
        {positions.map((pos) => (
          <React.Fragment key={pos.id}>
            <div className="mt-6">
              <Collapse asChild>
                {({ open }) => (
                  <div>
                    <Collapse.Trigger asChild>
                      <div className="flex items-center justify-between cursor-pointer">
                        <h3 className="heading-list">{pos.label}</h3>
                        <i
                          className={clsx('w-[24px] transition duration-300', {
                            'rotate-180': open
                          })}>
                          <ChevronDownIcon />
                        </i>
                      </div>
                    </Collapse.Trigger>
                    <Collapse.Content>
                      <div className="pb-2">
                        <p className="mt-6 body text-light">{pos.description}</p>
                        <a
                          target="_blank"
                          href={pos.link}
                          className="mt-6 btn-lg btn-primary"
                          rel="noreferrer">
                          APPLY NOW
                        </a>
                      </div>
                    </Collapse.Content>
                  </div>
                )}
              </Collapse>
            </div>
            <div className="w-full h-[1px] bg-white opacity-20 mt-6" />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Careers;
