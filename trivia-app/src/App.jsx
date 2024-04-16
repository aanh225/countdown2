import React, { useState } from 'react';
import TriviaApp from "./components/TriviaApp";
import './App.css';

function App() {
  const [gameKey, setGameKey] = useState(0);

  //function called when  'Generate New Questions' button is clicked
  const generateNewQuestions = () => {
    //rerenders if clicked
    setGameKey(prevKey => prevKey + 1);
  };
  //renders the trivia app
  return (
    <div>
      <button onClick={generateNewQuestions}>Generate New Questions!!!</button>
      {/* gets re-rendered whenever gameKey changes*/}
      <TriviaApp key={gameKey} />
    </div>
  );
}

export default App;
