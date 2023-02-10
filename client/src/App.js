import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import { useSelector } from 'react-redux';
import Spinner from './componets/Spinner';
import ProtectedRoute from './componets/ProtectedRoute';
import PublicRoute from './componets/PublicRoute';
import ApplyDoc from './pages/ApplyDoc';
import Notification from './pages/Notification';
import User from './pages/Admin/User';
import Doctor from './pages/Admin/Doctor';
function App() {
  const { loading } = useSelector(state => state.alerts);
  return (
    <>
      <BrowserRouter>

        {loading ? (<Spinner />) :
          (<Routes>
            <Route path='/' element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } />
            <Route path='/apply-doctor' element={
              <ProtectedRoute>
                <ApplyDoc />
              </ProtectedRoute>
            } />
            <Route path='/admin/doctors' element={
              <ProtectedRoute>
                <Doctor />
              </ProtectedRoute>
            } />
            <Route path='/admin/users' element={
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            } />
            <Route path='/notification' element={
              <ProtectedRoute>
                <Notification />
              </ProtectedRoute>
            } />
            <Route path='/login' element={

              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            <Route path='/register' element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } />
          </Routes>)}

      </BrowserRouter>
    </>
  );
}

export default App;
