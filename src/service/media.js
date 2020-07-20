import api from "./index";

const URL = {
  MEDIA: "media",
  GENRES: "genres"
};

export default {
  getAllMedia: async (type = "movie", page = 1) => {
    try {
      const response = await api.get(`${URL.MEDIA}/${type}/search/${page}`);
      return response;
    } catch (error) {
      return error;
    }
  },
  getMedia: async (id, type = "movie") => {
    try {
      const response = await api.get(`${URL.MEDIA}/${type}/${id}`);
      return response;
    } catch (error) {
      return error;
    }
  },
  getAllGenres: async type => {
    try {
      const response = await api.get(`${URL.GENRES}/${type}`);
      return response;
    } catch (error) {
      return error;
    }
  },
  getGenre: async (page, type, genre) => {
    try {
      const response = await api.get(
        `${URL.MEDIA}/${type}/search/${page}?genre=${genre}`
      );
      return response;
    } catch (error) {
      return error;
    }
  }
};
