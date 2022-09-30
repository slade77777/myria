import { useQuery } from 'react-query';
import { collectionModule } from '../services/myriaCore';

export default function useAttributeCollection(id: number) {
  const queryKey = ['marketplace', 'collection-attributes', id];
  const { data, isLoading, error } = useQuery(
    queryKey,
    () => collectionModule?.getAttributesByCollectionId(id),
    {
      enabled: !!id
    }
  );

  const dataFormat = formatDataAttributes(data?.data?.attribute);

  return {
    data: dataFormat,
    isLoading,
    error
  };
}

const formatDataAttributes = (dataAttr: any) => {
  if (!dataAttr) return [];
  if (Object.keys(dataAttr).length === 0) return [];
  const listAttribute = Object.entries(dataAttr).map((item: any) => {
    return {
      id: item[0],
      options: (item[1]).values.map(
        (item: any) => item.toString().charAt(0).toUpperCase() + item.toString().slice(1)
      ),
      name: item[0].charAt(0).toUpperCase() + item[0].slice(1)
    };
  });
  return listAttribute;
};
