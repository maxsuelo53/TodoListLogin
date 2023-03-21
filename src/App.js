
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth';
import { Oval } from 'react-loader-spinner'

// hooks
import { useState, useEffect } from 'react';


//CONTEXT
import { AuthProvider } from './context/AuthContext';
import { useAuthentication } from './hooks/useAuthentication';

//PAGES
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';

//COMPONENTS
import Navbar from './components/Navbar';
import Footer from './components/Footer';


function App() {

  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;


  useEffect(() => {

    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [auth])



  if (loadingUser) {
    return (
      <div className="loadingPage">
        <Oval
          height={100}
          width={100}
          color="#1FC4DA"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel='oval-loading'
          secondaryColor="#1FC4DA"
          strokeWidth={2}
          strokeWidthSecondary={2}

        />
      </div>)
  }

  return (
    <div className='mx-auto bg-[#e8e8e8] h-screen pt-[100px]'>
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div >
            <Routes>
              <Route path='/' element={user ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path='/about' element={<About />} />
              <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />
              <Route path='/register' element={!user ? <Register /> : <Navigate to="/" />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
