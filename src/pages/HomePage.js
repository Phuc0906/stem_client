import React, {useEffect} from "react";
import CourseCard from "../components/CourseCard";

const HomePage = () => {
    const arr = [0,0,0,0];

    useEffect(() => {
        localStorage.ocean_education_current_course_selected = "0";
    }, [])

    return <div className="flex">
        <div className="pl-5 pt-10 w-full fixed left-28 overflow-auto h-screen">
            <div className="border-b-2 border-b-gray-300 w-full">
                <label className="text-4xl text-green-600">Khoá Học</label>
            </div>
            <div className="mt-10 flex gap-6 flex-wrap mb-16">
                {arr.map((e,index) => <CourseCard key={index} />)}
            </div>
        </div>
    </div>
}

export default HomePage;