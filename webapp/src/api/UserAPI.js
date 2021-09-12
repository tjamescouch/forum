import APIUtils from './APIUtils'

class UserAPI {

  signUp(userData) {
    return APIUtils.postJson('/users/', userData);
  }

  signIn(credentials) {
    return APIUtils.postJson('/users/login', credentials);
  }


  getSelf() {
    return APIUtils.getJson('/users/me');
  }
}


export default new UserAPI();
