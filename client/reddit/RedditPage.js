import React from 'react';
import RedditList from './RedditList';
import styles from './RedditPage.scss';

class RedditPage extends React.Component {
  constructor() {
    super();
    this.state = {
      redditData : [],
    }
    this.onRedditData = this.onRedditData.bind(this);
  };

  onRedditData(data) {
    const parsedRedditData = JSON.parse(data.currentTarget.response).data.children
    this.setState({ redditData: parsedRedditData });
  };

  onRedditError(data) {
    console.error(this.props.redditUrl, status, err.toString());
  };

  loadDataFromReddit() {
    const oReq = new XMLHttpRequest();
    oReq.addEventListener("load", this.onRedditData);
    oReq.addEventListener("error", this.onRedditError);
    oReq.open("GET", this.props.redditUrl);
    oReq.send();
  };

  componentDidMount() {
    this.loadDataFromReddit();
  };

  render() {
    return (
      <div className={styles.page}>
        <h1>Reddit</h1>
        <RedditList redditData={this.state.redditData} />
      </div>
    )
  }
};

RedditPage.propTypes = {
  RedditPage: React.PropTypes.array,
};

RedditPage.defaultProps = {
  redditData: [],
};

export default RedditPage;
