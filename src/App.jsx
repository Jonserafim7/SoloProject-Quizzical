import React,{ useState, useEffect } from 'react'
import Intro from './components/Intro'
import Quizz from './components/Quizz'
import './App.css'

function App() {

  const [quizzStarted, setQuizzStarted] = useState(false)
  const [quizzData, setQuizzData] = useState([])

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://opentdb.com/api.php?amount=5')
        const data = await response.json()
        setQuizzData(data.results)
        console.log('fetching data 1')
        console.log(data.results)
      }
      catch (error) {
        console.log(error)
        alert('An error occurred while fetching the data')
      }
    }

    if (quizzStarted) {
      fetchData()
    }

  }, [quizzStarted])

  function handleStartQuizz() {
    setQuizzStarted(prevState => !prevState)
  }

  return (
    <>
      {quizzStarted ? 
        <Quizz 
          quizzData={quizzData}
          setQuizzData={setQuizzData}
          quizzStarted={quizzStarted}
        /> : 
        <Intro 
          handleStartQuizz={handleStartQuizz}
        />
      }
    </>
  )
}

export default App


