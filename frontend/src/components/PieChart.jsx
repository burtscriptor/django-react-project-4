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
        <p>piechart</p>
        <PieChart width={730} height={250}>
            <Pie data={sessionsByType} dataKey="count" nameKey="session" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label='Sessions by type'/>
        </PieChart>
        
        </>
    );
};

export default PieChartComponent;