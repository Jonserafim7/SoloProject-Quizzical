import React, { useState, useEffect } from 'react'
import {decode} from 'html-entities'

export default function Quizz(props) {

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
                                id={`question-${index}-answer-${i+1}`} 
                                name={`question-${index}`} 
                                value={answer}
                                className='answer-input' 
                            />
                            <label className='answer-label' htmlFor={`question-${index}-answer-${i+1}`}>{decode(answer)}</label>
                        </div>
                    ))}
                </div>
            </div>
        );
    });

    return (
        <div className='quizz'>
            {questionsElements}
            <button className='check-answers-btn'>Check Answers</button>
        </div>
        
    )
}