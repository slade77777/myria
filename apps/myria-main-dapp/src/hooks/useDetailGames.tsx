import axios from 'axios';
import { useQuery } from 'react-query';

export type Asset = {
  type: 'video' | 'image';
  src: string;
  image?: string;
};

interface IGenre {
  data: string[];
}

interface FormatImg {
  url: string;
  ext: string;
}

interface ILargeImg {
  large: FormatImg;
  medium: FormatImg;
  small: FormatImg;
  thumbnail: FormatImg;
}

interface MediaAttributes {
  name: string;
  formats: ILargeImg;
  ext: string;
  url: string;
}
export interface MediaData {
  attributes: MediaAttributes;
}

interface AssetMedia {
  data: MediaData[];
}

export interface LogoImg {
  data: MediaData;
}

export interface IResGameDetail {
  game_id: string;
  game_name: string;
  logo_mobile: LogoImg;
  logo_desktop: LogoImg;
  header_background: LogoImg;
  media_carousel: AssetMedia;
  thumbnail_media_carousel: AssetMedia;
  content_title: string;
  content: string;
  developer: string;
  platform: string | null;
  genre: IGenre;
  twitter_link: string;
  discord_link: string;
  status: string;
  provide_text: string;
  game_url?: string;
}

export const useDetailGames = (id: string) => {
  return useQuery('detail-game', async () => {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_URL_GAME_ADMIN +
        `/api/game-details?filters[game_id][$eq]=${id}&populate=*`
    );
    const dataDetail: IResGameDetail = res.data.data[0].attributes as IResGameDetail;
    return dataDetail;
  });
};
