// Button.jsx

import React from "react";

function Button({ children, onClick }) {
    return (
        <button onClick={() => onClick(children)}> { children } </button>
    );

};

export default Button;