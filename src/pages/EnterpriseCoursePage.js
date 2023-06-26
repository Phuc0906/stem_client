import React, {useEffect, useState} from "react";
import CourseCard from "../components/CourseCard";

const EnterpriseCoursePage = () => {
    const [arr, setArr] = useState([]);
    const [isPhone, setIsPhone] = useState(false);

    useEffect(() => {
        if (window.innerWidth < 900) {
            setIsPhone(true);
        }else {
            setIsPhone(false);
        }
    }, [])

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 700) {
                setIsPhone(true);
            }else {
                setIsPhone(false);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])


    useEffect(() => {
        localStorage.ocean_education_current_course_selected = "0";
    }, [])



    return <div className="flex">
        <div className={`pl-5 pt-10 w-5/6 ${!isPhone ? 'fixed left-28' : ''}  overflow-auto h-screen`}>
            <div className="border-b-2 border-b-gray-300 w-full flex justify-between mr-5 pb-3">
                <div>
                    <label className="text-4xl text-green-600">Khoá Học</label>
                </div>
                <div>
                    <div className="cursor-pointer bg-purple-300 p-2 rounded-xl hover:bg-gray-200 active:bg-gray-600">
                        <label>Them Khoa Hoc</label>
                    </div>
                </div>
            </div>
            <div className="mt-10 flex gap-6 flex-wrap mb-16">
                {arr.map((e,index) => <CourseCard key={index} />)}
            </div>
        </div>
    </div>
}

export default EnterpriseCoursePage;