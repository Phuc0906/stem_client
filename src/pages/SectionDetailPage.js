import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import axios from "axios";
import {planDataDetail, planDataLessons} from "../components/lego_lesson_unit/unit_data/plan_unit_data";
import UnitCard from "../components/lego_lesson_unit/unit_frame/UnitCard";

const SectionDetailPage = () => {
    const location = useLocation();
    const idx = location.state.idx;
    const [sectionContent, setSectionContent] = useState(null);
    const [lessons, setLessons] = useState([]);

    useEffect(() => {
        console.log(location.state.data);
        setSectionContent(location.state.data);
        console.log(planDataLessons[idx]);

        axios.get('http://localhost:8080/api/web-scraping/section-lesson').then(res => {
            // console.log(JSON.stringify(res.data));
            console.log(JSON.stringify(res.data));
            setLessons(res.data[0])
        }).catch(err => {
            console.log(err);
        })
    }, [])

    return <div className="pl-5 pt-10 pr-5 w-5/6 fixed left-28 overflow-auto h-screen overflow-auto right-10">
        <div className="mb-10">
            {(sectionContent !== null ) ? <div>
                <div className="w-full bg-orange-400 ">
                    <img className="w-full" src={sectionContent.image}/>
                </div>
                <div className="ml-5 text-blue-300 text-lg">
                    <label>{sectionContent.tookKit}</label>
                </div>
                <div className="ml-5 text-black text-5xl font-bold">
                    <label>{sectionContent.name}</label>
                </div>
                <div className="ml-5 mt-6 text-lg w-4/5">
                    {planDataDetail[idx].paragraph.map((para, index) => <p key={index}>{para}</p>)}
                </div>
            </div> : null}
        </div>
        <div className="mb-10">
            <div className="flex flex-wrap gap-4 mb-8">
                {planDataLessons[idx].map((lesson, index) => <UnitCard lesson={lesson} idx={index} key={index} to={"/lesson"} />)}
            </div>
        </div>
    </div>
}

export default SectionDetailPage;