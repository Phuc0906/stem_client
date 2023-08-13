import React, {useEffect, useState} from "react";
import GroupItem from "../card/GroupItem";
import axios from "axios";

const Group = ({students, setStudents, numberOfGroup, setNumberOfGroup, groupArr, setGroupArr, selectedStudents, setSelectedStudents, course}) => {
    const [isAddGroup, setIsAddGroup] = useState(false);
    const [updateToDB, setUpdateToDB] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}api/class-type/group?id=${course.id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.ocean_education_token,
            }
        }).then(res => {
            console.log(res);
            setSelectedStudents(res.data);
            // window.location.reload();
        }).catch(err => {
            console.log(err);
        })
    }, [])

    const addGroupHandle = () => {
        const arr = Array.from({ length: numberOfGroup }, (_, index) => index + 1)
        setIsAddGroup(false);
        setGroupArr(prevGroup => [...prevGroup, ...arr])
        let tempSelectedStudent = selectedStudents;
        const addGroupArr = Array.from({ length: numberOfGroup }, () => Array.from({length: 0}, () => ""))
        tempSelectedStudent = tempSelectedStudent.concat(addGroupArr);
        setSelectedStudents(tempSelectedStudent);
    }

    const onGroupNoChange = (e) => {
        setNumberOfGroup(parseInt(e.target.value))
    }

    const onGroupModify = () => {
        let baseArr = selectedStudents;
        console.log(baseArr);
        baseArr = baseArr.filter(group => group.length != 0);
        axios.post(`${process.env.REACT_APP_API_URL}api/class-type/group-register?id=${course.id}`, baseArr, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.ocean_education_token,
            }
        }).then(res => {
            console.log(res);
            // window.location.reload();
        }).catch(err => {
            console.log(err);
        })

        // window.location.reload();
    }

    useEffect(() => {
        console.log(selectedStudents.length);
        console.log(selectedStudents);
    }, [selectedStudents]);


    return <div>
        <div className={`w-5/6 ml-5 mr-5 mb-14 `}>
            <div className="border-b-2 border-b-gray-300 pb-4">
                <div className="flex justify-between items-center">
                    <div className="flex gap-4 items-center">
                        <div onClick={() => setIsAddGroup(true)} className="w-10 h-10 border-2 border-blue-400 flex justify-center items-center rounded-full hover:bg-blue-100">
                            <div className="">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </div>
                        </div>
                        <div className="text-2xl text-blue-600">
                            <label>Add Group</label>
                        </div>
                    </div>
                    <div>
                        <div onClick={onGroupModify} className="px-4 py-2.5 bg-indigo-400 w-fit rounded-full hover:bg-gray-50 active:bg-indigo-500 cursor-pointer">
                            Lưu thay đổi
                        </div>
                    </div>
                </div>
                <div className={`mt-5 text-blue-600 text-2xl flex gap-6 items-center transition duration-300 delay-200 ${!isAddGroup ? 'translate-x-full hidden' : 'translate-x-0'}`}>
                    <label>How many groups: </label>
                    <div className="border-2 border-blue-50 w-fit h-fit p-1 rounded-xl">
                        <input onChange={onGroupNoChange} type="number" min={1} className="w-10 h-6" style={{outline: 'none'}}/>
                    </div>
                    <div onClick={addGroupHandle} className="bg-blue-600 text-white px-4 py-1 rounded-xl hover:bg-gray-400 hover:text-black">
                        <div>
                            <label>Add</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full">
                {selectedStudents.map((group, index) => <GroupItem key={index} idx={index} setSelectedStudent={setSelectedStudents} selectedStudent={selectedStudents} setStudents={setStudents} students={students} />)}
            </div>
        </div>
    </div>
}

export default Group;