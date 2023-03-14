import "./App.css";
import { useState, useEffect } from "react";
import Dice from "./components/Dice";
import Confetti from "react-confetti";

function App() {
  const arr = [];

  for (let i = 0; i < 10; i++) {
    arr.push({
      id: i,
      value: Math.floor(Math.random() * 6) + 1,
      isActive: false,
    });
  }

  // State Dice -> array of objects -> 10 objects with io, value, isActive
  const [dice, setDice] = useState(arr);

  const [win, setWin] = useState(false);

  const diceComponents = dice.map((die) => (
    <Dice
      value={die.value}
      saveValue={saveValue}
      id={die.id}
      key={die.id}
      style={handleStyling(die)}
    />
  ));

  function handleRoll() {
    setDice((prevDice) => {
      const newArr = prevDice.map((die) => {
        return die.isActive
          ? die
          : {
              ...die,
              value: Math.floor(Math.random() * 6) + 1,
            };
      });

      return newArr;
    });
  }

  function handleRetry() {
    setDice((prevDice) => {
      const newArr = prevDice.map((die) => {
        return {
          ...die,
          value: Math.floor(Math.random() * 6) + 1,
          isActive: false,
        };
      });

      return newArr;
    });
    setWin(false);
  }

  function saveValue(id) {
    setDice((prevDice) => {
      const newArr = prevDice.map((die) => {
        return die.id === id ? { ...die, isActive: !die.isActive } : die;
      });
      return newArr;
    });
  }

  function handleStyling(die) {
    if (win) {
      return { background: "#59E391" };
    } else {
      if (die.isActive) {
        return { background: "#59E391" };
      } else {
        return { background: "#FFFFFF" };
      }
    }
  }

  // Check Win Condition everytime state is set
  useEffect(() => {
    let check = 0;
    for (let i = 0; i < 9; i++) {
      if (
        dice[i].value === dice[i + 1].value &&
        dice[i].isActive &&
        dice[i + 1].isActive
      ) {
        check += 1;
        if (check === 9) {
          setWin(true);
        }
      }
    }
  }, [dice]);

  return (
    <main>
      {win && <Confetti />}
      <div className="text-items">
        <h1>Tenzies</h1>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
      </div>
      <div className="dice-buttons">{diceComponents}</div>
      <div className="roll-button-wrapper">
        {win ? (
          <button className="roll-button" onClick={handleRetry}>
            Retry
          </button>
        ) : (
          <button className="roll-button" onClick={handleRoll}>
            Roll
          </button>
        )}
      </div>
    </main>
  );
}

export default App;
