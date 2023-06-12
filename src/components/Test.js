import React, {useEffect, useState} from "react";
import axios from "axios";


const Test = () => {


    const path = './lesson_screen/sec1-1.png';
    const img = require(`${path}`);

    return <div className="pl-5 pt-10 pr-5 w-full fixed left-28 overflow-auto h-screen overflow-auto">
        <img src={img} />
    </div>;
}

export default Test;