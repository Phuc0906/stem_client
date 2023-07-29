import React from "react";

const Student = () => {
    return <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                    <table className="min-w-full text-left text-xl font-light">
                        <thead
                            className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                        <tr>
                            <th scope="col" className="px-6 py-4">#</th>
                            <th scope="col" className="px-6 py-4">Student Name</th>
                            <th scope="col" className="px-6 py-4">Phone Number</th>
                            <th scope="col" className="px-6 py-4">Attendance</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr
                            className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">1</td>
                            <td className="whitespace-nowrap px-6 py-4">Mark</td>
                            <td className="whitespace-nowrap px-6 py-4">0909090909</td>
                            <td className="whitespace-nowrap px-6 py-4"><input className="w-5 h-5" type="checkbox"/></td>
                        </tr>
                        <tr
                            className="border-b bg-white dark:border-neutral-500 dark:bg-neutral-600">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">2</td>
                            <td className="whitespace-nowrap px-6 py-4">Jacob</td>
                            <td className="whitespace-nowrap px-6 py-4">0909090909</td>
                            <td className="whitespace-nowrap px-6 py-4"><input className="w-5 h-5" type="checkbox"/></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
}

export default Student;