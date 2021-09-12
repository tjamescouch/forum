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

  setAvatar(formData) {
    return APIUtils.postFormData('/users/me/avatar', formData);
  }
}


export default new UserAPI();
