import { AssetOrderBy } from 'myria-core-sdk';
import React, { useContext, useState } from 'react';
import { dataSorting } from 'src/components/marketplace/Collection';

interface valueSort {
  id: number;
  sortingField: string;
  orderBy: AssetOrderBy;
  name: string;
}

interface FilterSort {
  sorting: valueSort;
  handleUpdateSort: (value: valueSort) => void;
}

const FilterSortContext = React.createContext<FilterSort>({} as FilterSort);

export const FilterSortProvider: React.FC = ({ children }) => {
  const [sorting, setSorting] = useState<valueSort>(dataSorting[0]);

  const handleUpdateSort = (value: valueSort) => {
    setSorting(value);
  };

  return (
    <FilterSortContext.Provider value={{ handleUpdateSort, sorting }}>
      {children}
    </FilterSortContext.Provider>
  );
};

export const useFilterSortContext = () => useContext(FilterSortContext);
