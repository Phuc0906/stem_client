import React, {useEffect, useState} from "react";
import axios from "axios";
import {fi} from "date-fns/locale";

const LessonRegistrationForm = ({setIsAddLesson, isAddLesson, setIsUpdate, isUpdate, lesson}) => {
    const [isSelectingLevel, setIsSelectingLevel] = useState(false);
    const [lessonId, setLessonId] = useState(isUpdate ? lesson.id : 0);
    const [levels, setLevels] = useState([]);
    const [level, setLevel] = useState(isUpdate ? lesson.level : '');
    const [lessonName, setLessonName] = useState(isUpdate ? lesson.name : '');
    const [lessonFile, setLessonFile] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);


    useEffect(() => {



        axios.get(`${process.env.REACT_APP_API_URL}api/curriculum`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.ocean_education_token,
            }
        }).then(res => {
            const levelData = res.data;
            levelData.push({name: 'ALL'})
            setLevels(res.data);
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        });


    }, [])

    const LevelSelection = ({setLevel, baseLevel}) => {

        const onSelectHandle = () => {
            setLevel(baseLevel);
            setIsSelectingLevel(false);
        }

        return <div onClick={onSelectHandle}  className="hover:bg-gray-100 px-4 py-2 rounded-b-xl">
            <label>{baseLevel}</label>
        </div>
    }

    function getFileExtension(filename) {
        const extensionRegex = /\.([0-9a-z]+)$/i;
        const match = extensionRegex.exec(filename);
        return match ? match[1] : ''; // Return an empty string if there's no match
    }

    const addLessonHandle = () => {
        const fileData = new FormData();
        fileData.append("file", lessonFile);
        const pdfData = new FormData();
        pdfData.append("file", pdfFile);
        if (!isUpdate) {
            axios.post(`${process.env.REACT_APP_API_URL}api/lesson`, {
                name: lessonName,
                fileExtension: getFileExtension(lessonFile.name),
                curriculum: level
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.ocean_education_token,
                }
            }).then(res => {
                axios.post(`${process.env.REACT_APP_API_URL}api/lesson/${res.data.lesson_id}/${getFileExtension(lessonFile.name)}/lesson/upload`, fileData, {
                    headers: {
                        Authorization: "Bearer " + localStorage.ocean_education_token,
                    }
                }).then(resp => {
                    console.log(resp);
                    axios.post(`${process.env.REACT_APP_API_URL}api/lesson/${res.data.lesson_id}/${getFileExtension(pdfFile.name)}/lesson/upload`, pdfData, {
                        headers: {
                            Authorization: "Bearer " + localStorage.ocean_education_token,
                        }
                    }).then(res => {
                        console.log(res)
                        setIsAddLesson(false);
                        window.location.reload();
                    }).catch(err => {
                        console.log(err)
                    })
                }).catch(err => {
                    console.log(err)
                })


            });
        }else {
            axios.put(`${process.env.REACT_APP_API_URL}api/lesson`, {
                id: lessonId,
                name: lessonName,
                fileId: "",
                level: level
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.ocean_education_token,
                }
            }).then(res => {
                if (lessonFile !== null) {
                    axios.post(`${process.env.REACT_APP_API_URL}api/lesson/${lessonId}/${getFileExtension(lessonFile.name)}/lesson/upload`, fileData, {
                        headers: {
                            Authorization: "Bearer " + localStorage.ocean_education_token,
                        }
                    }).then(res => {
                        console.log(res);
                        if (pdfFile !== null ) {
                            axios.post(`${process.env.REACT_APP_API_URL}api/lesson/${lessonId}/${getFileExtension(pdfFile.name)}/lesson/upload`, pdfData, {
                                headers: {
                                    Authorization: "Bearer " + localStorage.ocean_education_token,
                                }
                            }).then(res => {
                                console.log(res)
                                setIsAddLesson(false);
                                window.location.reload();
                            }).catch(err => {
                                console.log(err)
                            })
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                }


            })
        }
    }

    return <div className="fixed inset-0 flex items-center justify-center opacity-100 ">
        <div className="w-1/2 h-fit overflow-auto bg-gray-50 border-2 border-gray-400 p-2 rounded-xl flex flex-col gap-4 relative pb-10 mt-10 mb-10 ">
            <label className="text-center text-3xl font-bold">Form Tạo Bài Học</label>
            <div className="">
                <div className="w-2/3 h-full bg-gray-100 border-2 border-gray-200">
                    <input onChange={(e) => {
                        setLessonName(e.target.value)
                    }} value={lessonName} type={"text"} className="w-full h-full bg-transparent py-2 px-3" placeholder={"Tên bài học"} style={{outline: 'none'}}/>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <label className="text-lg font-bold">File trình chiếu</label>
                <input onChange={(e) => {
                    setLessonFile(e.target.files[0]);
                }} type={"file"} placeholder="file bai hoc"/>
            </div>
            <div className="flex flex-col gap-3">
                <label className="text-lg font-bold">File PDF</label>
                <input onChange={(e) => {
                    setPdfFile(e.target.files[0]);
                }} type={"file"} placeholder="file bai hoc"/>
            </div>
            <div>
                <div className="flex w-full items-center justify-between pl-5 pr-8">
                    <label>Cấp bậc <span className="text-red-600">*</span></label>
                    <div className="w-4/5">
                        <div onClick={() => {setIsSelectingLevel(true)}} className="border-2 rounded-xl w-1/2">
                            <input onChange={(e) => {}} className="w-full h-full bg-transparent p-2" value={level}  type="text" style={{outline: 'none'}}/>
                        </div>
                        {isSelectingLevel ? <div className="fixed  border-2 border-gray-200 bg-white w-fit mt-3 rounded-xl">
                            {levels.map((level, index) => <LevelSelection baseLevel={level.name} setLevel={setLevel}  key={index} />)}
                        </div> : null}
                    </div>
                </div>
            </div>
            <div className="flex justify-between px-4">
                <div onClick={addLessonHandle} className="bg-blue-100 w-fit py-1.5 px-3 rounded-xl hover:bg-blue-200 active:bg-blue-400 cursor-pointer">
                    Thêm Bài Học
                </div>
                <div onClick={() => {
                    setIsAddLesson(false);
                }} className="bg-blue-100 w-fit py-1.5 px-3 rounded-xl hover:bg-blue-200 active:bg-blue-400 cursor-pointer">
                    Thoat
                </div>
            </div>
        </div>
    </div>
}

export default LessonRegistrationForm;