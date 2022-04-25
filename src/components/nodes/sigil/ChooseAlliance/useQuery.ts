import { useMutation } from "react-query";

// MOCK
const pickAlliance = (allianceId: string) => {
  console.log('Pick alliance', allianceId);
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 2000)
  })
}

export const useQuery = () => {
  const pickAllianceMutation = useMutation(pickAlliance);

  return {
    pickAllianceMutation
  }
}
