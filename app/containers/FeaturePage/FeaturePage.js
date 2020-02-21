import React, { Component } from 'react';
import Faerie from 'components/Faerie';
import {
  BrowserRouter as Router,
  Link,
} from 'react-router-dom';
import './style.scss';
import PropTypes from 'prop-types';


function mapFiles(context) {
  const keys = context.keys();
  const values = keys.map(context);
  return keys.reduce((accumulator, key, index) => ({
    ...accumulator,
    [key.substring(2)]: values[index],
  }), {});
}

class FeaturePage extends Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      gridSetting: 'Expand'
    };
    this.handleClickCounter = this.handleClickCounter.bind(this);
    this.handleClickExpander = this.handleClickExpander.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { portfolio, portfolioCurrent, updatePortfolioCount, match } = this.props;
    const currentIndex = portfolio.findIndex(({ id }) => id === match.params.portfolioId);
    updatePortfolioCount(currentIndex);
    if (portfolioCurrent !== prevProps.portfolioCurrent) {
      this.setState(() => ({ count: 0, gridSetting: 'Expand' }));
    }
  }

  // importAll = (r) => {
  //   r.keys().map(r);
  // }

  handleClickCounter = () => {
    const { portfolioCurrent } = this.props;
    const { count } = this.state;
    const newCount = count === portfolioCurrent.media.length - 1 ? 0 : count + 1;
    this.setState(() => ({
      count: newCount
    }));
  };

  handleClickExpander = () => {
    const { gridSetting } = this.state;
    const newSetting = gridSetting === 'Expand' ? 'Reduce' : 'Expand';
    this.setState(() => ({
      gridSetting: newSetting
    }));
  };

  render() {
    const { portfolio, portfolioCount, portfolioCurrent } = this.props;
    const { count, gridSetting } = this.state;
    const nextEntry = portfolioCount === portfolio.length - 1 ? portfolio[0] : portfolio[portfolioCount + 1];
    const lastEntry = portfolioCount === 0 ? portfolio[portfolio.length - 1] : portfolio[portfolioCount - 1];
    const allMedia = mapFiles(require.context('./media', true, /\.(png|gif|ico|jpg|jpeg|mov)$/));
    const currentMedia = portfolioCurrent.media[count].mediaSrc;
    const vimeoSrc = `https://player.vimeo.com/video/${currentMedia}?autoplay=1&loop=1&autopause=0&background=1`;
    const mediaImport = portfolioCurrent.media[count].local ? allMedia[currentMedia] : currentMedia;
    const mediaElement = portfolioCurrent.media[count].video ? <iframe src={vimeoSrc} title="myFrame" frameBorder="0" allow="autoplay; fullscreen" allowFullScreen></iframe> : <img alt="" src={mediaImport} />;

    if (portfolio.length < 3) {
      return (
        <Faerie />
      );
    }
    return (
      <section className={portfolioCurrent.theme ? `portfolio-spread ${gridSetting} ${portfolioCurrent.theme}` : `portfolio-spread ${gridSetting}`}>
        <div className="portfolio-nav last">
          <Link to={`${lastEntry.id}`}>
            <h2>L a s t</h2>
            <span>{lastEntry.projectTitle}</span>
          </Link>
        </div>
        <div
          className="click-scrim"
          role="button"
          tabIndex="0"
          onClick={this.handleClickCounter}
          onKeyDown={this.handleClickCounter}
        >
        </div>
        <div className="left">
          <figure
            className={portfolioCurrent.media[count].class ? `img-container ${portfolioCurrent.media[count].class}` : 'img-container'}
          >
            <div className="loader"></div>
            {mediaElement}
          </figure>
          <div className="img-ui">
            <div
              className="img-clickthrough"
              role="button"
              tabIndex="0"
              onClick={this.handleClickCounter}
              onKeyDown={this.handleClickCounter}
            >
              (Click or Key)
            </div>
            <div className="img-counter">
              {count + 1}/{portfolioCurrent.media.length}
            </div>
            <div
              className="img-expander"
              role="button"
              tabIndex="0"
              onClick={this.handleClickExpander}
              onKeyDown={this.handleClickExpander}
            >
              ({gridSetting} Image Box)
            </div>
          </div>
        </div>
        <div className="right">
          <div className="text-container">
            <h1>{portfolioCurrent.projectTitle}</h1>
            <a className="link" href={portfolioCurrent.link}>{portfolioCurrent.link}</a>
            <ul>
              {portfolioCurrent.tags.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <p>
              In 2015 I co-founded an NY-based print studio specializing in servicing the arts and fashion community with high-quality digital paper/fabric printing and bespoke production for products and installations.
              As a Co-Founder, I performed a large range of work at our studio from the management and fabrication of projects to the development of all of our websites and web stores (creating both static sites and custom designed Shopify themes).
            </p>
            <p>
              In 2015 I co-founded an NY-based print studio specializing in servicing the arts and fashion community with high-quality digital paper/fabric printing and bespoke production for products and installations.
              As a Co-Founder, I performed a large range of work at our studio from the management and fabrication of projects to the development of all of our websites and web stores (creating both static sites and custom designed Shopify themes).
            </p>
          </div>
        </div>
        <div className="text-buffer"></div>
        <div className="portfolio-nav next">
          <Link to={`${nextEntry.id}`}>
            <h2>N e x t</h2>
            <span>{nextEntry.projectTitle}</span>
          </Link>
        </div>
      </section>
    );
  }
}

FeaturePage.propTypes = {
  match: PropTypes.object,
  portfolioCurrent: PropTypes.object,
  portfolio: PropTypes.array,
  portfolioCount: PropTypes.number,
  updatePortfolioCount: PropTypes.func
};

export default FeaturePage;
