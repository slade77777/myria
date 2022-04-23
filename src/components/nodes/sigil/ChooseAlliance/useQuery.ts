import { useMutation } from "react-query";
import { pickAlliance } from "src/services/api/alliance";

export const useQuery = () => {
  const pickAllianceMutation = useMutation(pickAlliance);

  return {
    pickAllianceMutation
  }
}
