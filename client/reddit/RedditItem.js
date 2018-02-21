import React from 'react';

class RedditItem extends React.Component {
  render() {
    return (
      <div className='redditItem'>
        <h3>{ this.props.children }</h3>
        <p>Author: {this.props.author}</p>
      </div>
    )
  }
};

export default RedditItem;
