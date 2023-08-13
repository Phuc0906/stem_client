import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {id} from "date-fns/locale";
import {Document} from "react-pdf";

const CurriculumItem = ({idx, course, setLessionAllocated, lessonAllocated, title, isUpdate, lessons, setLessons, setAppendObj, actualLessons}) => {
    const [isSelectingLesson, setIsSelectingLesson] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState(((actualLessons.lessons[0] !== null) && (actualLessons.lessons[0] !== undefined)) ? actualLessons.lessons[0].name : '');
    const [selectedLessonObject, setSelectedLessonObject] = useState(null);

    useEffect(() => {
        console.log(actualLessons);
    }, [])


    const LessonSelection = ({lesson}) => {
        const onSelectHandle = () => {
            setLessons(lessons.filter(filteredLesson => ((filteredLesson.id !== lesson.id))));
            let lssA = [...lessonAllocated];
            lssA[idx] = lesson.id;
            console.log(lssA);
            setLessionAllocated(lssA);

            setIsSelectingLesson(false);
            setSelectedLesson(lesson.name);
            if (selectedLessonObject !== null) {
                setAppendObj(selectedLessonObject);
            }
            setSelectedLessonObject(lesson);
        }

        return <div onClick={onSelectHandle}  className="hover:bg-gray-100 px-4 py-2 rounded-b-xl">
            <label>{lesson.name}</label>
        </div>
    }

    const DocumentBuilder = ({lesson}) => {
        return <Link to={"/lecture"} state={{lesson: lesson, course: course, idx: idx}} className="flex items-center gap-4">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                </svg>
            </div>
            <div>
                <div>
                    <label>{lesson.name}</label>
                </div>
            </div>
        </Link>
    }

    return <div className="mr-5 rounded-xl border-2 my-4">
        <div className="p-4 text-black text-2xl bg-gray-300 rounded-t-xl flex justify-between items-center">
            <div>
                <label>{title}</label>
            </div>
        </div>
        {!isUpdate ? <div >
            <div className="p-5 hover:bg-gray-100 text-black text-xl bg-transparent hover:underline  gap-4">
                {actualLessons.lessons.map((lesson, index) => {
                    if (lesson !== null) {
                        return <DocumentBuilder lesson={lesson} key={index} />
                    }
                })}
            </div>
        </div> : <div>
            <div className="p-5 text-black text-xl flex items-center gap-4 ">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                    </svg>
                </div>
                <div>
                    <div className="w-full relative">
                        <div onClick={() => {setIsSelectingLesson(true)}} className="w-full border-2 border-gray-200 rounded-xl">
                            <input className="bg-transparent w-full h-full p-2" value={selectedLesson} style={{outline: 'none'}}  />
                        </div>
                        {isSelectingLesson ? <div className="absolute  border-2 border-gray-200 bg-white w-fit mt-3 rounded-xl">
                            {lessons.map((lesson, index) => <LessonSelection lesson={lesson} key={index} />)}
                        </div> : null}
                    </div>
                </div>
            </div>
        </div>}


    </div>
}

export default CurriculumItem;