import './App.css';
import React, { useState, useEffect } from 'react';
import './main.scss';

const App = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [currentValue, setCurrentValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const handleNumberClick = (num) => {
    if (waitingForOperand) {
      setDisplayValue(num);
      setWaitingForOperand(false);
    } else {
      setDisplayValue((prevValue) =>
        prevValue === '0' ? num : prevValue + num
      );
    }
  };

  const handleOperatorClick = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (currentValue == null) {
      setCurrentValue(inputValue);
    } else if (operator) {
      const result = performCalculation();
      setCurrentValue(result);
      setDisplayValue(String(result));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const performCalculation = () => {
    const prevValue = currentValue;
    const inputValue = parseFloat(displayValue);

    switch (operator) {
      case '+':
        return prevValue + inputValue;
      case '-':
        return prevValue - inputValue;
      case '*':
        return prevValue * inputValue;
      case '/':
        return prevValue / inputValue;
      default:
        return inputValue;
    }
  };

  const handleEqualClick = () => {
    if (!operator) return;

    const result = performCalculation();
    setCurrentValue(result);
    setDisplayValue(String(result));
    setOperator(null);
    setWaitingForOperand(true);
  };

  const handleClearClick = () => {
    setDisplayValue('0');
    setCurrentValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;

      if (/^[0-9]$/.test(key)) {
        handleNumberClick(key);
      } else if (key === '.' || key === ',') {
        handleNumberClick('.');
      } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        // Normalize the operator symbols
        const operator = {
          '*': '×',
          '/': '÷',
        }[key];

        handleOperatorClick(operator);
      } else if (key === 'Enter') {
        handleEqualClick();
      } else if (key === 'Escape') {
        handleClearClick();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }; // eslint-disable-next-line
  }, []);

  return (
    <div className="calculator">
      <div className="display">
        <div className="current-operation">
          {currentValue} {operator}
        </div>
        <div className="current-value">{displayValue}</div>
      </div>
      <button className="operator" onClick={() => handleOperatorClick('/')}>
        ÷
      </button>
      <button onClick={() => handleNumberClick('7')}>7</button>
      <button onClick={() => handleNumberClick('8')}>8</button>
      <button onClick={() => handleNumberClick('9')}>9</button>
      <button className="operator" onClick={() => handleOperatorClick('*')}>
        ×
      </button>
      <button onClick={() => handleNumberClick('4')}>4</button>
      <button onClick={() => handleNumberClick('5')}>5</button>
      <button onClick={() => handleNumberClick('6')}>6</button>
      <button className="operator" onClick={() => handleOperatorClick('-')}>
        -
      </button>
      <button onClick={() => handleNumberClick('1')}>1</button>
      <button onClick={() => handleNumberClick('2')}>2</button>
      <button onClick={() => handleNumberClick('3')}>3</button>
      <button className="operator" onClick={() => handleOperatorClick('+')}>
        +
      </button>
      <button onClick={() => handleNumberClick('0')}>0</button>
      <button onClick={() => handleNumberClick('.')}>.</button>
      <button className="equal" onClick={handleEqualClick}>
        =
      </button>
      <button className="clear" onClick={handleClearClick}>
        C
      </button>
    </div>
  );
};


export default App;
