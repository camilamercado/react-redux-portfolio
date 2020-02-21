import React, { Component } from 'react';
import Faerie from 'components/Faerie';
import MediaViewer from 'components/MediaViewer';

import {
  BrowserRouter as Router,
  Link,
} from 'react-router-dom';
import './style.scss';
import PropTypes from 'prop-types';

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

  componentDidMount() {
    const { portfolio, updatePortfolioCurrent, match } = this.props;
    const currentIndex = portfolio.findIndex(({ id }) => id === match.params.portfolioId);
    updatePortfolioCurrent(currentIndex);
  }

  componentDidUpdate(prevProps) {
    const { portfolio, portfolioCurrent, updatePortfolioCurrent, match } = this.props;
    const currentIndex = portfolio.findIndex(({ id }) => id === match.params.portfolioId);
    updatePortfolioCurrent(currentIndex);
    if (portfolioCurrent !== prevProps.portfolioCurrent) {
      this.setState(() => ({ count: 0, gridSetting: 'Expand' }));
    }
  }

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
    const { portfolio, portfolioCurrent } = this.props;
    const { count, gridSetting } = this.state;
    const current = portfolioCurrent;
    const portfolioCount = portfolio.indexOf(portfolioCurrent);
    const nextEntry = portfolioCount === portfolio.length - 1 ? portfolio[0] : portfolio[portfolioCount + 1];
    const lastEntry = portfolioCount === 0 ? portfolio[portfolio.length - 1] : portfolio[portfolioCount - 1];
    if (portfolio.length < 3) {
      return (
        <section className="page-loader">
          <div className="loader"></div>
        </section>
      );
    }
    return (
      <section className={current.theme ? `portfolio-spread ${gridSetting} ${current.theme}` : `portfolio-spread ${gridSetting}`}>
        <div className="portfolio-nav last">
          <Link to={`${lastEntry.id}`}>
            <h2>L a s t</h2>
            <span>{lastEntry.projectTitle}</span>
          </Link>
        </div>
        <div className="left">
          <MediaViewer media={current.media} />
        </div>
        <div className="right">
          <div className="text-container">
            <h1>{current.projectTitle}</h1>
            <a className="link" href={current.link}>{current.link}</a>
            <ul>
              {current.tags.map((item) => <li key={item}>{item}</li>)}
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
  updatePortfolioCurrent: PropTypes.func,
};

export default FeaturePage;
