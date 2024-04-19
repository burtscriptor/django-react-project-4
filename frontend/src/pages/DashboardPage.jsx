import React from 'react'
import Dashboard from '../components/Dashboard'



const DashboardPage = ({ userName }) => {
    return (
        <>
        <Dashboard userName={userName} />
        </>
    );
};

export default DashboardPage;
