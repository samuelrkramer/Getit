import rfdc from "rfdc";
const clone = rfdc()

// constants
const LOAD_POSTS = 'posts/LOAD_POSTS';
const ADD_POST = 'posts/ADD_POST';
const EDIT_POST = 'posts/EDIT_POST';
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

const loadAllPosts = (payload) => ({
  type: LOAD_POSTS,
  posts: payload.posts,
});

// CREATE POST
const createPost = (post) => async (dispatch) => {
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
  return response; // idk how this will work out so try and see for error handling
}

const addPost = (post) => ({
  type: ADD_POST,
  post,
});

// EDIT POST
const editPost = (post) => async (dispatch) => {
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
  return response; // idk how this will work out so try and see for error handling
}

const modifyPost = (post) => ({
  type: EDIT_POST,
  post,
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
        newState.obj[post.id] = post
      });
      return newState;
    case ADD_POST:
      newState.posts[action.post.id] = action.post;
      // newState.postsArr.push(action.post);
      return newState;
    case EDIT_POST:
      newState.posts[action.post.id] = action.post;
      // newState.postsArr.push(action.post); // THIS DEFINITELY DOESN'T WORK if I decide to use it, it's just a relic from the ADD_POST case
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