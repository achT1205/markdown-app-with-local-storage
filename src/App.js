import React, { Component } from 'react';
import { sampleText } from './sampleText';
import marked from 'marked';

class App extends Component {

  state = {
    text: sampleText
  }

  handleChange = event => {

    const text = event.target.value;

    this.setState({ text });
  }

  renderText = (text) => {
    const __html = marked(text, { sanitize: true });
    return { __html };
  }

  componentDidMount() {
    const text = localStorage.getItem('text');
    this.setState({ text })
  }

  componentDidUpdate() {
    const { text } = this.state;
    if (text) {
      localStorage.setItem('text', text);
    } else {
      localStorage.setItem('text', sampleText);
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <textarea
              className="form-control"
              value={this.state.text}
              onChange={this.handleChange}
              rows="35">
            </textarea>
          </div>
          <div className="col-sm-6">
            <div dangerouslySetInnerHTML={this.renderText(this.state.text)}></div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
