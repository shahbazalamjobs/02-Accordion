// Calculator.js

import React, { useEffect, useState } from 'react';
import Display from './Display';
import Button from './Button';

function Calculator() {
    const [input, setInput] = useState('');

    useEffect(() => {
        const handleKeyDown = (event) => {
            const { key } = event;
            if (!isNaN(key) || ['+', '-', '*', '/', '.'].includes(key)) {
                setInput((prevInput) => prevInput + key);
            } else if (key === 'Escape') {
                handleClick('C');
            } else if (key === 'Backspace') {
                setInput((prevInput) => prevInput.slice(0, -1));
            } else if (key === 'Enter') {
                evaluateExpression();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        // Return a cleanup function to remove the event listener
        // Note: Used arrow func to not execute immediately 
        
        return () => {          
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [input]);

    function evaluateExpression() {
        try {
            const result = eval(input);
            if (!isNaN(result)) {
                setInput(result.toString());
            } else {
                throw new Error('Invalid expression');
            }
        } catch (error) {
            setInput('Error: ' + error.message);
            console.error(error);
        }
    }

    function handleClick(value) {
        if (value === '=') {
            evaluateExpression();
        } else if (value === 'C') {
            setInput('');
        } else {
            setInput(prevInput => prevInput + value);
        }
    }


    return (
        <div className="calculator">
            <Display value={input} />
            <div className='buttons'>
                <Button onClick={handleClick}>8</Button>
                <Button onClick={handleClick}>7</Button>
                <Button onClick={handleClick}>9</Button>
                <Button onClick={handleClick}>+</Button>
                <Button onClick={handleClick}>4</Button>
                <Button onClick={handleClick}>5</Button>
                <Button onClick={handleClick}>6</Button>
                <Button onClick={handleClick}>-</Button>
                <Button onClick={handleClick}>1</Button>
                <Button onClick={handleClick}>2</Button>
                <Button onClick={handleClick}>3</Button>
                <Button onClick={handleClick}>*</Button>
                <Button onClick={handleClick}>C</Button>
                <Button onClick={handleClick}>0</Button>
                <Button onClick={handleClick}>=</Button>
                <Button onClick={handleClick}>/</Button>
            </div>
        </div>
    );
}

export default Calculator;

