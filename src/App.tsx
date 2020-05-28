import React, { useState, useEffect } from "react";
import "./App.css";
import logo from './logo.jpg';

enum GameState {
  Setup,
  ShowNumbers,
  UserInput,
  Score
}

const makeRandomNumbers = (nSet: number, nPerSet: number) => {
  var sets = new Array<string>();
  for (var x = 0; x < nSet; x++) {
    var numbers = "";
    for (var i = 0; i < nPerSet; i++) {
      numbers = numbers + Math.floor(Math.random() * 10);
    }
    sets.push(numbers);
  }
  return sets;
};

const FlashNumbers: React.FC<{
  flash: string[];
  secPerFlash: number;
  onDoneF: Function;
}> = props => {
  const [currentNumber, setCurrentNumber] = useState("");
  const [index, setIndex] = useState(0)

  const showNextNumber = (currentIndex: number) => {
    if (currentIndex < props.flash.length) {
      setIndex(currentIndex)
      setCurrentNumber(props.flash[currentIndex]);
      setTimeout(() => {
        showNextNumber(currentIndex + 1);
      }, props.secPerFlash * 1000);
    } else {
      props.onDoneF();
    }
  };
  useEffect(() => {
    showNextNumber(0);
  }, [props.flash.length]);
  const indexText = (index+1) + '/' + props.flash.length
  return (
    <div>
      <div className="currentNumber">{currentNumber}</div>     
      <p className="indexText">{indexText}</p>
    </div>
  );
};

interface ResultEntry {
  correct: string;
  user: string;
}

const getResult = (correctNumbers: string[], userInput: string) => {
  const resultArray = new Array<ResultEntry[]>();
  var totalN = 0;
  var correctN = 0;
  for (var x = 0; x < correctNumbers.length; x++) {
    const set = correctNumbers[x];
    const setResult = new Array<ResultEntry>();
    for (var y = 0; y < set.length; y++) {
      const i = x * set.length + y;
      const r = { correct: correctNumbers[x][y], user: userInput[i] };
      setResult.push(r);
    }
    totalN++;
    const allCorrect = setResult.every(rE => {
      return rE.correct === rE.user;
    });
    if (allCorrect) correctN++;
    resultArray.push(setResult);
  }
  return {
    resultArray,
    totalN,
    correctN
  };
};

const App: React.FC = () => {
  const [gameState, setGameState] = useState(GameState.Setup);
  const [nOfSets, setNOfSets] = useState(5);
  const [nPerSet, setNPerSet] = useState(2);
  const [secPerFlash, setSecPerFlash] = useState(2);
  const [correctNumbers, setCorrectNumbers] = useState(new Array<string>());
  const [userInput, setUserInput] = useState("");
  const [userinputStartTimestamp, setUserinputStartTimestamp] = useState(0);
  const [userinputStopTimestamp, setUserinputStopTimestamp] = useState(0);

  const onStartGame = () => {
    setCorrectNumbers(makeRandomNumbers(nOfSets, nPerSet));
    setGameState(GameState.ShowNumbers);
  };

  const onFlashDone = () => {
    setUserinputStartTimestamp(Date.now())
    setGameState(GameState.UserInput);
  };

  const onUserInputDone = () => {
    setUserinputStopTimestamp(Date.now())
    setGameState(GameState.Score);
  };

  const goToSetup = () => {
    setGameState(GameState.Setup);
  };

  const inputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    handlerF: Function
  ) => {
    handlerF(e.target.value);
  };

  var stateContent = <p>Error: Unknown State</p>;
  switch (gameState) {
    case GameState.Setup:
      stateContent = (
        <div>
          <p>Numerosettien määrä:</p>
          <input
            value={nOfSets}
            type="number"
            onChange={e => inputChangeHandler(e, setNOfSets)}
          />
          <p>Numerosetin pituus:</p>
          <input
            disabled={true}
            value={nPerSet}
            type="number"
            onChange={e => inputChangeHandler(e, setNPerSet)}
          />
          <p>Välähdyksen pituus sekunneissa:</p>
          <input
            value={secPerFlash}
            type="number"
            onChange={e => inputChangeHandler(e, setSecPerFlash)}
          />
          <button onClick={onStartGame}>Aloita</button>
        </div>
      );
      break;
    case GameState.ShowNumbers:
      stateContent = (
        <FlashNumbers
          flash={correctNumbers}
          secPerFlash={secPerFlash}
          onDoneF={onFlashDone}
        ></FlashNumbers>
      );
      break;
    case GameState.UserInput:
      stateContent = (
        <div>
          <p>Kirjoita numero:</p>
          <input
            type="text"
            onChange={e => inputChangeHandler(e, setUserInput)}
          />
          <button onClick={onUserInputDone}>Tarkista</button>
        </div>
      );
      break;
    case GameState.Score:
      const result = getResult(correctNumbers, userInput);
      const headerCols = [
        <div className="col">Setti</div>,
        <div className="col">Oikea</div>,
        <div className="col">Vastaus</div>
      ];
      const header = (
        <div key={"-Header"} className="flex-grid-thirds grid-header">
          {headerCols}
        </div>
      );
      const resultHTML = result.resultArray.map((r, x) => {
        const cols = [];
        cols.push(<div className="col">{x + 1}</div>);
        cols.push(<div className="col">{r.map(set => set.correct)}</div>);
        const allCorrect = r.every(rE => {
          return rE.correct === rE.user;
        });
        const className = allCorrect ? "correctResponse" : "failedResponse";
        cols.push(
          <div className="col">
            {r.map(set => {
              return <span className={className}>{set.user}</span>;
            })}
          </div>
        );
        return (
          <div key={"-" + x} className="flex-grid-thirds">
            {cols}
          </div>
        );
      });
      stateContent = (
        <div>
          <div>
            <p>Tulokset:</p>
            {header}
            {resultHTML}
            <p className="resultText">
              Oikein: {result.correctN}/{result.totalN} -{" "}
              {((result.correctN / result.totalN) * 100).toFixed(2)}%
              {` - kesto: ${(userinputStopTimestamp-userinputStartTimestamp)/1000} sekunttia`}
            </p>
          </div>
          <button onClick={goToSetup}>Aloita Alusta</button>
        </div>
      );
      break;
  }

  return (
    <div>
      <a href="https://www.muistamisentaito.fi/" >
      <img id="logo" src={logo} alt="Muistamisen taito logo" />
      </a>
      <div className="App">
        <h2>Muistipeli</h2>
        {stateContent}
      </div>
  </div>  
  );
};

export default App;
