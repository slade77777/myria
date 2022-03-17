import { TAB } from 'src/components/NotiBanner';
import useLocalStorage from 'src/hooks/useLocalStorage';
import Ecosystem from './ecosystem';

const OurVision = () => {
  const [activatingTab] = useLocalStorage<TAB>('active-tab', 'for-gamer');
  return <Ecosystem action={activatingTab === 'for-dev' ? 'start-building' : 'join-discord'} />;
};

export default OurVision;
