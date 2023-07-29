import React from "react";
import {Link} from "react-router-dom";

const CourseCard = ({course, isEnterprise, setCourse, setIsAddCourse, setIsUpdate}) => {
    if (!isEnterprise) {
        return <Link to="/course" className="shadow-2xl shadow-gray-300 hover:shadow-gray-600 w-fit h-fit min-w-[400px] min-h-[380px] rounded-xl">
            <div className="bg-blue-400 w-full h-[195px] rounded-t-xl">
            </div>
            <div className="ml-4 mt-4">
                <div className="">
                    <label className="text-xl">{course.name}</label>
                </div>
                <div className="">
                    <label className="text-xl text-gray-400">{course.classCode}</label>
                </div>
                <div className="">
                    <label className="text-xl text-gray-400">Giao Vien: {course.teacherName}</label>
                </div>
            </div>
        </Link>
    }else {
        return <div onClick={() => {
            setCourse(course);
            setIsAddCourse(true);
            setIsUpdate(true);
        }
        } className="shadow-2xl shadow-gray-300 hover:shadow-gray-600 w-fit h-fit min-w-[400px] min-h-[380px] rounded-xl">
            <div className="bg-blue-400 w-full h-[195px] rounded-t-xl">
            </div>
            <div className="ml-4 mt-4">
                <div className="">
                    <label className="text-xl">{course.name}</label>
                </div>
                <div className="">
                    <label className="text-xl text-gray-400">{course.classCode}</label>
                </div>
                <div className="">
                    <label className="text-xl text-gray-400">Giao Vien: {course.teacherName}</label>
                </div>
            </div>
        </div>
    }
}

export default CourseCard;