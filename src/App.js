import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import NavBar from './components/NavBar';
import Register from './pages/Register';
import Login from './pages/Login';
import AuthProvider from './context/auth';
import PrivateRoutes from './components/PrivateRoutes';
import { useState } from 'react';
import Profile from './pages/Profile';

function App() {

  const [isLogged, setIsLogged] = useState(false)

  return (
    <AuthProvider>
      <NavBar/>
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login setIsLogged={setIsLogged}/>}/>
        {/* Rutas protegidas a continuación: */}
        <Route element={<PrivateRoutes isLogged={isLogged} />} >
          <Route path='/' element={<Home/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
