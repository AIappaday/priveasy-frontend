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
    // const workflow = await fetch('https://prometheus-api.llm.llc/api/workflow/QqRqhvr5kRqFD2waSLUF',
    // {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'accept': 'application/json',
    //   },
    //   body: {
    //     'apiKey': "d3cab356-2ceb-4a22-9273-8f9f5857a2a4",
    //     'args': [this.state.question],
    //     'kwargs': {}
    //   }
    // })
    if(this.state.sarcasm === true){
      
    }
    // eslint-disable-next-line
    const workflow = await fetch(`https://qwcgkuazdgqloxgo5mtie2h6oq0jrvbc.lambda-url.us-west-2.on.aws/?nsfw=${this.state.sarcasm}`, {
      body: JSON.stringify({'apiKey': '5b99ed99-462a-4a84-a234-aeb36935e39c', 'args': [ `${this.state.question}` ], 'kwargs': {
      "URL" : `${this.state.policyURL}`,
    }}),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    }).then((response) => {
      // console.log("response.json(): ", response.json());
      return response.json();
    }).then((data) => {
      // let keys = Object.keys(data.executionTrace);
      console.log("data: ", data.outputs[0])
      // console.log("data: ", data.executionTrace[keys[2]].output, data.outputs[0]);
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
              <br/>Policy URL: 
                <input type="text"
                      name="Policy URL" 
                      value={this.state.policyURL}
                      className="input"
                      onChange={this.onChangeURL}/>
                <br/> Question: 
                <input type="text"
                      name="question" 
                      value={this.state.question}
                      className="input"
                      onChange={this.onChange}/>
             </div>
            </label>
            <br/>
            <div className='submit'>
              <input type="checkbox" name="sarcasm" onClick={this.handleOnChange.bind(this)}/>
              <p className='sarcasm'>(NSFW)</p>
              <input type="submit" value="Submit" onClick={this.runQuery.bind(this)} />
            </div>
          </div>
        
      </div>
    );
  }
}

export default App;
