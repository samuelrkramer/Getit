// import bgImg from '../static/images/emoji_banner_getit_short.png'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Banner.css';

const Banner = () => {
  const history = useHistory();
  const user = useSelector(state => state.session.user) || {};

  const clickHandle = e => {
    e.preventDefault();
    if (user.username) history.push("/posts/new");
    else history.push("/sign-up");
  }

  return (
    <div className="bannerBox bigLeftMargin">
      <h2>Welcome to GETit</h2>
      <p>Where a whole community comes to share their favorite jokes, and we're waiting to hear yours. Come laugh with us!</p>
      {/* <img src={bgImg} /> */}
      <button onClick={clickHandle} className="blueButton">
        {!!user.username?"Post something":"Create an account"} and get started!
      </button>
    </div>
  )
};

export default Banner;