
// MOCK
export const pickAlliance = (allianceId: string) => {
  console.log('Pick alliance', allianceId);
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 2000)
  })
}