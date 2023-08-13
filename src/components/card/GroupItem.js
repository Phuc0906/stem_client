import React, {useEffect, useState} from "react";
import {id} from "date-fns/locale";

const GroupItem = ({students, idx, setStudents, selectedStudent, setSelectedStudent}) => {
    const [isViewGroup, setIsViewGroup] = useState(false);
    const [isSelectedStudent, setIsSelectedStudent] = useState(false);
    const [studentSelectedLabel, setStudentSelectedLabel] = useState("");
    const [studentSelectedId, setStudentSelectedId] = useState(0);
    const [studentObj, setStudentObj] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [groupName, setGroupName] = useState('Ten nhom');

    useEffect(() => {
        if (selectedStudent[idx].length != 0) {
            setGroupName(selectedStudent[idx][0].name);
        }
    }, [selectedStudent])

    const StudentBuilder = ({student}) => {
        const handleSelectStudent = () => {
            console.log(student.name);
            setStudentSelectedLabel(student.name);
            setStudentSelectedId(student.id);
            setIsSelectedStudent(!isSelectedStudent);
            setStudentObj(student);
        }

        return <div onClick={handleSelectStudent} className="cursor-pointer hover:bg-gray-300 p-3 rounded-md">
            {student.name}
        </div>
    }

    useEffect(() => {
        console.log(students);
    }, [students])

    useEffect(() => {
        console.log(selectedStudent)
    }, [selectedStudent])



    const GroupStudentBuilder = ({student}) => {
        const removeStudentHandle = () => {
            console.log("delete id: " + student.id);
            console.log(selectedStudent[idx]);
            let baseSelected = selectedStudent;
            baseSelected[idx] = selectedStudent[idx].filter(studentIdx => {
                console.log("Comapare id: " + studentIdx.id);
                return studentIdx.id !== student.id
            });
            console.log(baseSelected);
            setSelectedStudent(baseSelected);
            setStudents(prevStudents => [...prevStudents, student.studentObj]);
        }

        return <div className="flex gap-3 items-center">
            <label>{student.studentObj.name}</label>
            <div onClick={removeStudentHandle}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-5 h-5 hover:fill-blue-200">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
            </div>
        </div>
    }

    useEffect(() => {
        if (selectedStudent[idx].length != 0) {
            const baseArr = selectedStudent;
            baseArr[idx][0].name = groupName;
            setSelectedStudent(baseArr);
            console.log(baseArr);
        }
    }, [groupName]);

    const addToGroupHandle = () => {
        const newStudentArr = students.filter(student => student.id !== studentSelectedId);
        setStudents(newStudentArr);
        const tempSelectedStudent = selectedStudent;
        tempSelectedStudent[idx].push({
            name: groupName,
            id: studentSelectedId,
            studentObj: studentObj
        });
        console.log(tempSelectedStudent);
        setSelectedStudent(tempSelectedStudent);
        setStudentSelectedLabel("");
        setStudentSelectedId(0);
        setStudentObj(null);
    }

    return <div className="mt-4">
        <div className={`border-2 border-gray-200 w-full p-5 flex gap-5 items-center hover:bg-gray-100 ${isViewGroup ? 'bg-gray-100' : 'bg-white'} justify-between`}>
            <div className="flex gap-5 items-center">

                <div onClick={() => setIsViewGroup(!isViewGroup)} className={`${isViewGroup ? 'rotate-90' : 'rotate-0'} transition duration-300`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                </div>
                <div className="w-full flex items-center gap-4">
                    {isEditing ? <div className="border-2 border-gray-100">
                        <input onChange={(e) => {
                            setGroupName(e.target.value);
                        }} type={"text"} value={groupName} className="w-full h-full p-2" style={{outline: 'none'}}/>
                    </div>: <label className="text-2xl text-purple-950 ">{groupName}</label>}
                    <div onClick={() => {
                        setIsEditing(!isEditing);
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.0} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className={`flex gap-5 items-center ${isViewGroup ? 'appearance-none' : ''} transition duration-300`}>
                <div className="text-md">
                    <label>{selectedStudent[idx].length} students</label>
                </div>
                {selectedStudent[idx].length >= 3 ? <div className="text-md text-red-800">
                    <label>Full</label>
                </div> : null}
            </div>
        </div>
        <div
            className={`${
                isViewGroup ? 'transition ease-out duration-300 opacity-100' : 'transition ease-in duration-200 opacity-0 hidden'
            }  w-full p-5 bg-white border-b-2 border-l-2 border-r-2 border-gray-200 `}
        >
            {selectedStudent[idx].length < 3 ? <div className="mb-5 p-4 w-fit relative">
                <div className="flex items-center gap-4">
                    <div onClick={() => setIsSelectedStudent(!isSelectedStudent)} className="border-2 border-gray-400 p-2 flex gap-3">
                        <div className="pr-2 border-r-2 border-r-gray-700">
                            <div className={` duration-300 transition ${isSelectedStudent ? 'rotate-180' : 'rotate-0'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
                                </svg>
                            </div>
                        </div>
                        <div>
                            <label>{studentSelectedLabel.length !== 0 ? studentSelectedLabel : 'Select Student'}</label>
                        </div>
                    </div>
                    <div onClick={addToGroupHandle} className="bg-blue-400 p-2 rounded-xl hover:bg-blue-100">
                        <div>
                            Add Student
                        </div>
                    </div>
                </div>
                <div className={`z-10 absolute transition-opacity bg-white shadow-2xl shadow-gray-300 w-full mt-1.5 rounded-md flex flex-col gap-3
                    ${isSelectedStudent ? '  ease-out duration-300 opacity-100 ' : 'ease-in duration-200 opacity-0 -z-10'}
                `}>
                    {students.map((student, index) => <StudentBuilder key={index} student={student} />)}
                </div>
            </div> : null}
            <div className="ml-5 mr-5">
                <div className="flex justify-around ">
                    {selectedStudent[idx].map((student, index) => <GroupStudentBuilder key={index} student={student} />)}
                </div>
            </div>
        </div>

    </div>
}

export default GroupItem;