import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import config, { BASEURL } from '../../config';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, IconButton } from '@mui/material';
import { toast } from 'react-toastify';
import  noSerachImg  from '../../asset/Animation - 1716965132359.gif';
import LinearProgress from '@mui/material/LinearProgress';






export default function All_products() {

  const[data,setData]=React.useState('')
  const[render,setRender]=React.useState('')
  const[searchField,setSearchField]= React.useState('')

  console.log("searchresult=>",searchField);

  const navigate=useNavigate()

  React.useEffect(()=>{
    getAllProducts()
  },[render,searchField])

  const getAllProducts=async()=>{
    await axios.get(`${BASEURL}/api/get/all/products?searchdata=${searchField}`)
    .then((res=>{
      console.log("res=>",res);
      setData(res.data.data)
    }))
  }

  const gotoproducts=()=>{
    navigate('/add/product')
  }

  const deletecustomer=async(id)=>{

    let deleteBox= window.confirm('Do You Want To Delete Products')
   if (! deleteBox) {
    return
   }

   await axios.delete(`${BASEURL}/api/delete/products/${id}`)
   .then(res=>{
    console.log('res=>',res);
    toast.success("deleted succesfully")
    setRender((prev)=>!prev)

   })
   .catch((err=>{
    console.log(err);
   }))
  }

  const updateCustmer=(id)=>{
    navigate(`/update/product/${id}`)
  }

  return (
     <div>
   <div className='searchField'>
     <div className="innerflex">
    <TextField size='small' id="outlined-basic" label="Search Product" variant="outlined" 
    value={searchField}
    onChange={(e)=>setSearchField(e.target.value)}
    />
    <Button   variant="contained">Search</Button> 
    {/* <div> ({data.length}) </div> */}
    </div>
   
    <Button variant="contained" onClick={gotoproducts} >Add Product</Button> 
    </div>
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Products Img</TableCell>
            <TableCell align="right">Product Id</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.length > 0 ?  data?. map((item) => (
            <TableRow
              key={item.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <img src={item?.image[0]?.image_url} alt="product image" width={70} height={70} />
                {item.productimage}
              </TableCell>
              <TableCell align="right">{item._id}</TableCell>
              <TableCell align="right">{item.product_name}</TableCell>
              <TableCell align="right">₹{item.price}</TableCell>
              <TableCell align="right">{item.quantity}</TableCell>
              <TableCell align="right">{item.category}</TableCell>
              <TableCell align="right">{item.description}</TableCell>
              <TableCell align="right">
                <div className='deleteEdit' scope="row" >
              <IconButton>
              <EditIcon onClick={()=>updateCustmer(item?._id)} fontSize='small' style={{color:config.global_color}} />
              </IconButton>
              <IconButton onClick={()=>deletecustomer(item?._id)} >
              <DeleteIcon fontSize='small' style={{color:'red'}}  />
              </IconButton>
               

                </div>
              </TableCell>
            </TableRow>
          ))
          // -----------------no result gif-------------------//
        :
        
        <TableCell colSpan={8} align='center' >
           <img src={noSerachImg} alt="logo" />
           <h3  >No Result Found</h3>
       </TableCell>
        }

        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}


