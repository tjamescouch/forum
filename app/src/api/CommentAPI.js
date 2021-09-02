import APIUtils from './APIUtils'

class PostAPI {

  getComments(postId) {
    return APIUtils.getJson('/posts/' + postId + '/comments');
  }

  createComment(postId, comment) {
    return APIUtils.postJson('/posts/' + postId + '/comments/', comment);
  }
}


export default new PostAPI();
