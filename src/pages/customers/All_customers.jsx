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
import axios from 'axios';
import { IconButton } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import  noSerachImg  from '../../asset/Animation - 1716965132359.gif';




export default function All_customers() {
  

  const [data,setData]=React.useState([])
  const[searchField,setSearchField]=React.useState('')

    
console.log("searchData=>",searchField);

  const navigate=useNavigate()

  React.useEffect(()=>{
    getAllCustomers()
  },[searchField])

  const getAllCustomers= async ()=>{
    await axios.get(`${BASEURL}/api/get/all/customers?searchData=${searchField}`)
    .then(res=>{
      console.log("res=>",res);
      setData(res.data.data)
    })
  }

  console.log("customers=>",data);

  const deleteCustomer= async(id)=>{

    
    let deleteBox= window.confirm("do you want to delete customers")
    if (! deleteBox) {
     return
    }

    await axios.delete(`${BASEURL}/api/delete/customers/${id}`)
     .then(res=>{
      console.log("deleted=>",res);
      toast.error("deleted succesfully")
     })
     .catch(err=>{
      console.log(err);
     })
  }

  const gotoAddCustomer =()=>{
      navigate('/add/customer')
  }

  const gotoViewCustomer=(id)=>{
    navigate(`/update/customer/${id}`)
  }

  return (
    <div>
   <div className='searchField'>
    <div className="innerflex">
    <TextField size='small' id="outlined-basic" label="Search Customer" variant="outlined"
    value={searchField} 
   onChange={(e)=>setSearchField(e.target.value)}
   />
    <Button   variant="contained" >Search</Button> 
    </div>
    <Button   variant="contained" onClick={gotoAddCustomer}>Add Customer</Button> 
    </div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Customer Id</TableCell>
            <TableCell align="right">Customer Name</TableCell>
            <TableCell align="right">E-Mail</TableCell>
            <TableCell align="right">Phone No.</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Zip Code</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.length > 0 ?  data?.map((item) => (
            <TableRow
              key={item.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item._id}
              </TableCell>
              <TableCell align="right">{item.customer_Name}</TableCell>
              <TableCell align="right">{item.email}</TableCell>
              {/* <TableCell align="right">{item.password}</TableCell> */}
              <TableCell align="right">{item.phone_No}</TableCell>
              <TableCell align="right">{item.address}</TableCell>
              <TableCell align="right">{item.zip_code}</TableCell>
              <TableCell align="right" >
                <div className='deleteEdit'>

                <IconButton  onClick={()=>gotoViewCustomer(item?._id)} >
                <EditIcon fontSize='small' style={{color:config.global_color}} />
                </IconButton>

                <IconButton onClick={()=>deleteCustomer(item._id)} >
                <DeleteIcon  fontSize='small' style={{color:'red'}}  />
                </IconButton>
                </div>
              </TableCell>
            </TableRow> 
        ))
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

