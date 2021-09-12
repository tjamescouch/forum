export const BASE_URL = 'http://localhost:5000/';
export const API_BASE_URL = BASE_URL + 'api';

export function getUploadUrl(path) {
  return BASE_URL + 'uploads/' + path;
}

class APIUtils {

  fetchJson(url, method, data) {
    let init = {
      method: method,
      body: JSON.stringify(data)
    };
    let headers = {};
    if(method!=="GET") {
      headers = {
        ...headers,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
    }
    if(localStorage.jwtToken) {
      headers = {
        ...headers,
        'Authorization': localStorage.jwtToken
      };
    }
    if(Object.keys(headers).length > 0) {
      init.headers = headers;
    }
    return fetch(API_BASE_URL + url, init)
      .then(res => {
        if(!res.ok) {
          throw new Error(res.status);
        }
        return res.json()});
  }

  fetchFormData(url, method, data) {
    let init = {
      method: method,
      body: data
    };
    let headers = {};
    if(method!=="GET") {
      headers = {
        ...headers,
        'Accept': 'application/json',
        //'Content-Type': 'multipart/form-data'
      };
    }
    if(localStorage.jwtToken) {
      headers = {
        ...headers,
        'Authorization': localStorage.jwtToken
      };
    }
    if(Object.keys(headers).length > 0) {
      init.headers = headers;
    }
    return fetch(API_BASE_URL + url, init)
      .then(res => {
        if(!res.ok) {
          throw new Error(res.status);
        }
        return res.json()});
  }

  getJson(url) {
    return this.fetchJson(url, "GET");
  }

  postJson(url, data) {
    return this.fetchJson(url, "POST", data);
  }

  putJson(url, data) {
    return this.fetchJson(url, "PUT", data);
  }

  postFormData(url, data) {
    return this.fetchFormData(url, "POST", data);
  }



}

export default new APIUtils();
