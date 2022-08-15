import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const API_KEY = '25683514-2bb572422bae18aceebfa826b';

export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  getImages = async () => {
    const searchParams = new URLSearchParams({
      key: API_KEY,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      page: this.page,
      per_page: 12,
    });

    const response = await axios.get(`/?${searchParams}`);
    this.page += 1;
    return response.data.hits;
  };

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  resetPage = () => {
    this.page = 1;
  };
}
