import React from 'react';
import RedditPage from './reddit/RedditPage';
import Header from './static/Header';

class App extends React.Component {
  render() {
    return (
      <div>
      	<Header />
        <RedditPage redditUrl='https://www.reddit.com/r/Showerthoughts.json' />
      </div>
    )
  }
}

export default App;
