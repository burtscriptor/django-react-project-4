'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';



const BarChartComponent = ({ gradeData }) => {
  return (
    <>
    <h4>Number of climbs per grade</h4>
      <BarChart
        width={500}
        height={300}
        data={gradeData}
        margin={{
          right: 30,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="grade" />
        <YAxis dataKey="count"/>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="grade" fill="#2563eb" />
        
      </BarChart>
      </>
  );
};

export default BarChartComponent;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
        <p className="text-medium text-lg">{label}</p>
        <p className="text-sm text-blue-400">
          Grade:
          <span className="ml-2">{payload[0].value}</span>
        </p>
        
      </div>
    );
  }
};