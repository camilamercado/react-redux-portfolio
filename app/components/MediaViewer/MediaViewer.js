import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

function mapFiles(context) {
  const keys = context.keys();
  const values = keys.map(context);
  return keys.reduce((accumulator, key, index) => ({
    ...accumulator,
    [key.substring(2)]: values[index],
  }), {});
}

class MediaViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      gridSetting: 'Expand'

    };
  }

  componentDidUpdate(prevProps) {
    const { media } = this.props;
    if (media !== prevProps.media) {
      this.setState(() => ({ count: 0, gridSetting: 'Expand' }));
    }
  }

  handleClickCounter = () => {
    const { media } = this.props;
    const { count } = this.state;
    const newCount = count === media.length - 1 ? 0 : count + 1;
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
    const { media } = this.props;
    const { count, gridSetting } = this.state;
    const allMedia = mapFiles(require.context('../../database/media', true, /\.(png|gif|ico|jpg|jpeg)$/));
    const currentMedia = media.length < count ? media[0].mediaSrc : media[count].mediaSrc;
    const vimeoSrc = `https://player.vimeo.com/video/${currentMedia}?autoplay=1&loop=1&autopause=0&background=1`;
    const imgSrc = media[count].local ? allMedia[currentMedia] : currentMedia;
    const mediaElement = media[count].video ? <iframe src={vimeoSrc} title="myFrame" frameBorder="0" allow="autoplay; fullscreen" allowFullScreen></iframe> : <img alt="" src={imgSrc} />;

    return (
      <section className="mediaViewer">
        <div
          className="click-scrim"
          role="button"
          tabIndex="0"
          onClick={this.handleClickCounter}
          onKeyDown={this.handleClickCounter}
        >
        </div>
        <div className="loader-window">
          <div className="loader"></div>
        </div>
        <figure
          className={media[count].class ? `img-container ${media[count].class}` : 'img-container'}
        >
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
            {count + 1}/{media.length}
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
      </section>
    );
  }
}

MediaViewer.propTypes = {
  media: PropTypes.array,
};

export default MediaViewer;
