import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './common/navbar/nav';
import Footer from './common/footer/footer';
import SignUp from './pages/signup/signup';
import PrivateComponent from './components/privateComponents';
import Login from './pages/login/login';
import AddProduct from './pages/addProducts/addProduct';
import Product from './pages/products/products';
import UpdateProduct from './pages/updateProduct/updateProduct';
import Profile from './pages/profile/profile';


function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route element={<PrivateComponent/>}>   
          <Route path="/" element={<Product/>}/>
          <Route path="/add-product" element={<h1><AddProduct/></h1>}/>
          <Route path="/update-product/:id" element={<UpdateProduct/>}/>
          
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/logout" element={<h1>Logout Page</h1>}/>
          </Route>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>

        <h1>E-Dashboard</h1>
     
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
