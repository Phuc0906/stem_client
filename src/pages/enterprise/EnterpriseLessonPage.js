import React, {useEffect, useState} from "react";
import axios from "axios";
import {fi} from "date-fns/locale";
import LessonRegistrationForm from "../../components/form/LessonRegistrationForm";
import {base64ToFile, downloadFile} from "../../components/utils/utils";

const EnterpriseLessonPage = () => {
    const [isPhone, setIsPhone] = useState(false);
    const [file, setFile] = useState(null);
    const [isAddLesson, setIsAddLesson] = useState(false);
    const [lessons, setLessons] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [updateLesson, setUpdateLesson] = useState({
        name: '',
        level: '',
    })

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
        axios.get(`${process.env.REACT_APP_API_URL}api/lesson`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.ocean_education_token,
            }
        }).then(res => {
            setLessons(res.data);
        })
    }, [])


    const RowBuilder = ({lesson, idx}) => {

        const onUpdateClick = () => {
            setUpdateLesson(lesson);
            setIsUpdate(true);
            setIsAddLesson(true);
        }

        const onDownloadClick = () => {
            axios.get(`${process.env.REACT_APP_API_URL}api/lesson/get-file?name=${lesson.id}.${lesson.fileId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.ocean_education_token,
                }
            }).then(res => {
                downloadFile(base64ToFile(res.data), `${lesson.name}.${lesson.fileId}`);

            })
        }

        const onDeleteHandle = () => {
            axios.delete(`${process.env.REACT_APP_API_URL}api/lesson?id=${lesson.id}`,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.ocean_education_token,
                }
            }).then(res => {
                console.log(res);
            }).catch(err => {
                alert("Bai hoc dang duoc su dung trong lop hoc")
            })
        }

        return <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
            <td className="whitespace-nowrap px-6 py-4 font-medium">{idx + 1}</td>
            <td className="whitespace-nowrap px-6 py-4">{lesson.name}</td>
            <td className="whitespace-nowrap px-6 py-4">{lesson.fileId}</td>
            <td className="whitespace-nowrap px-6 py-4">{lesson.level}</td>
            <td className="whitespace-nowrap px-6 py-4">
                <div className="flex gap-4">
                    <div onClick={onUpdateClick} className="w-fit px-3.5 bg-green-200 text-center py-1.5 rounded-xl hover:bg-gray-100 active:bg-green-500 cursor-pointer">
                        Chỉnh sua
                    </div>
                    <div onClick={onDownloadClick} className="w-fit px-3.5 bg-blue-200 text-center py-1.5 rounded-xl hover:bg-gray-100 active:bg-blue-400 active:text-white cursor-pointer">
                        Tải file
                    </div>
                    <div onClick={onDeleteHandle} className="w-fit px-3.5 bg-red-400 text-center py-1.5 rounded-xl hover:bg-gray-100 active:bg-red-700 active:text-white cursor-pointer">
                        Xoá
                    </div>
                </div>

            </td>
        </tr>
    }

    return <div className={`pl-5 pt-10 w-full ${!isPhone ? 'fixed left-28' : ''}  overflow-auto h-screen`}>
        <label className={'text-3xl font-bold'}>Bài Hoc</label>
        <div className="mt-2 ">
            <div onClick={() => {
                setIsAddLesson(true)
            }} className="bg-green-200 w-fit p-1.5 rounded-xl hover:bg-green-500 active:bg-green-800 cursor-pointer">
                Them bai hoc
            </div>
        </div>

        <div>
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-left text-sm font-light">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                <tr>
                                    <th scope="col" className="px-6 py-4">#</th>
                                    <th scope="col" className="px-6 py-4">Tên Bài Học</th>
                                    <th scope="col" className="px-6 py-4">Loại file</th>
                                    <th scope="col" className="px-6 py-4">Công cụ</th>
                                    <th scope="col" className="px-6 py-4"></th>
                                </tr>
                                </thead>
                                <tbody>
                                {lessons.map((lesson, index) => <RowBuilder lesson={lesson} idx={index} key={index} />)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {isAddLesson ? <LessonRegistrationForm setIsAddLesson={setIsAddLesson} isUpdate={isUpdate} setIsUpdate={setIsUpdate} lesson={updateLesson} /> : null}
    </div>
}

export default EnterpriseLessonPage;