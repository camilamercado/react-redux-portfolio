import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import portfolioData from 'database/data';

import {
  makeSelectPortfolio,
  makeSelectPortfolioCount,
  makeSelectPortfolioCurrent,
} from 'containers/App/selectors';
import { portfolioLoaded, updatePortfolioCount, updatePortfolioCurrent } from './actions';
import App from './App';

const mapDispatchToProps = (dispatch) => ({
  onInit: (evt) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    dispatch(portfolioLoaded(portfolioData));
    dispatch(updatePortfolioCurrent(portfolioData[0]));
  },
  updatePortfolioCount: (evt) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    dispatch(updatePortfolioCount(evt));
  },
  updatePortfolioCurrent: (evt) => {
    dispatch(updatePortfolioCurrent(portfolioData[evt]));
  }
});

const mapStateToProps = createStructuredSelector({
  portfolio: makeSelectPortfolio(),
  portfolioCount: makeSelectPortfolioCount(),
  portfolioCurrent: makeSelectPortfolioCurrent(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(App);
export { mapDispatchToProps };
