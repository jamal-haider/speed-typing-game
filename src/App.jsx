
import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const TOTAL_GAME_TIME = 5
  const [gameStarted, setGameStarted] = useState(false)
  const [remainingTime, setRemainingTime] = useState(TOTAL_GAME_TIME)
  const [wordCount, setWordCount] = useState(0)
  const [textBox, setTextBox] = useState("")

  const textBoxRef = useRef(null)

  function startGame(){
    setGameStarted(true)
    setTextBox("")
    setWordCount(0)
    textBoxRef.current.disabled = false
    textBoxRef.current.focus()
  }

  function endGame(){
    setGameStarted(false)
    setWordCount(getWordCount())
    setRemainingTime(TOTAL_GAME_TIME)
  }
  function getWordCount(){
    return textBox.trim().split(" ").length
  }

  useEffect(() => {
    if(gameStarted && remainingTime > 0){
      setTimeout(() => {
        setRemainingTime(time => time - 1)
      }, 1000);
    }else if(remainingTime === 0){
      endGame()
    }
  }, [gameStarted, remainingTime])



  return (
    <>
      <h1>How fast do you type?</h1>
      <textarea 
        value={textBox}
        disabled={!gameStarted}
        onChange={(e) => setTextBox(e.target.value)}
        ref={textBoxRef}
      />
      <h4>Time remaining: {remainingTime}</h4>
      <button
        onClick={startGame}
        disabled={gameStarted}
      >
        START
      </button>
      <h1>Word count: {wordCount}</h1>
    </>
  )
}

export default App
