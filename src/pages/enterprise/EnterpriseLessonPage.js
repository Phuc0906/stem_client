import React, {useEffect, useState} from "react";
import axios from "axios";
import {fi} from "date-fns/locale";

const EnterpriseLessonPage = () => {
    const [isPhone, setIsPhone] = useState(false);
    const [file, setFile] = useState(null);
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

    const onFileSelected = (e) => {
        setFile(e.target.files[0])
        console.log(e.target.files[0]);
    }

    const RowBuilder = ({lesson, idx}) => {

        return <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
            <td className="whitespace-nowrap px-6 py-4 font-medium">{idx}</td>
            <td className="whitespace-nowrap px-6 py-4"></td>
            <td className="whitespace-nowrap px-6 py-4"></td>
            <td className="whitespace-nowrap px-6 py-4"></td>
            <td className="whitespace-nowrap px-6 py-4"></td>
            <td className="whitespace-nowrap px-6 py-4"></td>
        </tr>
    }

    return <div className={`pl-5 pt-10 w-full ${!isPhone ? 'fixed left-28' : ''}  overflow-auto h-screen`}>
        <label className="text-3xl">Bai Hoc</label>
        {/*<input type={"file"} onChange={onFileSelected} />*/}
        {/*<button onClick={() => {*/}
        {/*    const fileData = new FormData()*/}
        {/*    fileData.append("file", file);*/}
        {/*    axios.post(`${process.env.REACT_APP_API_URL}api/lesson/1/lesson/upload`, fileData, {*/}
        {/*        headers: {*/}
        {/*            "Content-Type": "multipart/form-data",*/}
        {/*            Authorization: "Bearer " + localStorage.ocean_education_token,*/}
        {/*        }*/}
        {/*    }).then(res => {*/}
        {/*        window.location.reload();*/}
        {/*    });*/}
        {/*}}>Upload</button>*/}
        <div>
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-left text-sm font-light">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                <tr>
                                    <th scope="col" className="px-6 py-4">#</th>
                                    <th scope="col" className="px-6 py-4">Ten Bai Hoc</th>
                                    <th scope="col" className="px-6 py-4">Ten file</th>
                                    <th scope="col" className="px-6 py-4">Cap do</th>
                                    <th scope="col" className="px-6 py-4"></th>
                                    <th scope="col" className="px-6 py-4"></th>
                                </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default EnterpriseLessonPage;