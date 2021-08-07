const API_BASE_URL = 'http://localhost:5000/api'

class APIUtils {

  getJson(url) {
    return fetch(API_BASE_URL + url).then(res => res.json());
  }

}

export default new APIUtils();
