import api from "./index";

const URL = {
  MEDIA: "MEDIA"
};

export default {
  getAllMedia: async (type = "movie", page = 1) => {
    try {
      const response = await api.get(`${URL.MEDIA}/${type}/search/${page}`);
      return response;
    } catch (error) {
      return error;
    }
  }
};
