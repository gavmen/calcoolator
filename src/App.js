import './App.css';
import './reset.scss';
import React, { useState, useEffect } from 'react';
import './main.scss';

const App = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [currentValue, setCurrentValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [theme, setTheme] = useState('theme1');

  const handleNumberClick = (num) => {
    if (waitingForOperand) {
      setDisplayValue(num);
      setWaitingForOperand(false);
    } else {
      const newValue = displayValue === '0' ? num : displayValue + num;
  
      if (newValue.replace('.', '').length <= 9) {
        setDisplayValue(newValue);
      }
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
    setCurrentValue(null);
    setOperator(null);
  
    const roundedResult = parseFloat(result.toFixed(5));
    setDisplayValue(String(roundedResult));
  
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
      } else if (key === '.') {
        handleNumberClick(key);
      } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        if (operator === null) {
          setCurrentValue(parseFloat(displayValue));
          setOperator(key);
          setWaitingForOperand(true);
        } else {
          handleEqualClick();
          setOperator(key);
          setWaitingForOperand(true);
        }
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
  }, [displayValue, operator]);

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  return (
    <div className={`calculator__container ${theme}`}>
      <div className={`calculator ${theme}`}>
        <h2>Calcool8)r</h2>
        <div className="theme-switch">
          <label>
            <div className="option">
              <input
                type="radio"
                name="theme"
                value="theme1"
                checked={theme === 'theme1'}
                onChange={handleThemeChange}
              />
              <div className="btn"><span>Theme 1</span></div>
            </div>
            {/* Theme 1 */}
          </label>
          <label>
            <div className="option">
              <input
                type="radio"
                name="theme"
                value="theme2"
                checked={theme === 'theme2'}
                onChange={handleThemeChange}
              />
              <div className="btn"><span>Theme 2</span></div>
            </div>
            {/* Theme 2 */}
          </label>
          <label>
            <div className="option">
              <input
                type="radio"
                name="theme"
                value="theme3"
                checked={theme === 'theme3'}
                onChange={handleThemeChange}
              />
              <div className="btn"><span>Theme 3</span></div>
            </div>
            {/* Theme 3 */}
          </label>
        </div>
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
    </div>
  );
};


export default App;
