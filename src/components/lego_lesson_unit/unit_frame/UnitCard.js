import React from "react";
import {Link} from "react-router-dom";

const UnitCard = ({lesson, idx, to}) => {


    return <div className="mt-6 shadow-gray-200 shadow-xl w-2/5 hover:shadow-2xl rounded-lg min-w-[400px] min-h-[380px]">
        <Link to={to} state={{data: lesson, idx: idx}}>
            <div className="w-full relative pb-24 rounded-t-lg">
                <div className="rounded-t-lg">
                    <img className="rounded-t-lg" src={lesson.image}/>
                </div>

                <div className="mt-7 flex flex-col gap-3  ml-3 mb-10">
                    <label className="text-3xl font-bold">{lesson.name}</label>
                    <label className="text-xl text-blue-300">{lesson.tookKit}</label>
                    <label className="text-lg">{lesson.briefDescription}</label>
                </div>

                <div className="absolute bottom-16 w-full">
                    <div className="flex ml-5 mr-5 flex-row justify-between relative">
                        <div className="text-blue-400">
                            <label>{lesson.category}</label>
                        </div>
                        <div>
                            <label>{lesson.grade}</label>
                        </div>
                    </div>
                </div>

                <div className="absolute top-0 right-0 left-0 bg-gray-200 bg-opacity-50 p-2 text-lg rounded-t-lg">
                    <label>{lesson.lesson} lessons</label>
                </div>
            </div>
        </Link>

    </div>
}

export default UnitCard;