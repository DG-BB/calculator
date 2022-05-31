import './App.css';
import {useState} from "react";

function App() {

    const CHAR_MODE_ADD = '+';
    const CHAR_MODE_SUB = '-';
    const CHAR_MODE_MULTIPLY = 'x';
    const CHAR_MODE_DIVIDE = '/';

    const CHAR_EQUAL = '=';

    const CHAR_NUM_DOT = '.';
    const CHAR_NUM_0 = '0';
    const CHAR_NUM_1 = '1';
    const CHAR_NUM_2 = '2';
    const CHAR_NUM_3 = '3';
    const CHAR_NUM_4 = '4';
    const CHAR_NUM_5 = '5';
    const CHAR_NUM_6 = '6';
    const CHAR_NUM_7 = '7';
    const CHAR_NUM_8 = '8';
    const CHAR_NUM_9 = '9';

    const calcMode = {
        plus: 0,
        minus: 1,
        multiply: 2,
        divide: 3
    }

    const [values, setValues] = useState([]);
    const [currentValue, setCurrentValue] = useState(CHAR_NUM_0);
    const [resetOnClick, setResetOnClick] = useState(false);

    const clickChar = (char) => {

        console.log(char);

        if (resetOnClick) {
            if (char === CHAR_EQUAL) return;

            setResetOnClick(false);
            if (isMathChar(char)) {
                setValues([currentValue]);
            } else {
                setValues([]);
            }
            setCurrentValue(char);
            return;
        }

        if (char === CHAR_NUM_DOT) {
            if (currentValue.split(char).length >= 2) return;
            if (isMathChar(currentValue)) return;

            setCurrentValue(currentValue + char);
            return;
        }

        if (char === CHAR_EQUAL) {
            submitChar(currentValue);
            submitChar(char);
            setCurrentValue(calcValues(values) + '');
            setResetOnClick(true);
            return;
        }

        if (isNumberChar(char)) {

            if (isMathChar(currentValue) && isNumberChar(char)) {
                submitChar(currentValue);
                setCurrentValue(char);
                return;
            }

            if (char === CHAR_NUM_0) {
                if (currentValue.startsWith(char)) return;
            }

            if (currentValue === undefined || currentValue === CHAR_NUM_0) {
                setCurrentValue(char);
            } else {
                setCurrentValue(currentValue + '' + char);
            }
            return;
        }

        if (isMathChar(char)) {

            if (currentValue === CHAR_NUM_DOT) return;

            if (isMathChar(currentValue) && isMathChar(char)) {
                setCurrentValue(char);
                return;
            }

            submitChar(currentValue);
            setCurrentValue(char);
            return;
        }

    }

    const isMathChar = (char) => {
        return char === CHAR_MODE_ADD || char === CHAR_MODE_SUB || char === CHAR_MODE_MULTIPLY || char === CHAR_MODE_DIVIDE;
    }
    const isNumberChar = (char) => {
        return char === CHAR_NUM_0 || char === CHAR_NUM_1 || char === CHAR_NUM_2 || char === CHAR_NUM_3 || char === CHAR_NUM_4 || char === CHAR_NUM_5
            || char === CHAR_NUM_6 || char === CHAR_NUM_7 || char === CHAR_NUM_8 || char === CHAR_NUM_9;
    }

    const submitChar = (char) => {
        values.push(char);
        setValues(values);
    }

    const resetValues = () => {
        setValues([]);
        setCurrentValue(CHAR_NUM_0);
    }

    const calcValues = (values) => {
        let i = 0;
        let c = calcMode.plus;

        values.forEach((value) => {
            switch (value) {
                case CHAR_MODE_ADD:
                    c = calcMode.plus;
                    break;
                case CHAR_MODE_SUB:
                    c = calcMode.minus;
                    break;
                case CHAR_MODE_MULTIPLY:
                    c = calcMode.multiply;
                    break;
                case CHAR_MODE_DIVIDE:
                    c = calcMode.divide;
                    break;
                case CHAR_EQUAL:
                    break;
                default: {
                    switch (c) {
                        case calcMode.plus: {
                            i += Number(value);
                            break;
                        }
                        case calcMode.minus: {
                            i -= Number(value);
                            break;
                        }
                        case calcMode.multiply: {
                            i *= Number(value);
                            break;
                        }
                        case calcMode.divide: {
                            i /= Number(value);
                            break;
                        }
                        default: {
                            break;
                        }
                    }
                }
            }
        });

        return i;
    }

    return (
        <div className="calculator">
            <div className="vertical calculator-display">

                <div className="horizontal display-type-line">
                    {values.map((value) => <p key={"NUM" + (Math.random() * 100) + "_" + value}
                                              className="value">{value}</p>)}
                    <p className="value">{currentValue}</p>
                </div>
                <p className="last-value">{currentValue}</p>
            </div>

            <div>
                <button onClick={() => resetValues()} className="calculator-button clear bigH">AC</button>
                <button onClick={() => clickChar('/')} className="calculator-button">/</button>
                <button onClick={() => clickChar('x')} className="calculator-button">x</button>
            </div>
            <div>
                <button onClick={() => clickChar('7')} className="calculator-button numpad">7</button>
                <button onClick={() => clickChar('8')} className="calculator-button numpad">8</button>
                <button onClick={() => clickChar('9')} className="calculator-button numpad">9</button>
                <button onClick={() => clickChar('-')} className="calculator-button">-</button>
            </div>
            <div>
                <button onClick={() => clickChar('4')} className="calculator-button numpad">4</button>
                <button onClick={() => clickChar('5')} className="calculator-button numpad">5</button>
                <button onClick={() => clickChar('6')} className="calculator-button numpad">6</button>
                <button onClick={() => clickChar('+')} className="calculator-button">+</button>
            </div>

            <div className="horizontal">
                <div>
                    <div>
                        <button onClick={() => clickChar('1')} className="calculator-button numpad">1</button>
                        <button onClick={() => clickChar('2')} className="calculator-button numpad">2</button>
                        <button onClick={() => clickChar('3')} className="calculator-button numpad">3</button>
                    </div>
                    <div>
                        <button onClick={() => clickChar('0')} className="calculator-button numpad bigH">0</button>
                        <button onClick={() => clickChar('.')} className="calculator-button numpad">.</button>
                    </div>
                </div>
                <button onClick={() => clickChar('=')} className="calculator-button calc bigV">=</button>
            </div>

        </div>
    );
}

export default App;
