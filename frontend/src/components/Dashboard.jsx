import React from 'react'
import { useState, useEffect } from 'react'
import SessionsIndex from './SessionsIndex'

const Dashboard = () => {
    return (
        <div><h1>Welcome to the Dashboard</h1>
            <SessionsIndex />
        </div>
    );

};

export default Dashboard;