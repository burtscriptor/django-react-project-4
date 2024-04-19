import React from "react"
import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import Navigation from './components/Navigation'
import DashboardPage from "./pages/DashboardPage"
import InspirationPage from "./pages/Inspiration"
import CreateSessionAndClimbs from "./pages/CreateSessionAndClimbs"
import SessionsIndex from "./components/SessionsIndex"
import SessionDetails from "./components/SessionDetails"

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [userName, setUserName] = useState(null)

  return (
    <>
   {isAuthorized ? <Navigation /> : null }
    <BrowserRouter>
      <Routes>
      <Route path='/dashboard'
               element={
               <ProtectedRoute isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized}>
              <DashboardPage userName={userName} />
            </ProtectedRoute> 
          }
        /> 
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized}>
              <CreateSessionAndClimbs />
            </ProtectedRoute>
          }
        />
        <Route 
          path='/session' 
            element={
              <ProtectedRoute isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized}>
                <SessionsIndex /> 
              </ProtectedRoute>
            }
          />
          <Route 
            path='/inspiration'
            element={<ProtectedRoute isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized}>
              <InspirationPage />
            </ProtectedRoute> 
            }
            />
          <Route 
            path='/:id'
            element={<ProtectedRoute isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized}>
              <SessionDetails />
              </ProtectedRoute> 
              }
              />  
        <Route path="/login" element={<Login setUserName={setUserName} />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
};

export default App;