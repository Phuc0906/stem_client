import React from "react";
import { Document, Page,pdfjs } from 'react-pdf';

const Lecture = () => {
    return <div className="pl-5 pt-10 pr-5 w-full fixed left-28 overflow-auto h-screen overflow-auto  ">
        <div className="w-5/6 h-3/4 bg-red-400 relative">
            <iframe src="https://docs.google.com/presentation/d/1ngXyYzB1bv5AMLH7mOz0d7kP8vt90oIB/embed?start=false"
                    frameBorder="0" className="w-full h-full"  allowFullScreen="false"
                    ></iframe>
            <div className="w-50 h-9 bg-gray-200 right-0 bottom-0 absolute flex items-center justify-center pr-5 w-fit">
                <label>Ocean Education</label>
            </div>
        </div>

    </div>

}

export default Lecture;