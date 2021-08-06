import APIUtils from './APIUtils'

class PostAPI {

  getPosts() {
    return APIUtils.fetchJson('/posts');
  }
}


export default new PostAPI();
