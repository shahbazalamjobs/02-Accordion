
// Calculator.jsx

import React, { useState, useEffect } from "react";

function Calculator() {

    const [input, setInput] = useState('');

    function Display() {
        return (
            <input className="display" name="display" type="text" value={input} readOnly />
        );
    }

    function Button({ children, onClick }) {
        return (
            <button onClick={() => onClick(children)}> {children} </button>
        );
    }

    function evaluateExpression() {
        try {
            const result = eval(input);
            if (!isNaN(result)) {
                setInput(result.toString());
            }
            else {
                throw new Error('Wrong Expression');
            }
        }
        catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            const { key } = e;
            if (!isNaN(key) || ['+', '-', '*', '/', '.'].includes(key)) {
                setInput(prevInput => prevInput + key)
            }
            else if (key === 'Enter') {
                evaluateExpression();
            }
            else if (key === 'Escape') {
                setInput('');
            }
            else if (key === 'Backspace') {
                setInput(input.slice(0, -1))
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => (
            window.removeEventListener('keydown', handleKeyDown)
        );
    }, [input]);


    const handleClick = (value) => {
        if (value === '=') {
            evaluateExpression();
        }
        else if (value === 'C') {
            setInput('')
        }
        else {
            {
                setInput(prevInput => prevInput + value);
            }
        }

    }


    return (
        <div className='calculator'>
            <Display />
            <div className="buttons">
                <Button className='button' onClick={handleClick}>7</Button>
                <Button className='button' onClick={handleClick}>8</Button>
                <Button className='button' onClick={handleClick}>9</Button>
                <Button className='button' onClick={handleClick}>/</Button>
                <Button className='button' onClick={handleClick}>4</Button>
                <Button className='button' onClick={handleClick}>5</Button>
                <Button className='button' onClick={handleClick}>6</Button>
                <Button className='button' onClick={handleClick}>*</Button>
                <Button className='button' onClick={handleClick}>1</Button>
                <Button className='button' onClick={handleClick}>2</Button>
                <Button className='button' onClick={handleClick}>3</Button>
                <Button className='button' onClick={handleClick}>-</Button>
                <Button className='button' onClick={handleClick}>C</Button>
                <Button className='button' onClick={handleClick}>0</Button>
                <Button className='button' onClick={handleClick}>+</Button>
                <Button className='button' onClick={handleClick}>=</Button>
            </div>
        </div>
    );
}

export default Calculator;