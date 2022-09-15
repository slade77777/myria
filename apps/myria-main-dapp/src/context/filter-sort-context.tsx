import React, { useContext, useState } from 'react';

interface valueSort {
  sortingField: string;
  orderBy: undefined;
  name: string;
}

interface FilterSort {
  sorting: valueSort;
  handleUpdateSort: (value: valueSort) => void;
}

const FilterSortContext = React.createContext<FilterSort>({} as FilterSort);

export const FilterSortProvider: React.FC = ({ children }) => {
  const [sorting, setSorting] = useState<valueSort>({
    sortingField: 'createdAt',
    orderBy: undefined,
    name: 'Recently listed'
  });

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
