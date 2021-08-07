import APIUtils from './APIUtils'

class PostAPI {

  getPosts() {
    return APIUtils.getJson('/posts');
  }

  getPost(id) {
    return APIUtils.getJson('/posts/' + id);
  }

  createPost(post) {
    return APIUtils.postJson('/posts/', post);
  }
}


export default new PostAPI();
