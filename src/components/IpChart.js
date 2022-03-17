import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis,ResponsiveContainer } from 'recharts';
import { useSelector } from 'react-redux';

const IpChart = () => {
    const {fetchingDataReducer}=useSelector(state=>state)
  return (
    <ResponsiveContainer width="100%" height="100%" >
        <BarChart data={fetchingDataReducer.allData && fetchingDataReducer.allData.data.map(el=>({...el,value:Number(el.value)}))}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis hide dataKey="name" />
        <YAxis type="number" />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
        <Bar dataKey="symbolSize" fill="#82ca9d" />
        </BarChart>
  </ResponsiveContainer>
  )
}

export default IpChart