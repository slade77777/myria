import { RarityType } from 'src/types/sigil';
import { getRarityColor } from 'src/utils';

interface Props {
  rarity: RarityType;
}

const getRarityName = (rarity: RarityType) => {
  switch (rarity) {
    case 'common':
      return 'Common';
    case 'celestial':
      return 'Celestial';
    case 'epic':
      return 'Epic';
    case 'rare':
      return 'Rare';
    case 'ultra_rare':
      return 'Ultra Rare';
  }
};

const RarityBadge = ({ rarity }: Props) => {
  const color = getRarityColor(rarity);
  return (
    <div className="relative rounded-lg px-[10px] py-[6px] flex justify-center items-center overflow-hidden">
      <div className="absolute w-full h-full" style={{ backgroundColor: color, opacity: 0.3 }} />
      <span className={`font-medium leading-[1.3] uppercase text-[10px] text-[${color}]`}>
        {getRarityName(rarity)}
      </span>
    </div>
  );
};

export default RarityBadge;
