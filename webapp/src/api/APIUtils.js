const API_BASE_URL = 'http://localhost:5000/api'

class APIUtils {

  fetchJson(url, method, data) {
    let headers = method === "GET" ? undefined : {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    return fetch(API_BASE_URL + url, {
      method: method,
      headers: headers,
      body: JSON.stringify(data)
    })
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

}

export default new APIUtils();
