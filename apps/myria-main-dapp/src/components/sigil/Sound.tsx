import { t } from '@lingui/macro';
import React, { useEffect } from 'react';
import MuteIcon from 'src/components/icons/MuteIcon';
import SpeakerIcon from 'src/components/icons/SpeakerIcon';
import { useGA4 } from 'src/lib/ga';
import { soundService, SUPPORT_SOUND } from 'src/sound';

function Sound() {
  const [mute, setMute] = React.useState(false);
  const { event } = useGA4();


  useEffect(() => {
    const loadPlay = soundService.playSound(SUPPORT_SOUND.SIGIL_DASHBOARD_BG, {loop: true});
      const handleAudio = () => {
        if (loadPlay.paused) {
          loadPlay.play();
          document.body.removeEventListener('mousedown', handleAudio)
        }
      }
      document.body.addEventListener('mousedown', handleAudio);
      return ()=> {
        document.body.removeEventListener('mousedown', handleAudio);
        loadPlay.pause();
      }
  }, [])

  const handleToggleSound = () => {
    setMute((currentState) => {
      const isMute = !currentState;
      soundService.setMuted(isMute);
      return isMute;
    });
  };

  return (
    <footer className="fixed bottom-0 z-10 flex h-[80px] w-full items-center justify-end p-4 px-6">
      <div
        className="flex cursor-pointer items-center justify-between"
        onClick={() => {
          handleToggleSound();
          event('Sound Toggled', { campaign: 'Sigil', sound_on: mute });
        }}>
        {<div className="mr-3">{mute ? <MuteIcon /> : <SpeakerIcon />}</div>}
        <p className="body-sm font-medium">{mute ? t`Unmute sound` : t`Mute sound`}</p>
      </div>
    </footer>
  );
}

export default Sound;
