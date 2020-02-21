import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import portfolioData from 'database/data';

import {
  makeSelectPortfolio,
  makeSelectPortfolioCount,
} from 'containers/App/selectors';
import { portfolioLoaded, updatePortfolioCount, updatePortfolioCurrent } from '../App/actions';
import FeaturePage from './FeaturePage';

const mapDispatchToProps = (dispatch) => ({
  onInit: (evt) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    dispatch(portfolioLoaded(portfolioData));
  },
  updatePortfolioCount: (evt) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    dispatch(updatePortfolioCount(evt));
  },
  updatePortfolioCurrent: (evt) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    dispatch(updatePortfolioCurrent(evt));
  }
});

const mapStateToProps = createStructuredSelector({
  portfolio: makeSelectPortfolio(),
  portfolioCount: makeSelectPortfolioCount(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(FeaturePage);
export { mapDispatchToProps };
