import rfdc from "rfdc";
const clone = rfdc()

// constants
const LOAD_POST_COMMENTS = 'comments/LOAD_POST_COMMENTS';
const ADD_COMMENT = 'comments/ADD_COMMENT';
const EDIT_COMMENT = 'comments/EDIT_COMMENT';
const DELETE_COMMENT = 'comments/DELETE_COMMENT';
const ADD_COMMENT_VOTE = 'posts/ADD_COMMENT_VOTE';
const EDIT_COMMENT_VOTE = 'posts/EDIT_COMMENT_VOTE';
const DELETE_COMMENT_VOTE = 'posts/DELETE_COMMENT_VOTE';

// GET ALL COMMENTTS
export const getPostsComments = (postId) => async (dispatch) => {
  // console.log("## getAllPosts thunk fired")
  const response = await fetch(`/api/posts/${postId}/comments`);
  if (response.ok) {
    const data = await response.json();
    dispatch(loadPostsComments({postId, data}));
    return data;
  }
  return response; // idk how this will work out so try and see for error handling
}

const loadPostsComments = (payload) => ({
  type: LOAD_POST_COMMENTS,
  postId: payload.postId,
  comments: payload.data.comments,
});

// CREATE COMMENT
export const createComment = (comment) => async (dispatch) => {
  const response = await fetch('/api/comments', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  });
  if (response.ok) {
    const newComment = await response.json();
    dispatch(addComment(newComment));
    return newComment;
  }
  const data = await response.json();
  if (data.errors) {
    return data;
  } else {
    return {errors: ['An error occurred. Please try again.']}
  }
  // return response; // idk how this will work out so try and see for error handling
}

const addComment = (comment) => ({
  type: ADD_COMMENT,
  comment,
});

// EDIT COMMENT
export const editComment = (comment) => async (dispatch) => {
  const response = await fetch(`/api/comments/${comment.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  });
  if (response.ok) {
    const newComment = await response.json();
    dispatch(modifyComment(newComment));
    return newComment;
  }
  const data = await response.json();
  if (data.errors) {
    return data;
  } else {
    return {errors: ['An error occurred. Please try again.']}
  }
  // return response; // idk how this will work out so try and see for error handling
}

const modifyComment = (comment) => ({
  type: EDIT_COMMENT,
  comment,
});

// DELETE COMMENT
export const deleteComment = (commentId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE"
  });
  if (response.ok) {
    // const newPost = await response.json();
    dispatch(removeComment(commentId));
    return true;
  }
  const data = await response.json();
  if (data.errors) {
    return data;
  } else {
    return {errors: ['An error occurred. Please try again.']}
  }
  // return response; // idk how this will work out so try and see for error handling
}

const removeComment = (commentId) => ({
  type: DELETE_COMMENT,
  commentId,
});

export const commentVote = (commentId, value, myVote) => async (dispatch) => {
  let response;
  if (value === 0) {
    response = await fetch(`/api/comments/${commentId}/vote/${myVote.id}`, {
      method: "DELETE"
    });
    if (response.ok) {
      dispatch(removeCommentVote(commentId));
      return true;
    }
  } else if (!myVote) {
    response = await fetch(`/api/comments/${commentId}/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({value}),
    });
    if (response.ok) {
      const newVote = await response.json();
      dispatch(addCommentVote(commentId, newVote));
      return newVote;
    }
  } else {
    response = await fetch(`/api/comments/${commentId}/vote/${myVote.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({value}),
    });
    if (response.ok) {
      const newVote = await response.json();
      dispatch(modifyCommentVote(commentId, newVote));
      return newVote;
    }
  }

  const data = await response.json();
  if (data.errors) {
    return data;
  } else {
    return {errors: ['An error occurred. Please try again.']}
  }
}

const addCommentVote = (commentId, vote) => ({
  type: ADD_COMMENT_VOTE,
  commentId,
  vote,
});

const modifyCommentVote = (commentId, vote) => ({
  type: EDIT_COMMENT_VOTE,
  commentId,
  vote,
});

const removeCommentVote = (commentId) => ({
  type: DELETE_COMMENT_VOTE,
  commentId,
});

const initialState = {
  // postsArr: [],
  obj: {},
  onPost: {},
};

export default function comment_reducer(state = initialState, action) {
  let newState = clone(state)
  switch (action.type) {
    case LOAD_POST_COMMENTS:
      // console.log(" %% LOAD_POSTS in reducer", action.posts)
      // newState.marker = "hey here's a marker";
      if (!newState.onPost[action.postId]) newState.onPost[action.postId] = {};
      action.comments.forEach(c => {
        newState.obj[c.id] = c;
        newState.onPost[action.postId][c.id] = c;
      });
      return newState;
    case ADD_COMMENT:
      newState.obj[action.comment.id] = action.comment;
      newState.onPost[action.comment.postId][action.comment.id] = action.comment;
      // newState.postsArr.push(action.post);
      return newState;
    case EDIT_COMMENT:
      newState.obj[action.comment.id] = action.comment;
      newState.onPost[action.comment.postId][action.comment.id] = action.comment;
      // newState.postsArr.push(action.post); // THIS DEFINITELY DOESN'T WORK if I decide to use it, it's just a relic from the ADD_POST case
      return newState;
    case DELETE_COMMENT:
      // console.log(action.postId);
      delete newState.obj[action.commentId];
      for (let i in newState.onPost) {
        delete newState.onPost[i][action.commentId];
      }
      return newState;
    case ADD_COMMENT_VOTE:
      newState.obj[action.commentId].myVote = action.vote;
      newState.obj[action.commentId].score += action.vote.value;
      return newState;
    case EDIT_COMMENT_VOTE:
      newState.obj[action.commentId].myVote = action.vote;
      newState.obj[action.commentId].score += 2*action.vote.value;
      return newState;
    case DELETE_COMMENT_VOTE:
      newState.obj[action.commentId].score -= newState.obj[action.commentId].myVote.value;
      delete newState.obj[action.commentId].myVote;
      return newState;
    default:
      return state;
  }
}
