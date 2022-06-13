import rfdc from "rfdc";
const clone = rfdc()

// constants
const LOAD_POST_COMMENTS = 'comments/LOAD_POST_COMMENTS';
const ADD_COMMENT = 'comments/ADD_COMMENT';
const EDIT_COMMENT = 'comments/EDIT_COMMENT';
const DELETE_COMMENT = 'comments/DELETE_COMMENT';

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
  return response; // idk how this will work out so try and see for error handling
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
  return response; // idk how this will work out so try and see for error handling
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
  return response; // idk how this will work out so try and see for error handling
}

const removeComment = (commentId) => ({
  type: DELETE_COMMENT,
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
        delete newState.onPost[i][commentId];
      }
      return newState;
    // case REMOVE_USER:
    //   return { user: null }
    default:
      return state;
  }
}

        // const removeUser = () => ({
        //   type: REMOVE_USER,
        // })
        
        
        // export const authenticate = () => async (dispatch) => {
        //   const response = await fetch('/api/auth/', {
        //     headers: {
        //       'Content-Type': 'application/json'
        //     }
        //   });
        //   if (response.ok) {
        //     const data = await response.json();
        //     if (data.errors) {
        //       return;
        //     }
          
        //     dispatch(setUser(data));
        //   }
        // }
        
        // export const login = (email, password) => async (dispatch) => {
        //   const response = await fetch('/api/auth/login', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //       email,
        //       password
        //     })
        //   });
          
          
        //   if (response.ok) {
        //     const data = await response.json();
        //     dispatch(setUser(data))
        //     return null;
        //   } else if (response.status < 500) {
        //     const data = await response.json();
        //     if (data.errors) {
        //       return data.errors;
        //     }
        //   } else {
        //     return ['An error occurred. Please try again.']
        //   }
        
        // }
        
        // export const logout = () => async (dispatch) => {
        //   const response = await fetch('/api/auth/logout', {
        //     headers: {
        //       'Content-Type': 'application/json',
        //     }
        //   });
        
        //   if (response.ok) {
        //     dispatch(removeUser());
        //   }
        // };
        
        
        // export const signUp = (username, email, password) => async (dispatch) => {
        //   const response = await fetch('/api/auth/signup', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //       username,
        //       email,
        //       password,
        //     }),
        //   });
          
        //   if (response.ok) {
        //     const data = await response.json();
        //     dispatch(setUser(data))
        //     return null;
        //   } else if (response.status < 500) {
        //     const data = await response.json();
        //     if (data.errors) {
        //       return data.errors;
        //     }
        //   } else {
        //     return ['An error occurred. Please try again.']
        //   }
        // }