/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

export default class FeaturePage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const { onInit } = this.props;
    onInit();
  }

  handleClickLast = (e) => {
    const { updatePortfolioCount, portfolioCount, portfolio } = this.props;
    const updateCount = portfolioCount === 0 ? portfolio.length - 1 : portfolioCount - 1;
    updatePortfolioCount(updateCount);
  }

  handleClickNext = (e) => {
    const { updatePortfolioCount, portfolioCount, portfolio } = this.props;
    const updateCount = portfolioCount === portfolio.length - 1 ? 0 : portfolioCount + 1;
    updatePortfolioCount(updateCount);
  }

  render() {
    const { portfolio, portfolioCount } = this.props;
    // let count = 0;
    const currentEntry = portfolio[portfolioCount];
    let nextEntry = portfolioCount === portfolio.length - 1 ? portfolio[0] : portfolio[portfolioCount + 1];
    let lastEntry = portfolioCount === 0 ? portfolio[portfolio.length - 1] : portfolio[portfolioCount - 1];

    return (
      <div className="portfolio-page">
        <div className="left">
          <div className="img-container">
            <img alt="" src={currentEntry.imageUrl} />
          </div>
          <div className="img-counter">
            01/10
          </div>
        </div>
        <div className="right">
          <div className="text-container">
            <h1>{currentEntry.projectTitle}</h1>
            <a className="link">{currentEntry.link}</a>
            <ul><li>Tag</li></ul>
            <p>
              In 2015 I co-founded an NY-based print studio specializing in servicing the arts and fashion community with high-quality digital paper/fabric printing and bespoke production for products and installations.
              As a Co-Founder, I performed a large range of work at our studio from the management and fabrication of projects to the development of all of our websites and web stores (creating both static sites and custom designed Shopify themes).
            </p>
          </div>
        </div>
        <div className="portfolio-nav last" onClick={this.handleClickLast}>
          <h2>L a s t</h2>
          <span>{lastEntry.projectTitle}</span>
        </div>
        <div className="portfolio-nav next" onClick={this.handleClickNext}>
          <h2>N e x t</h2>
          <span>{nextEntry.projectTitle}</span>
        </div>
      </div>
    );
  }
}

FeaturePage.propTypes = {
  onInit: PropTypes.func,
  updatePortfolioCount: PropTypes.func,
  portfolioCount: PropTypes.number,
  portfolio: PropTypes.array,
};
