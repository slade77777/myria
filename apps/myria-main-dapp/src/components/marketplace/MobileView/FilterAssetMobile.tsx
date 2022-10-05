import React, { useEffect, useState } from 'react';
import Collapse from 'src/components/Collapse';
import CloseIcon from 'src/components/icons/CloseIcon';
import MinusIcon from 'src/components/icons/MinusIcon';
import PlusIcon from 'src/components/icons/PlusIcon';
import Input from 'src/components/Input';

export type FilterItem = {
  id: string;
  name: string;
  options: string[];
};
export type ActiveFilter = { [filterId: string]: string[] };
interface Props {
  filterList: FilterItem[] | null;
  activeFilter: ActiveFilter;
  applyFilter: (filter: ActiveFilter) => void;
  initialFilter: () => void;
  onCloseModal: any;
}
export default function FilterAssetMobile({
  filterList,
  activeFilter,
  applyFilter,
  initialFilter,
  onCloseModal
}: Props) {
  const [filter, setFilter] = useState<ActiveFilter>(activeFilter);

  useEffect(() => {
    setFilter(activeFilter);
  }, [activeFilter]);

  const handleFilter = (filterId: string, option: string) => {
    const checkFilterOption = filter[filterId]?.find((filter) => filter === option);
    let newFilterOption: string[] = [];
    if (checkFilterOption) {
      newFilterOption = filter[filterId]?.filter((v) => v !== option);
    } else {
      newFilterOption = [...filter[filterId], option];
    }
    setFilter({ ...(filter || {}), [filterId]: newFilterOption });
  };

  if (filterList?.length === 0) {
    return (
      <>
        <div className="text-base/9 text-2xl">
          <p>No Attribute</p>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="h-20 flex justify-between bg-base/3 items-center border-b border-blue/3">
        <span className="text-2xl font-bold text-white">Filter</span>
        <button
          className="h-[24px] w-[24px] text-base/9 hover:cursor-pointer focus:outline-none"
          onClick={() => onCloseModal()}>
          <CloseIcon />
        </button>
      </div>
      <div className="h-[calc(100%-80px)] overflow-auto text-white content-attributes">
        {filterList &&
          filterList.map((item: FilterItem, index: number) => {
            return (
              <Collapse defaultOpen key={index} asChild>
                {({ open }) => (
                  <>
                    <div className="flex justify-between items-center mt-5">
                      <span>{item.name}</span>
                      <Collapse.Trigger asChild>
                        <button className="w-8 h-8 flex justify-center items-center cursor-pointer font-medium bg-base/4 rounded text-white p-2">
                          {open ? '-' : '+'}
                        </button>
                      </Collapse.Trigger>
                    </div>
                    <Collapse.Content>
                      <div className="mt-4 space-y-4 pl-6 border-blue/3 border-b py-4 pt-2">
                        {item.options.map((option, idx) => (
                          <>
                            <label
                              key={idx}
                              className="flex items-center justify-between space-x-2 text-sm text-light py-2 pr-2">
                              <span>{option}</span>
                              <Input
                                className="h-4 w-4"
                                type="checkbox"
                                checked={
                                  filter[item.id]?.findIndex((filter) => filter === option) >= 0
                                }
                                onChange={() => handleFilter(item.id, option)}
                              />
                            </label>
                          </>
                        ))}
                      </div>
                    </Collapse.Content>
                  </>
                )}
              </Collapse>
            );
          })}
      </div>

      <div className="flex items-center justify-between  bottom-0 w-full bg-base/3 pb-6 h-20">
        <button
          className="w-2/5 h-12 border border-base/9 uppercase rounded-lg text-white text-base font-bold"
          onClick={() => {
            initialFilter();
            onCloseModal();
          }}>
          Clear Filter
        </button>
        <button
          className="w-2/5 h-12 bg-primary/6 uppercase rounded-lg text-base/1 text-base font-bold"
          onClick={() => {
            applyFilter(filter);
            onCloseModal();
          }}>
          Apply
        </button>
      </div>
    </>
  );
}
