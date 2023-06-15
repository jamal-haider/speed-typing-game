
import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const STARTING_TIME = 5
  const [text, setText] = useState("")
  const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME)
  const [isTimeRemaining, setIsTimeRemaining] = useState(false)
  const [wordCount, setWordCount] = useState(0)
  
  function handleChange(e){
    setText(e.target.value)
  }

  function calculateWordCount(text){
    const wordsArr = text.trim().split(" ")
    return wordsArr.filter(word => word !== "").length
  }

  useEffect(() => {
    if(isTimeRemaining && timeRemaining > 0 ){
      setTimeout(() => {
        setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 1)
      }, 1000)
    }else if(timeRemaining === 0){
      endGame()
    }
    
  }, [timeRemaining, isTimeRemaining])

  function startGame(){
   setIsTimeRemaining(true)
   setText("")
   setWordCount(0)
   setTimeRemaining(STARTING_TIME)
  }

  function endGame(){
    setIsTimeRemaining(false)
    setWordCount(calculateWordCount(text))
  }

  return (
    <>
      <h1>How fast do you type?</h1>
      <textarea
        onChange={handleChange}
        value={text}
        disabled={!isTimeRemaining}
      />
      <h4>Time remaining: {timeRemaining} </h4>
      <button
        onClick={startGame}
        disabled={isTimeRemaining}
      >START</button>
      <h1>Word count: {wordCount ? wordCount : '???'}</h1>
    </>
  )
}

export default App
