import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import portfolioData from 'database/data';

import {
  makeSelectPortfolio,
  makeSelectPortfolioCount,
} from 'containers/App/selectors';
import { portfolioLoaded, updatePortfolioCount } from './actions';
import App from './App';

const mapDispatchToProps = (dispatch) => ({
  onInit: (evt) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    dispatch(portfolioLoaded(portfolioData));
  },
  updatePortfolioCount: (evt) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    dispatch(updatePortfolioCount(evt));
  }
});

const mapStateToProps = createStructuredSelector({
  portfolio: makeSelectPortfolio(),
  portfolioCount: makeSelectPortfolioCount(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(App);
export { mapDispatchToProps };
