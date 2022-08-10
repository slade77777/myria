import { proxy, useSnapshot } from 'valtio';

const state = proxy({ autoPlay: true });

export const useAutoPlayInGameDetail = () => {
  const autoPlay = useSnapshot(state).autoPlay;
  return autoPlay;
};

export const toggleAutoPlayInGameDetail = () => {
  state.autoPlay = !state.autoPlay;
};
