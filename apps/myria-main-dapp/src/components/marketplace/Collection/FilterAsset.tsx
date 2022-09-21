import React from 'react';
import Collapse from 'src/components/Collapse';
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
  handleFilter: (filterId: string, option: string) => void;
  activeFilter: ActiveFilter;
  initialFilter: () => void;
}
export default function FilterAsset({ filterList, handleFilter, activeFilter, initialFilter }: Props) {
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
      <div className="flex justify-between pb-4 border-blue/3 border-b">
        <span className="font-bold text-lg">Filter</span>
        <span onClick={initialFilter} className="cursor-pointer text-base text-blue/4">Clear Filter</span>
      </div>
      {filterList &&
        filterList.map((item: FilterItem, index: number) => {
          return (
            <Collapse defaultOpen key={index} asChild>
              {({ open }) => (
                <>
                  <div className="flex justify-between items-center mt-5">
                    <span>{item.name}</span>
                    <Collapse.Trigger asChild>
                      <button className="w-8 flex justify-center items-center cursor-pointer font-medium bg-base/3 rounded text-white p-2">
                        {open ? <MinusIcon /> : <PlusIcon />}
                      </button>
                    </Collapse.Trigger>
                  </div>
                  <Collapse.Content>
                    <div className="mt-4 space-y-4 pl-6 border-blue/3 border-b py-4 pt-2">
                      {item.options.map((option, idx) => (
                        <label
                          key={idx}
                          className="flex items-center space-x-2 text-sm text-light py-2">
                          <Input
                            className="h-4 w-4"
                            type="checkbox"
                            checked={
                              activeFilter[item.id]?.findIndex((filter) => filter === option) >= 0
                            }
                            onChange={() => handleFilter(item.id, option)}
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </Collapse.Content>
                </>
              )}
            </Collapse>
          );
        })}
    </>
  );
}
