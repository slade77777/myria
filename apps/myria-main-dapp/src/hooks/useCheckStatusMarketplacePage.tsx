import { useQuery } from 'react-query';
import { commonModule } from '../services/myriaCore';

export default function useCheckStatusMarketplacePage() {
  const queryKey = ['marketplace', 'status-page'];
  const { data, isLoading, error } = useQuery(queryKey, () =>
    commonModule?.checkStatusMarketService()
  );
  return { data, isLoading, error };
}
