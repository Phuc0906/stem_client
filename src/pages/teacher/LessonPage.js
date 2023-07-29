import React, {useEffect} from "react";
import {useLocation} from "react-router-dom";

const LessonPage = () => {
    const location = useLocation();
    const imageContent = require(`${location.state.data.content}`);

    useEffect(() => {
        console.log(location.state.data);
    }, [])


    return <div className="pl-5 pt-10 pr-5 w-full fixed left-28 overflow-auto h-screen overflow-auto">
        <img src={imageContent} />
    </div>;
}

export default LessonPage;