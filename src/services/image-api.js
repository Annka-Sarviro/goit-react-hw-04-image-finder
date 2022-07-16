import axios from 'axios';

// axios.defaults.baseURL =
//   'https://pixabay.com/api/';

const fetchImage = async value => {
  const response = await axios.get(
    `https://pixabay.com/api/?q=${value}&page=1&key=27678833-7153b16b322f2af48ae42bf6d&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data;
};

const api = { fetchImage };

export default api;
