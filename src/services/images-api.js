import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const API_KEY = '25683514-2bb572422bae18aceebfa826b';

function getImages(query, page) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    page,
    per_page: 12,
  });

  return axios.get(`/?${searchParams}`);
}

const api = {
  getImages,
};

export default api;
