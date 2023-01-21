import './App.css';
import { useState } from 'react';

function App() {
  const [question, setQuestion] = useState('');

  const onQuestionSubmit = function (e) {
    console.log(question);
    // Call API with question
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={onQuestionSubmit}>
          <label>
            Type in Your Question:
            <br/>
            <input type="text"
                   name="question" 
                   value={question}
                   onChange={(e) => setQuestion(e.target.value)}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </header>
    </div>
  );
}

export default App;
