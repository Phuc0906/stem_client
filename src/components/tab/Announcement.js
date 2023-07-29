import React from "react";
import AnnouncementItem from "../card/AnnouncementItem";

const Announcement = () => {
    return <div className="w-full ml-5 mr-5">
        <div className="w-full p-4 w-4/5">
            <div className="border-b-2 border-gray-300">
                <AnnouncementItem/>
                <AnnouncementItem/>
                <AnnouncementItem/>
                <AnnouncementItem/>
            </div>
        </div>
    </div>
}

export default Announcement;