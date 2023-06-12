import React, {useEffect, useState} from "react";
import axios from "axios";
import {planData} from "./lego_lesson_unit/unit_data/plan_unit_data";
import UnitCard from "./lego_lesson_unit/unit_frame/UnitCard";

const LegoCurriculum = () => {
    const [currentContent, setCurrentContent] = useState(4);
    useEffect(() => {
        axios.get('http://localhost:8080/api/web-scraping/section-lesson').then(res => {
            // console.log(JSON.stringify(res.data));
        }).catch(err => {
            console.log(err);
        })

    }, [])

    const onLoadMoreClick = () => {
        if (currentContent + 4 <= planData.length + 1) {
            setCurrentContent(currentContent + 4);
        }
    }

    return <div className="w-full ml-5 mr-5 mb-10">
        <div className="text-4xl font-bold ">
            <label>Unit Plans </label>
        </div>
        <div className="flex flex-wrap gap-4 mb-8">
            {planData.map((lesson, index) => {
                if (index < currentContent) {
                    return <UnitCard key={index} idx={index} lesson={lesson} to={"/section"} />
                }
            })}
        </div>
        <div className="w-full flex justify-center">
            <div onClick={onLoadMoreClick} className="px-8 py-4 border-2 border-orange-300 hover:bg-orange-400">
                <label>Load More</label>
            </div>
        </div>
    </div>
}

export default LegoCurriculum;