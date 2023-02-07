import './App.css';
// import { useState } from 'react';
import React, { Component } from "react";

class App extends Component {
  // const [question, setQuestion] = useState('');
  constructor(props) {
    super(props);
    this.state = {
      question: null,
      policyURL: null,
      sarcasm: false,
      loading: false
    }
    this.onQuestionSubmit = this.onQuestionSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.runQuery = this.runQuery.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  onQuestionSubmit = function (e) {
    // console.log(question);
    e.preventDefaault();
    // Call API with question
  };

  onChange = e => {
    // console.log("e: ", e);
    this.setState({question: e.target.value});
  }

  onChangeURL = e => {
    // console.log("e: ", e);
    this.setState({policyURL: e.target.value});
  }

  handleOnChange = e => {
    this.setState({sarcasm: e.target.checked});
  }

  async runQuery(e) {
    e.preventDefault();
    this.setState({ loading: true });
    //eslint-disable-next-line
    const workflow = await fetch(`https://qwcgkuazdgqloxgo5mtie2h6oq0jrvbc.lambda-url.us-west-2.on.aws/?nsfw=${this.state.sarcasm}`, {
      body: JSON.stringify({'args': [ `${this.state.question}` ], 'kwargs': {
      "URL" : `${this.state.policyURL}`,
    }}),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log("data: ", data.outputs[0])
      this.setState({output: data.outputs[0], loading: false});
      return data;
    })
    .catch((err) => {
      this.setState({output: 'Error! Please try again :(', loading: false});
    });
    
  }

  render(){
    const output = this.state.loading ? 'Loading...' : this.state.output;
    return (
      <div className="App">
        <div className="App-header">
          <h4 className='title'>PrivEasy</h4>
        </div>
        <div className='card'>{output}</div>
        <div className='form' onSubmit={this.onQuestionSubmit.bind(this)}>
          <label>
            <div className='question'>Type in Your Question:</div>
            <div className='inputs'>
              <div>
                Privacy Policy URL: 
                <input type="text"
                      name="Policy URL" 
                      value={this.state.policyURL}
                      className="input"
                      onChange={this.onChangeURL}/>
              </div>
              <div>
                Question: 
                <input type="text"
                      name="question" 
                      value={this.state.question}
                      className="input"
                      onChange={this.onChange}/>
              </div>
            </div>
          </label>
          <br/>
          <div className='submit'>
            <input type="checkbox" name="sarcasm" onClick={this.handleOnChange.bind(this)}/>
            <p className='sarcasm'>(NSFW)</p>
            <input type="submit" value="Submit" onClick={this.runQuery.bind(this)} />
          </div>
        </div>
        <div className='disclaimer'>
        The information provided by this app is for general informational purposes only. It is not intended to be legal advice or to be relied upon as a substitute for specific legal advice from a qualified attorney. The use of this app does not create an attorney-client relationship. The information provided in this app may not be accurate, complete, or up-to-date, and may not apply to the specific circumstances of your situation. You should not act or refrain from acting based on any information provided by this app without first seeking professional legal advice. The developers and authors of this app are not responsible for any errors or omissions in the information provided, or for any actions taken or not taken based on this information.
        </div>
        
      </div>
    );
  }
}

export default App;
