import React from 'react'
import { PieChart } from 'react-minimal-pie-chart';
export default function Chart({ data = [] }) {

  const defaultLabelStyle = {
    fontSize: '5px',
    fontFamily: 'sans-serif',
  };

  const shiftSize = 1;

  return (
    <>
      <PieChart
        data={data}
        radius={PieChart.defaultProps.radius - shiftSize}
        segmentsShift={(index) => (index === 2 ? shiftSize : 1)}
        label={({ dataEntry }) => dataEntry.details}
        labelStyle={{
          ...defaultLabelStyle,
          fontSize: 8,
          color: 'white',
          fontWeight: 'bold',
        }}
      />
    </>
  )
}
