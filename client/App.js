import React, { PureComponent } from "react";
import "./css/normalize.css";
import "./css/skeleton.css";
import "./css/index.css";

class App extends PureComponent {
  render() {
    return (
      <div>
        <div className="section header">
          <div className="container">
            <h3 className="section-heading">GraphQL Workshop</h3>
            <p className="section-description">
              By: <a href="http://callmejoe.net/">Joe Karlsson</a>
            </p>
          </div>
        </div>

        <div className="section content">
          <h4>REST</h4>
          <div>
            Enter a new item in the text box and hit Submit to save it to the
            database
          </div>
          <form action="/quotes" method="POST">
            <input type="text" placeholder="item" name="item" />
            <button type="submit">Submit</button>
          </form>
        </div>

      </div>
    );
  }
}

export default App;
