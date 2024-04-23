'use client';

import {
  PieChart,
  Pie,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
 
  
} from 'recharts';

const PieChartComponent = ({ sessionsByType, climbsByStyle }) => {
    console.log(sessionsByType)
    return (
        <>
        <p>Session by type</p>
        <PieChart width={300} height={200}>
            <Pie data={sessionsByType} dataKey="count" nameKey="session" cx="50%" cy="50%" outerRadius={80} fill="blue" label='Sessions by type'/>
        </PieChart>
        
        </>
    );
};

export default PieChartComponent;