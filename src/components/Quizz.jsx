import React, { useState, useEffect } from 'react'
import {decode} from 'html-entities'

export default function Quizz(props) {

    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [isReset, setIsReset] = useState(false);

    function shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;
    
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
    
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
    
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
    
        return array;
    }

    function checkAnswers() {
        const allQuestions = document.querySelectorAll('.question-container');
        const correctAnswer = props.quizzData.map(question => question.correct_answer);
    
        allQuestions.forEach((questionContainer, index) => {
            const inputs = questionContainer.querySelectorAll('.answer-input');
            const labels = questionContainer.querySelectorAll('.answer-label');

            inputs.forEach((input, i) => {
                input.disabled=true;
                if (input.value === correctAnswer[index]) {
                    labels[i].style.backgroundColor = 'lightgreen';
                    if (input.checked) {
                        labels[i].style.border = 'none';
                        setScore(prevScore => prevScore + 1)
                    }
                }
                else if (input.checked && input.value !== correctAnswer[index]) {
                    labels[i].style.backgroundColor = '#F6DADC';
                    labels[i].style.color = '#8F95B0';
                    labels[i].style.border = 'none';
                }
                else if (input.value !== correctAnswer[index]) {
                    labels[i].style.border = '#8F95B0 1px solid';
                    labels[i].style.color = '#8F95B0';
                }
                
            })
        });

        setIsAnswered(true);
        setIsReset(false);
    }

    function resetQuizz() {
        const allLabels = document.querySelectorAll('.answer-label');
        const allInputs = document.querySelectorAll('.answer-input');

        allLabels.forEach(label => {
            label.style.backgroundColor = 'unset';
            label.style.color = '#293264';
            label.style.border = '#293264 1px solid';
            label.addEventListener('click', () => {
                label.style.backgroundColor = '#D6DBF5';
                label.style.border = 'none';
            });
        });

        allInputs.forEach(input => {
            input.checked = false;
            input.disabled = false;
        });

        setIsAnswered(false);
        setIsReset(true);
        setScore(0);
    }

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('https://opentdb.com/api.php?amount=5')
            const data = await response.json()
            props.setQuizzData(data.results)
            console.log('fetching data 2')
            console.log(data.results)
          }
          catch (error) {
            console.log(error)
            alert('An error occurred while fetching the data')
          }
        }
    
        if (isReset) {
          fetchData()
        }
    
      }, [isReset])
    
    const questionsElements = props.quizzData.map((question, index) => {
        const answers = shuffle([...question.incorrect_answers, question.correct_answer]);
    
        return (
            <div className="question-container" key={index}>
                <h2>{decode(question.question)}</h2>
                <div className="answers-container">
                    {answers.map((answer, i) => (
                        <div key={i}>
                            <input 
                                type="radio" 
                                id={`question-${index+1}-answer-${i+1}`} 
                                name={`question-${index+1}`} 
                                value={answer}
                                className='answer-input' 
                            />
                            <label className='answer-label' htmlFor={`question-${index+1}-answer-${i+1}`}>{decode(answer)}</label>
                        </div>
                    ))}
                </div>
            </div>
        );
    });

    return (
        <div className='quizz'>
            {questionsElements}
            
            {!isAnswered && <button className='check-answers-btn' onClick={checkAnswers}>Check Answers</button>}
            {isAnswered && 
            <div className='score-container'>
                <h3>You scored {score}/{props.quizzData.length} correct answers</h3>
                <button className='reset-answers-btn' onClick={resetQuizz}>Play again</button>
            </div>}
        </div>
        
    )
}