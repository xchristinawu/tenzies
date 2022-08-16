import React from "react"
import Die from "./components/Die"
import Confetti from "react-confetti"
import {nanoid} from "nanoid"

export default function App() {
  const [dice, setDice] = React.useState(newDiceArray())
  const [tenzies, setTenzies] = React.useState(false)

  /*
  checks dice array for winning conditions:
  1. all dice have the same value (.value)
  2. all dice are held (.isHeld)

  if both conditions are true, tenzies is set to true
   */
  React.useEffect(() => {
    const allValuesSame = dice.every(die => die.value === dice[0].value) 
    const allIsHeld = dice.every(die => die.isHeld)

    if (allValuesSame && allIsHeld) {
      setTenzies(true)
    }
  }, [dice])

  function getRandomNum() {
    return Math.ceil(Math.random() * 6)
  }

  // return array of 10 dice
  function newDiceArray() {
    return Array.from(Array(10))
                .map(die => ({
                  value: getRandomNum(), 
                  isHeld: false,
                  id: nanoid()
                }))
  }

  // 10 Dice components created
  const diceElements = dice.map(die => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ))

  /* 
  if !tenzies - roll will change die.value if .isHeld is false
  if tenzies - trigger new game
    1. setTenzies to false (stops confetti)
    2. get newDiceArray (.isHeld all false, new nums)
  */
  function rollDice() {
    if (!tenzies) {
      setDice(prevDice => prevDice.map(die => (
        die.isHeld ? 
        die : 
        {...die, value: getRandomNum()}
      )))
    } else {
      setTenzies(false)
      setDice(newDiceArray())
    }
  }

  // onClick for Die component
  // will flip .isHeld to opposite to hold/not hold die
  function holdDice(id) {
    setDice(prevDice => prevDice.map(die => (
        die.id === id ? {...die, isHeld: !die.isHeld} : die
      ))
    )
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button 
        className="roll-btn"
        onClick={rollDice}
      >
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  )
}