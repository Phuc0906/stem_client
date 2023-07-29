import React, {useEffect, useState} from "react";
import vi from "date-fns/locale/vi";
import {Calendar, dateFnsLocalizer} from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";

const TeachingCalendar = () => {
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


    const locales = {
        'vi': vi,
    }

    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales,
    })

    const myEventsList = [
        {
            title: "Course A",
            start: new Date(2023, 5, 7, 9, 33, 30),
            end: new Date(2023, 5, 7, 10, 33, 0),
        },
        {
            title: "Course B",
            start: new Date(2023, 5, 7, 12, 33, 30),
            end: new Date(2023, 5, 7, 13, 33, 0),
        },
        {
            title: "Course C",
            start: new Date(2023, 5, 7, 16, 0, 0),
            end: new Date(2023, 5, 7, 17,30, 0),
        },
    ];

    return <div className={`pt-10 w-full ${!isPhone ? ' pl-5 fixed left-12 right-10 pr-5 ' : ''}  overflow-auto h-screen overflow-auto`}>
        <Calendar localizer={localizer} events={myEventsList} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} />
    </div>
}

export default TeachingCalendar;