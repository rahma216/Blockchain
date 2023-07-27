import { useState } from 'react';

import { Box } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

//components
import DataProvider from './context/DataProvider';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './components/home/Home';



import CreateAssetForm from './components/create/CreateAssetForm';
import Detail from './components/detail/Detail';

import About from './components/about/About';
import Contact from './components/contact/Contact';
import Login from './components/account/Login';
import UpdateAsset from './components/create/UpdateAsset';

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  const token = sessionStorage.getItem('accessToken');
  return isAuthenticated && token ? 
    <>
      <Header />
      <Outlet />
    </> : <Navigate replace to='/account' />
};

function App() {

  const [isAuthenticated, isUserAuthenticated] = useState(false);

  return (
    <DataProvider>
      <BrowserRouter>
        <Box style={{ marginTop: 64 }}>
          <Routes>
            <Route path='/account' element={<Login isUserAuthenticated={isUserAuthenticated} />} />
            
            <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/' element={<Home />} />
            </Route>
            <Route path='/' element={<Home />} />
 


<Route path="/createAsset" element={<CreateAssetForm />} />

            <Route path='/detail/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/detail/:id' element={<Detail />} />
            </Route>
  
            <Route path='/updateAsset/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
  <Route index element={<UpdateAsset />} />
</Route>


            <Route path='/about' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/about' element={<About />} />
            </Route>

            <Route path='/contact' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/contact' element={<Contact />} />
            </Route>
          </Routes>
        </Box>
        <br />    <br />     <br />  

        <Footer />
      </BrowserRouter>
    </DataProvider>
  

  );
}

export default App;
