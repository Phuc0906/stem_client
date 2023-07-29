import React, {useEffect, useState} from "react";
import {Calendar, dateFnsLocalizer} from "react-big-calendar";
import vi from "date-fns/locale/vi";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import axios from "axios";
import {id} from "date-fns/locale";

const CourseManagementCalender = () => {
    const [isPhone, setIsPhone] = useState(false);
    const [courses, setCourses] = useState([]);
    const [calendar, setCalendar] = useState([]);

    useEffect(() => {
        if (window.innerWidth < 900) {
            setIsPhone(true);
        }else {
            setIsPhone(false);
        }

        axios.get(`${process.env.REACT_APP_API_URL}api/class-type`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.ocean_education_token,
            }
        }).then(res => {
            setCourses(res.data);
            console.log(res.data);
            const calendarData = [];
            for (let i = 0; i < res.data.length; i++) {
                let idx = 0;
                while (idx < res.data[i].totalSession) {
                    const startHour = parseInt(res.data[i].startTime.split(":")[0]);
                    const startMinutes = parseInt(res.data[i].startTime.split(":")[1]);
                    let endHour = parseInt(res.data[i].duration / 60) + startHour;
                    const endMinutes = ((parseInt(res.data[i].duration % 60) + startMinutes === 60) ? 0 : parseInt(res.data[i].duration % 60) + startMinutes);
                    if ((parseInt(res.data[i].duration % 60) + startMinutes === 60)) {
                        endHour += 1
                    }
                    let startDate = new Date(parseInt(res.data[i].startDate.split("-")[2]), parseInt(res.data[i].startDate.split("-")[1]) - 1, parseInt(res.data[i].startDate.split("-")[0]), startHour, startMinutes, 0)
                    let endDate = new Date(parseInt(res.data[i].startDate.split("-")[2]), parseInt(res.data[i].startDate.split("-")[1]) - 1, parseInt(res.data[i].startDate.split("-")[0]), endHour, endMinutes, 0)

                    startDate.setDate(startDate.getDate() + idx * 7)
                    endDate.setDate(endDate.getDate() + idx * 7)
                    calendarData.push({
                        title: `${res.data[i].name} - Giao Vien: ${res.data[i].teacherName}` ,
                        start: startDate,
                        end: endDate,
                    })
                    idx++;
                }
            }
            setCalendar(calendarData);

        }).catch(err => {
            console.log(err);
        });

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


    return <div className={`pt-10 w-full ${!isPhone ? ' pl-5 fixed left-12 right-10 pr-5 ' : ''}  overflow-auto h-screen overflow-auto`}>
        <Calendar localizer={localizer} events={calendar} startAccessor="start" endAccessor="end" style={{ height: 900, margin: "50px" }} />
    </div>
}

export default CourseManagementCalender;