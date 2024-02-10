import React,{ useState, useEffect } from 'react'
import Intro from './components/Intro'
import Quizz from './components/Quizz'
import './App.css'

function App() {

  const [quizzStarted, setQuizzStarted] = useState(false)
  const [quizzData, setQuizzData] = useState([])

  
  useEffect(() => {
    if (quizzStarted) {
      fetch('https://opentdb.com/api.php?amount=5')
      .then(res => res.json())
      .then(data => {
        console.log(data.results)
        setQuizzData(data.results)
        })
    }
  }, [quizzStarted])

  function handleStartQuizz() {
    console.log('Quizz started')
    setQuizzStarted(true)
  }

  return (
    <>
      {quizzStarted ? 
        <Quizz 
          quizzData={quizzData}
        /> : 
        <Intro 
          setQuizzStarted={handleStartQuizz}
        />
      }
    </>
  )
}

export default App


