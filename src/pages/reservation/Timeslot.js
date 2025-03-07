import React from "react";
import '../../css/timeslot.css';

const timeSlots = [
    ["09:00", "09:20", "09:40", "10:00"],
    ["10:20", "10:40", "11:00", "11:20"],
    ["11:40", "12:00", "12:20", "12:40"],
    ["14:00", "14:20", "14:40", "15:00"],
    ["15:20", "15:40", "16:00", "16:20"],
    ["16:40", "17:00", "17:20", "17:40"]
];

function Timeslot() {
    return (
        <div className="reserv-timeslotbox">
            <table className="reserv-timetable">
                <tbody>
                    {timeSlots.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((time, colIndex) => (
                                <td key={colIndex}>
                                    <button className="timeslot">{time}</button>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Timeslot;
