import APIUtils from './APIUtils'

class PostAPI {

  getPosts() {
    return APIUtils.getJson('/posts');
  }

  getPost(id) {
    return APIUtils.getJson('/posts/' + id);
  }
}


export default new PostAPI();
