"use client";
import React, { useState } from 'react';

const SampleTable = () => {
  const [data, setData] = useState([
    { id: 1, name: 'Cy Ganderton', rollNo: '23', marks: '234', isChecked: true },
    { id: 2, name: 'Hart Hagerty', rollNo: '23', marks: '123', isChecked: false },
    { id: 3, name: 'Brice Swyre', rollNo: '23', marks: '432', isChecked: true },
    // Add more rows as needed
  ]);

  const handleCheckboxToggle = (id : number) => {
    setData((prevData) =>
      prevData.map((item) => (item.id === id ? { ...item, isChecked: !item.isChecked } : item))
    );
  };

  return (
    <main className='h-full w-full p-10 bg-white'>
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr className='text-center'>
            <th></th>
            <th>Name</th>
            <th>Roll No.</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody>
          {/* rows */}
          {data.map((row) => (
            <tr className='text-center'  key={row.id}>
              <th>{row.id}</th>
              <td>{row.name}</td>
              <td>{row.rollNo}</td>
              <td>{row.marks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </main>
  );
};

export default SampleTable;