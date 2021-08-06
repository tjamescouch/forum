const API_BASE_URL = 'http://localhost:5000'

class APIUtils {

  fetchJson(url) {
    return fetch(API_BASE_URL + url).then(res => res.json());
  }

}

export default new APIUtils();
