import React from 'react'
import AreaChartComponent from './AreaChart';
import BarChartComponent from './BarChart';
import RadarChartComponent from './RadarChart';
import PieChartComponent from './PieChart';



const Graph = ({ climbsPerSession, gradeData, climbsArray, sessionsByType, climbsByStyle }) => {

   

    return (
        <main >
          <div >
           
              <AreaChartComponent climbsPerSession={climbsPerSession} />
              <BarChartComponent gradeData={gradeData} />
                <RadarChartComponent climbsArray={climbsArray}  />
                <PieChartComponent sessionsByType={sessionsByType} climbsByStyle={climbsByStyle} />
           
    
           
          </div>
        </main>
      );
    
    
   

};

export default Graph;