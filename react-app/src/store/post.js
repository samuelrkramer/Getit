import rfdc from "rfdc";
const clone = rfdc()

// constants
const LOAD_POSTS = 'posts/LOAD_POSTS';
const LOAD_ONE_POST = 'posts/LOAD_ONE_POST';
const ADD_POST = 'posts/ADD_POST';
const EDIT_POST = 'posts/EDIT_POST';
const DELETE_POST = 'posts/DELETE_POST';
// const REMOVE_USER = 'session/REMOVE_USER';

// GET ALL POSTS
export const getAllPosts = () => async (dispatch) => {
  // console.log("## getAllPosts thunk fired")
  const response = await fetch('/api/posts');
  if (response.ok) {
    const posts = await response.json();
    dispatch(loadAllPosts(posts));
    return posts;
  }
  return response; // idk how this will work out so try and see for error handling
}

// SEARCH POSTS
export const searchPosts = (query) => async (dispatch) => {
  console.log("## searchPosts thunk fired")
  const response = await fetch(`/api/search?query=${query}`);
  if (response.ok) {
    const results = await response.json();
    dispatch(loadAllPosts(results));
    // const out = results.posts.map(el => el.id)
    const out = results.posts;
    console.log("thunk boutta return:", out)
    return out
  }
  return response; // idk how this will work out so try and see for error handling
}

const loadAllPosts = (payload) => ({
  type: LOAD_POSTS,
  posts: payload.posts,
});

// GET ONE POSTS
export const getOnePost = (postId) => async (dispatch) => {
  console.log("## getOnePost thunk fired, postId:", postId)
  const response = await fetch(`/api/posts/${postId}`);
  if (response.ok) {
    const post = await response.json();
    console.log("thunk got back post:", post)
    dispatch(loadOnePost(post));
    return post;
  }
  return response; // idk how this will work out so try and see for error handling
}

const loadOnePost = (payload) => ({
  type: LOAD_ONE_POST,
  post: payload,
});

// CREATE POST
export const createPost = (post) => async (dispatch) => {
  const response = await fetch('/api/posts', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  if (response.ok) {
    const newPost = await response.json();
    dispatch(addPost(newPost));
    return newPost;
  }
  const data = await response.json();
  if (data.errors) {
    return data;
  } else {
    return {errors: ['An error occurred. Please try again.']}
  }
  // return await response.body.json(); // idk how this will work out so try and see for error handling
}

const addPost = (post) => ({
  type: ADD_POST,
  post,
});

// EDIT POST
export const editPost = (post) => async (dispatch) => {
  const response = await fetch(`/api/posts/${post.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  if (response.ok) {
    const newPost = await response.json();
    dispatch(modifyPost(newPost));
    return newPost;
  }
  const data = await response.json();
  if (data.errors) {
    return data;
  } else {
    return {errors: ['An error occurred. Please try again.']}
  }
  // return response; // idk how this will work out so try and see for error handling
}

const modifyPost = (post) => ({
  type: EDIT_POST,
  post,
});

// DELETE POST
export const deletePost = (postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "DELETE"
  });
  if (response.ok) {
    // const newPost = await response.json();
    dispatch(removePost(postId));
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

const removePost = (postId) => ({
  type: DELETE_POST,
  postId,
});

const initialState = {
  // postsArr: [],
  obj: {},
};

export default function post_reducer(state = initialState, action) {
  let newState = clone(state)
  switch (action.type) {
    case LOAD_POSTS:
      // console.log(" %% LOAD_POSTS in reducer", action.posts)
      // newState.marker = "hey here's a marker";
      action.posts.forEach(post => {
        newState.obj[post.id] = post;
      });
      return newState;
    case LOAD_ONE_POST:
      // console.log(" %% LOAD_POSTS in reducer", action.posts)
      // newState.marker = "hey here's a marker";
      // action.posts.forEach(post => {
      const post = {...action.post}
      newState.obj[post.id] = post;
      // });
      return newState;
    case ADD_POST:
      newState.obj[action.post.id] = action.post;
      // newState.postsArr.push(action.post);
      return newState;
    case EDIT_POST:
      newState.obj[action.post.id] = action.post;
      // newState.postsArr.push(action.post); // THIS DEFINITELY DOESN'T WORK if I decide to use it, it's just a relic from the ADD_POST case
      return newState;
    case DELETE_POST:
      // console.log(action.postId);
      delete newState.obj[action.postId];
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