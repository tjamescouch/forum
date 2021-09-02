import APIUtils from './APIUtils'

class UserAPI {

  signUp(userData) {
    return APIUtils.postJson('/users/', userData);
  }

  signIn(credentials) {
    return APIUtils.postJson('/users/login', credentials);
  }
}


export default new UserAPI();
