import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom';
import { createPost, deletePost, editPost } from '../../store/post'

const PostForm = ({mode}) => {
  let { postId } = useParams();
  postId = parseInt(postId);
  const oldPost = useSelector(state => state.posts.obj[postId]);
  let post = {};
  if (mode === "Edit") {
    post = { ...oldPost };
  }

  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState(post.title || '');
  const [body, setBody] = useState(post.body || '');
  // const [password, setPassword] = useState('');
  // const [repeatPassword, setRepeatPassword] = useState('');
  // const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const submitHandler = async (e) => {
    e.preventDefault();
    setErrors([]);
    const newPost = {
      title, body
    };
    // let thunk = createPost;
    let result;
    if (mode === "Edit") {
      newPost.id = postId;
      // thunk = editPost;
      result = await dispatch(editPost(newPost));
    } else {
      result = await dispatch(createPost(newPost));
    }
    // const result = await dispatch(thunk(newPost));
    if (result && result.errors) {
      setErrors(result.errors);
    }
    // if (!errors) setErrors(["test error"]);
    else history.push(`/posts/${result.id}`)
    // console.log("result:",result)
    // console.log("res.errs:",result.errors)
  };

  const deleteHandler = async (e) => {
    e.preventDefault();
    setErrors([]);
    const result = await dispatch(deletePost(postId));
    if (result && result.errors) setErrors(result.errors);
    else history.push('/posts');
  }

  const cancelHandler = e => {
    e.preventDefault();
    history.goBack();
  }

  useEffect(() => {
    if (mode === "Create") {
      setTitle("");
      setBody("");
    } else {
      setTitle(post.title);
      setBody(post.body);
    }
  }, [mode, post.title, post.body]);

  let bodyRemain = body.toLowerCase().startsWith("long")?body.length:1000-body.length;

  return (
    <form onSubmit={submitHandler}>
      <div className="errorBox">
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className="inputBox">
        <label><span className="red">*</span>Title</label>
        <input
          type='text'
          name='title'
          className='field'
          onChange={ e => setTitle(e.target.value) }
          value={title}
        ></input>
        <span className={`xsmall ${title.length>255?"red":""}`}>
          {255-title.length}
        </span>
      </div>
      <div className="inputBox">
        <label>Body</label>
        <textarea
          name='body'
          className='field'
          onChange={ e => setBody(e.target.value) }
          value={body}
        ></textarea>
        <span className={`xsmall ${bodyRemain<0?"red":""}`}>
          {bodyRemain}
        </span>
      </div>
      <span>*required</span><br />
      <button type='submit'>{mode} Post</button>
      {mode === "Edit" && (
        <button onClick={deleteHandler}>Delete</button>
      )}
      <button onClick={cancelHandler}>Cancel</button>
    </form>
  );
};

export default PostForm;
