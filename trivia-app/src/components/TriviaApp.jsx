import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import CheckBoxIcon from '@mui/icons-material/CheckBox'; //correct answers
import CloseIcon from '@mui/icons-material/Close'; //wrong answers

const TriviaApp = () => {
  //'questions' stores trivia questions
  const [questions, setQuestions] = useState([]);
  // 'answersState' is user's choice for the answer
  const [answersState, setAnswersState] = useState({});

  useEffect(() => {
    //fetches the questions from the trivia API.
    const fetchQuestions = async () => {
      const response = await fetch("https://the-trivia-api.com/v2/questions?limit=3");
      const data = await response.json();
      setQuestions(data);
      // initialize 'answersState' to null for each question (no answer selected yet)
      setAnswersState(data.reduce((acc, question) => ({ ...acc, [question.id]: null }), {}));
    };

    fetchQuestions();
  }, []);

  //when answer button clicked
  const handleSelectAnswer = (questionId, answer) => {
    //records which answer was selected
    setAnswersState(prevState => ({
      ...prevState,
      [questionId]: answer
    }));
  };

  return (
    <div>
      {questions.map((question) => (
        <div key={question.id}>
          <h2>{question.question}</h2>
          {question.answers.map((answer) => {
            // checks if current answer is correct
            const isCorrect = answer === question.correctAnswer;
            // checks if the correct answer was selected by user
            const isSelected = answersState[question.id] === answer;
            let btnColor = "primary"; 
            let icon = null;

            // if an answer is selected:
            if (isSelected) {
              btnColor = isCorrect ? "success" : "error";
              icon = isCorrect ? <CheckBoxIcon /> : <CloseIcon />;
            }

            return (
              <Button
                key={answer}
                variant="contained"
                color={btnColor}
                onClick={() => handleSelectAnswer(question.id, answer)}
                disabled={answersState[question.id] !== null} 
                startIcon={isSelected ? icon : null} 
                style={{
                  margin: '0.5rem',
                  minWidth: '150px'
                }}
              >
                {answer}
              </Button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default TriviaApp;
