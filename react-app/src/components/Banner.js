// import bgImg from '../static/images/emoji_banner_getit_short.png'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import ghIcon from '../static/images/githubIcon.svg';
// import liIcon from '../static/images/linkedInIcon.png';
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
    <>
      {/* <div className="bannerBox"> */}
      <div className="bannerBox">
        <div className="bannerInside">
          <h2>Welcome to GETit</h2>
          <p>Where a whole community comes to share their favorite jokes, and we're waiting to hear yours. Come laugh with us!</p>
          {/* <img src={bgImg} /> */}
          <button onClick={clickHandle} className="blueButton">
            {!!user.username?"Post something":"Create an account"} and get started!
          </button>
        </div>
        {/* <div className="bannerInside">
          <h3>Check out the developer!</h3>
          <div className='devLinkBox'>
            <a href="https://github.com/samuelrkramer" target="_blank" rel="noreferrer">
              <img src={ghIcon} height="72px" alt="GitHub"></img>
            </a>
            <a href="https://www.linkedin.com/in/sam-kramer-3b20b1235/" target="_blank" rel="noreferrer">
              <img src={liIcon} height="72px" alt="LinkedIn"></img>
            </a>
          </div>
          <h3>
            <a href="https://github.com/samuelrkramer/Getit">Project Repo</a>
          </h3>
        </div> */}
      </div>
    </>
  )
};

export default Banner;