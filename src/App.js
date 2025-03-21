import './App.css';
import Die from './Die';
import {nanoid} from 'nanoid';
import React, {useState} from 'react';
import Confetti from "react-confetti"

function App() {

 function generateAllNewDice() {
      return new Array(10)
          .fill(0)
          .map(() => ({
          value: Math.ceil(Math.random() * 6), 
          isHeld: false ,
          id: nanoid()}));
  }

  const [dice, setDice] = useState(()=>generateAllNewDice());

  const gameWon = dice.every(die => die.isHeld) && 
  dice.every(die => die.value === dice[0].value)

  const roll = () => {
    if(!gameWon){
      setDice(prevDice => prevDice.map(die => 
        die.isHeld ? die : {...die, value: Math.ceil(Math.random() * 6)}));
    }else{
      setDice(generateAllNewDice());
    }
    }

  const hold = (id) => {
    console.log(id);
    setDice(prevDice => prevDice.map(die =>
         die.id === id ? {...die, isHeld: !die.isHeld} : 
        die
        ))
 }

   const diceElements =  dice.map(diceObj => <Die 
    key={diceObj.id} 
    value={diceObj.value} 
    isHeld={diceObj.isHeld}
    hold={hold}
    id={diceObj.id}
    />);

   
  return (
    <div id="root" className="App">
      <main>
        { gameWon && <Confetti /> }
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className='dice-container'> 
          {diceElements}
        </div>
        <button className='roll-dice' onClick={roll}>{gameWon ? "New Game": "Roll"}</button>
      </main>
    </div>
  );
}

export default App;
