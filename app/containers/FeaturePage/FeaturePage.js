import React, { Component } from 'react';
import Faerie from 'components/Faerie';
import {
  BrowserRouter as Router,
  Link,
} from 'react-router-dom';
import './style.scss';
import PropTypes from 'prop-types';

class FeaturePage extends Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { portfolio, portfolioCurrent, updatePortfolioCount, match } = this.props;
    const currentIndex = portfolio.findIndex(({ id }) => id === match.params.portfolioId);
    updatePortfolioCount(currentIndex);
    if (portfolioCurrent !== prevProps.portfolioCurrent) {
      this.setState(() => ({ count: 0 }));
    }
  }

  handleClick = () => {
    const { portfolioCurrent } = this.props;
    const { count } = this.state;
    const newCount = count === portfolioCurrent.images.length - 1 ? 0 : count + 1;
    this.setState(() => ({
      count: newCount
    }));
  };

  render() {
    const { portfolio, portfolioCount, portfolioCurrent } = this.props;
    const { count } = this.state;
    const currentEntry = portfolioCurrent;
    const nextEntry = portfolioCount === portfolio.length - 1 ? portfolio[0] : portfolio[portfolioCount + 1];
    const lastEntry = portfolioCount === 0 ? portfolio[portfolio.length - 1] : portfolio[portfolioCount - 1];
    if (portfolio.length < 3) {
      return (
        <Faerie />
      );
    }
    return (
      <div className="portfolio-spread">
        <div className="portfolio-nav last">
          <Link to={`${lastEntry.id}`}>
            <h2>L a s t</h2>
            <span>{lastEntry.projectTitle}</span>
          </Link>
        </div>
        <div className="left">
          <figure
            className="img-container"
            role="button"
            tabIndex="0"
            onClick={this.handleClick}
            onKeyDown={this.handleClick}
          >
            <img alt="" src={portfolioCurrent.images[count].imageSrc} />
          </figure>
          <div className="img-counter">
            {count + 1}/{currentEntry.images.length}
          </div>
        </div>
        <div className="right">
          <div className="text-container">
            <h1>{currentEntry.projectTitle}</h1>
            <a className="link" href={currentEntry.link}>{currentEntry.link}</a>
            <ul>
              {currentEntry.tags.map((item) => <li key={item}>{item}</li>)}
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
      </div>
    );
  }
}

FeaturePage.propTypes = {
  match: PropTypes.object,
  portfolioCurrent: PropTypes.object,
  portfolio: PropTypes.object,
  portfolioCount: PropTypes.number,
  updatePortfolioCount: PropTypes.func
};

export default FeaturePage;
