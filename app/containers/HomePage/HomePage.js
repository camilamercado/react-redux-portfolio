/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Link,
  Route // for later
} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from 'components/Header';
import Faerie from 'components/Faerie';
import './style.scss';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    const { onInit } = this.props;
    onInit();
  }

  render() {
    return (
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="A React.js Boilerplate application homepage" />
        </Helmet>
        <div className="home-page">
          <Faerie />
        </div>
        <Header {...this.props}/>
      </article>
    );
  }
}

HomePage.propTypes = {
  onInit: PropTypes.func,
};
