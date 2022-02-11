import clsx from 'clsx';
import React, { useState } from 'react';
import useCareerCategories from 'src/hooks/useCareerCategories';
import Collapse from '../Collapse';
import ChevronDownIcon from '../icons/ChevronDownIcon';
import ReactMarkdown from 'react-markdown';
import styles from './styles.module.css';
import { Trans } from '@lingui/macro';

const Careers: React.FC = () => {
  const categories = useCareerCategories();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const positions = categories
    .filter((item) => !selectedCategory || selectedCategory == item.id)
    .flatMap((item) => item.jobs);

  return (
    <div>
      <div className="flex -mx-3 -mt-3 overflow-auto">
        <button
          onClick={() => {
            setSelectedCategory(null);
          }}
          className={clsx('mx-2 my-2 btn-lg btn-dark-blue flex-shrink-0 whitespace-nowrap', {
            active: selectedCategory === null
          })}>
          <Trans>All positions</Trans>
        </button>
        {categories.map((item) => (
          <button
            onClick={() => {
              setSelectedCategory(item.id);
            }}
            key={item.id}
            className={clsx('mx-2 my-2 btn-lg btn-dark-blue flex-shrink-0 whitespace-nowrap', {
              active: selectedCategory === item.id
            })}>
            {item.label}
          </button>
        ))}
      </div>
      <div className="mt-[56px]">
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
                        <div
                          className={clsx(
                            'mt-6 body text-[16px] text-light',
                            styles.markdownContainer
                          )}>
                          <ReactMarkdown>{pos.description}</ReactMarkdown>
                        </div>
                        <a
                          target="_blank"
                          href={pos.link}
                          className="mt-6 btn-lg btn-primary"
                          rel="noreferrer">
                          <Trans>APPLY NOW</Trans>
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
