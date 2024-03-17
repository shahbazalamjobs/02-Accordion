// Display.js

import React from "react";

function Display({ value }) {

    return (
        <input className="display" type="text" name="display" value={value} readOnly />
    );
};

export default Display;