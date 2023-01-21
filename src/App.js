import './App.css';
import { useState } from 'react';

function App() {
  const [question, setQuestion] = useState('');

  const onQuestionSubmit = function (e) {
    console.log(question);
    e.preventDefaault();
    // Call API with question
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>PrivEasy</h1>
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
