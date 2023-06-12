import React from "react";
import {Link} from "react-router-dom";

const CourseCard = () => {
    return <Link to="/course" className="shadow-2xl shadow-gray-300 hover:shadow-gray-600 w-fit h-fit min-w-[400px] min-h-[380px] rounded-xl">
        <div className="bg-blue-400 w-full h-[195px] rounded-t-xl">
        </div>
        <div className="ml-4 mt-4">
            <div className="">
                <label className="text-xl">Tên Khoá Học</label>
            </div>
            <div className="">
                <label className="text-xl text-gray-400">Mã lớp</label>
            </div>
        </div>
    </Link>
}

export default CourseCard;