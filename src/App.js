import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SideBar from './components/SideBar';
import All_products from './pages/products/All_products';
import All_Orders from './pages/orders/All_Orders';
import All_category from './pages/category/All_category';
import All_banners from './pages/banners/All_banners';
import All_admin from './pages/admin/All_admin';
import All_customers from './pages/customers/All_customers';
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import Add_customer from './pages/customers/Add_customer';
import Update_customer from './pages/customers/Update_customer';
import Add_products from './pages/products/Add_products';
import Update_products from './pages/products/Update_products';
import Update_category from './pages/category/Edit_category'
import Add_Order from './pages/orders/Add_Order';
import ViewOrders from './pages/orders/ViewOrders';
import Img_FireBase from './pages/Img_FireBase';
import Create_admin from './pages/admin/Create_admin';
import View_admin from './pages/admin/View_admin';




function App() {
  return (
    <div className="App">
    
    <ToastContainer
position="top-right"
autoClose={1000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>


    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Navigate to={"/order"}/>} ></Route>

 {/*------------------------------------- all customers----------------------------------------- */}
      <Route path='/customers' element={<SideBar headerTitle='All Customers' comp= {<All_customers/>}/>} ></Route>
      <Route path='/add/customer' element={<SideBar headerTitle='Add Customer' comp= {<Add_customer/>}/>} ></Route>
      <Route path='/update/customer/:id' element={<SideBar headerTitle='Edit Customer' comp= {<Update_customer/>}/>} ></Route>

 {/* -----------------------------------------products-------------------------------------------- */}
      <Route path='/add/product' element={<SideBar headerTitle='Add Product' comp= {<Add_products/>}/>} ></Route>
      <Route path='/update/product/:id' element={<SideBar headerTitle='Update Product' comp= {<Update_products/>}/>} ></Route>
      <Route path='/products' element={<SideBar headerTitle='All Products'   comp= {<All_products/>}/>} ></Route>

 {/*----------------------------------- category----------------------------------------------------- */}
      <Route path='/categories' element={<SideBar headerTitle='All Categories' comp= {<All_category/>}/>} ></Route>
      <Route path='/update/category/:id' element={<SideBar headerTitle='Update Category' comp= {<Update_category/>}/>} ></Route>


 {/* -------------------------------------banners ----------------------------------------------------*/}
      <Route path='/banners' element={<SideBar headerTitle="All Banners"  counting="4" comp= {<All_banners/>}/>} ></Route>

 {/*------------------------------------- admin -------------------------------------------------------*/}
      <Route path='/admin' element={<SideBar headerTitle='All Admin' comp= {<All_admin/>}/>} ></Route>
      <Route path='/add/admin' element={<SideBar headerTitle='Add Admin' comp= {<Create_admin/>}/>} ></Route>
      <Route path='/edit/admin/:id' element={<SideBar headerTitle='Edit Admin' comp= {<View_admin/>}/>} ></Route>

 {/* ---------------------------------------order ------------------------------------------------------*/}
      <Route path='/order' element={<SideBar headerTitle='All Orders' counting="6" comp= {<All_Orders/>}/>} ></Route>
      <Route path='/order/add' element={<SideBar headerTitle='Add Orders' comp= {<Add_Order/>}/>} ></Route>
      <Route path='/order/view' element={<SideBar headerTitle='Order Detail'  comp= {<ViewOrders/>}/>} ></Route>

      
      <Route path='/logIn' element={<LogIn/>} ></Route>
      <Route path='/signUp' element={<SignUp/>} ></Route>


      <Route path='/fireBase' element={<Img_FireBase/>} ></Route>
  
   
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
