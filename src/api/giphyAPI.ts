import axios from 'axios';
import qs from 'qs';

export interface Images {
  fixed_height: {
    url: string;
    width: number;
    height: number;
  };
}

export interface Gif {
  id: string;
  title: string;
  images: Images;
}

export interface GifsResponse {
  data: Gif[];
}

const API_BASE_URL: string = 'https://api.giphy.com';

export async function getTrendingGifs(limit: number, offset: number) {
  const params = {
    api_key: process.env.REACT_APP_GIPHY_API_KEY,
    limit,
    offset,
    rating: 'g',
  };
  const url = `${API_BASE_URL}/v1/gifs/trending?${qs.stringify(params)}`;

  const { data } = await axios.get<GifsResponse>(url);
  return data;
}
