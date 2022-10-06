import { useQuery } from 'react-query';
import { collectionModule } from '../services/myriaCore';

const skipAttributes = ['description', 'imageUrl', 'image'];

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
    if (skipAttributes.includes(item[0])) {
      return {
        id: '',
        options: [],
        name: ''
      };
    }
    return {
      id: item[0],
      options: item[1].values.map((item: any) => upperCaseFirstText(item.toString())),
      name: item[1].title ? upperCaseFirstText(item[1].title) : upperCaseFirstText(item[0])
    };
  });

  return listAttribute.filter((item) => item.id);
};

const upperCaseFirstText = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
