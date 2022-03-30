import React from 'react';
import MuteIcon from 'src/components/icons/MuteIcon';

interface Props {
  soundUrl?: string;
}

function Sound({ soundUrl }: Props) {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [mute, setMute] = React.useState(false);

  React.useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement && soundUrl) {
      audioElement.src = soundUrl;
      audioElement.play();
    }
  }, [soundUrl]);

  const handleToggleSound = () => {
    setMute((currentState) => !currentState);
  };

  return (
    <footer className="fixed bottom-0 z-10 flex h-[80px] w-full items-center justify-end p-4 px-6">
      <div className="flex cursor-pointer items-center justify-between">
        {mute && (
          <div className="mr-3">
            <MuteIcon />
          </div>
        )}

        <p className="body-sm font-medium	" onClick={handleToggleSound}>
          Mute sound
        </p>
      </div>
      <audio ref={audioRef} muted={mute} />
    </footer>
  );
}

export default Sound;
