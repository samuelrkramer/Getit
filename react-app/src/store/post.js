import rfdc from "rfdc";
const clone = rfdc()

// constants
const LOAD_POSTS = 'posts/LOAD_POSTS';
const ADD_POST = 'posts/ADD_POST';
// const REMOVE_USER = 'session/REMOVE_USER';

// GET ALL POSTS
export const getAllPosts = () => async (dispatch) => {
  const response = await fetch('/api/posts');
  if (response.ok) {
    const posts = await response.json();
    dispatch(loadAllPosts(posts));
    return posts;
  }
  return response;
}

const loadAllPosts = (posts) => ({
  type: LOAD_POSTS,
  posts,
});

// CREATE POST
const createPost = (post) = async (dispatch) => {
  const response = await fetch('/api/posts', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
}

const addPost = (post) => ({
  type: ADD_POST,
  post,
});

// const removeUser = () => ({
//   type: REMOVE_USER,
// })

const initialState = {
  postsArr: [],
};

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

export default function post_reducer(state = initialState, action) {
  let newState = clone(state)
  switch (action.type) {
    case LOAD_POSTS:
      action.posts.forEach(post => {
        newState.posts[post.id] = post
      });
      newState.postsArr = action.posts
      return newState;
    // case REMOVE_USER:
    //   return { user: null }
    default:
      return state;
  }
}
