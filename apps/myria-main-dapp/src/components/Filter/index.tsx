import React, { useCallback, useRef, useState } from 'react';
import useClickOutside from 'src/hooks/useClickOutside';
import Collapse from '../Collapse';
import ChevronDownIcon from '../icons/ChevronDownIcon';
import MinusIcon from '../icons/MinusIcon';
import PlusIcon from '../icons/PlusIcon';
import Input from '../Input';

type FilterOption = {
  id: string;
  name: string;
};
export type FilterList = {
  id: string;
  title: string;
  options: FilterOption[];
}[];
export type ActiveFilter = { [filterId: string]: FilterOption[] };

interface Props {
  filterList: FilterList;
  setFilter: (activeFilter: ActiveFilter) => void;
  activeFilter: ActiveFilter;
}

const Filter = ({ filterList, activeFilter, setFilter }: Props) => {
  const handleFilter = (filterId: string, option: FilterOption) => {
    const newFilterOption = activeFilter[filterId]?.find((filter) => filter.id === option.id)
      ? activeFilter[filterId]?.filter((v) => v.id !== option.id)
      : [...(activeFilter[filterId] || []), option];

    setFilter({
      ...(activeFilter || {}),
      [filterId]: newFilterOption
    });
  };

  const [open, setOpen] = useState(false);

  const collapseRef = useRef(null);

  const handleCollapse = useCallback(() => {
    setOpen(false);
  }, []);

  useClickOutside(collapseRef, handleCollapse);

  return (
    <>
      <div className="hidden md:block">
        {filterList.map((f, idx) => (
          <Collapse defaultOpen key={idx} asChild>
            {({ open }) => (
              <div className="mt-7">
                <div className="flex justify-between">
                  <p className="text-[16px] font-medium leading-[1.5]">{f.title}</p>
                  <Collapse.Trigger asChild>
                    <button className=" bg-brand-deep-blue box-content w-4 rounded-[4px] p-2 text-white">
                      {open ? <MinusIcon /> : <PlusIcon />}
                    </button>
                  </Collapse.Trigger>
                </div>
                <Collapse.Content>
                  <div className="mt-4 space-y-4">
                    {f.options.map((option, idx) => (
                      <label
                        key={idx}
                        className="text-light flex items-center space-x-2 text-[14px] leading-[17px]">
                        <Input
                          className="h-4 w-4"
                          type="checkbox"
                          checked={
                            activeFilter[f.id]?.findIndex((filter) => filter.id === option.id) >= 0
                          }
                          onChange={() => handleFilter(f.id, option)}
                        />
                        <span>{option.name}</span>
                      </label>
                    ))}
                  </div>
                </Collapse.Content>
              </div>
            )}
          </Collapse>
        ))}
      </div>
      <div ref={collapseRef}>
        <Collapse open={open} onOpenChange={(open) => setOpen(open)} className="relative md:hidden">
          <Collapse.Trigger asChild>
            <div className="bg-brand-dark-blue flex items-center justify-between rounded-lg py-4 px-6">
              <p className="text-[18px] font-bold leading-4">Filter</p>
              <span className="w-6">
                <ChevronDownIcon size={24} />
              </span>
            </div>
          </Collapse.Trigger>
          <Collapse.Content className="bg-brand-dark-blue absolute top-[calc(100%-16px)] left-0 z-[5] w-full rounded-lg">
            <div className="space-y-6 p-6">
              {filterList.map((filter, idx) => (
                <div key={idx}>
                  <p className="text-[18px] font-light leading-4">{filter.title}</p>
                  <div className="mt-6 space-y-6">
                    {filter.options.map((option, idx) => (
                      <label
                        key={idx}
                        className="text-light flex items-center justify-between space-x-2 text-[18px] leading-none">
                        <span>{option.name}</span>
                        <Input
                          className="h-4 w-4"
                          type="checkbox"
                          checked={
                            activeFilter[filter.id]?.findIndex(
                              (filter) => filter.id === option.id
                            ) >= 0
                          }
                          onChange={() => handleFilter(filter.id, option)}
                        />
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Collapse.Content>
        </Collapse>
      </div>
    </>
  );
};

export default Filter;
