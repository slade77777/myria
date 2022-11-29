import { accountApiClient } from 'src/client';
import { useMutation, useQuery } from 'react-query';

type Node = {
  id: string;
  current_cycle_operation: {
    uptime: number;
    countdown: number;
    status: string;
  };
};

export type NodeLicenseOperation = {
  all_nodes_running: boolean;
  nodes: Node[];
  cycle: {
    start: string;
    end: string;
    current_distribution: number;
    progress_towards_goal: number;
    time_active: number;
  };
};

const toggleLicense = async (enable: boolean) => {
  return accountApiClient.post('/nodes/license/operations/toggle', { enable });
};

export default function useNodeLicenseOperation() {
  const { data, isLoading, error, refetch } = useQuery(
    'nodeLicenseOperation',
    () => accountApiClient.get('/nodes/license/operations'),
    {
      refetchOnWindowFocus: true
    }
  );

  const mutate = useMutation(toggleLicense, {
    onSuccess: () => refetch()
  });

  return {
    data: (data?.data?.data as NodeLicenseOperation) || {},
    isLoading,
    // @ts-ignore
    error: error?.response as any,
    refetch,
    toggleMutation: mutate
  };
}
