import React from 'react'
import { Doughnut, Bar } from 'react-chartjs-2';
import { useSelector } from "react-redux";

export const Diagrams = () => {
  const data = useSelector(state => state.data.data)
  // console.log('OUTPUT: Diagrams -> state.data.data', price)
  const charData = {
        labels: [],
        datasets: [
          {
            label: "Categories",
            data: [],
            backgroundColor: 'red'
          }
        ]
      }
    charData.labels = [...data.filter(item=>item.category)]
  console.log('OUTPUT: Diagrams -> data', data.forEach(item=>item.category))
  return (
    <>
      <Bar
        data={charData}
        width={100}
        height={50}
        options={{ maintainAspectRatio: false }}
      />
    </>
  )
}