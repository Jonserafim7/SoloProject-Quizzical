import React, { useState, useEffect } from 'react'

export default function Intro(props) {
    return (
        <div className="intro">
            <h1 className='intro-title'>Intro</h1>
            <p className='intro-description'>Click to start the quizz</p>
            <button 
                className='intro-btn' 
                onClick={props.handleStartQuizz}
                >Start quizz
            </button>
        </div>
    )
}