'use client';
// components/Calendar.tsx
import { useState } from "react";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  console.log("currentDate : ",currentDate);
  
  // Function to get the first day of the current month
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  };


  // Function to get the last day of the current month
  const getLastDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  };


  // Function to generate the calendar days for the month
  const generateCalendarDays = (date: Date) => {
    const firstDay = getFirstDayOfMonth(date);
    const lastDay = getLastDayOfMonth(date);

    const days = [];
    // Add empty slots for the days before the first day of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    // Add days of the current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(i);
    }

    // Add empty slots for the days after the last day of the month
    const remainingDays = 7 - (days.length % 7);
    for (let i = 0; i < remainingDays && remainingDays !== 7; i++) {
      days.push(null);
    }

    return days;
  };

  // Navigate to the previous month
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  // Navigate to the next month
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Get the current month's name
  const getMonthName = (monthIndex: number) => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[monthIndex];
  };

  // Generate the list of calendar days
  const days = generateCalendarDays(currentDate);

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg">
      {/* Header with navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goToPreviousMonth}
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
        >
          &lt;
        </button>
        <span className="text-xl font-semibold">
          {`${getMonthName(currentDate.getMonth())} ${currentDate.getFullYear()}`}
        </span>
        <button
          onClick={goToNextMonth}
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
        >
          &gt;
        </button>
      </div>

      {/* Weekday labels */}
      <div className="grid grid-cols-7 text-center font-medium mb-2">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <div
            key={index}
            className={`h-10 flex items-center justify-center rounded-md cursor-pointer transition 
              ${day ? "hover:bg-gray-200" : "bg-gray-100"} 
              ${!day ? "text-transparent" : "text-black"}`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;


