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
// import config, { BASEURL } from '../../components/config';
import axios from 'axios';
import { IconButton } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import  noSerachImg  from '../../asset/Animation - 1716965132359.gif';
import config, { BASEURL } from '../../config';





export default function All_customers() {
  

  const [data,setData]=React.useState([])
  const[searchField,setSearchField]=React.useState('')
  const[render,setRender]=React.useState(true)

    
console.log("searchData=>",searchField);

  const navigate=useNavigate()

  React.useEffect(()=>{
    getAllBanners()
  },[,render,searchField])

  const getAllBanners= async ()=>{
    await axios.get(`${BASEURL}/api/get/all/admin?searchData=${searchField}`)
    .then(res=>{
      console.log("res=>",res);
      setData(res.data.data)
    })
  }

  console.log("admin=>",data);

  const deleteAdmin= async(id)=>{ 
    let deleteBox= window.confirm("do you want to delete Admin")
    if (! deleteBox) {
     return
    }
    await axios.delete(`${BASEURL}/api/delete/admin/${id}`)
     .then(res=>{
      console.log("deleted=>",res);
      toast.error("deleted succesfully")
      setRender((prev)=>!prev)
     })
     .catch(err=>{
      console.log(err);
     })
  }

  const gotoaddAdmin=()=>{
  navigate("/add/admin")
  }

  const gotoViewAdmin=(id)=>{
    navigate(`/edit/admin/${id}`)
  }

  return (
    <div>
   <div className='searchField'>
    <div className="innerflex">
    <TextField size='small' id="outlined-basic" label="Search Admin" variant="outlined"
    value={searchField} 
   onChange={(e)=>setSearchField(e.target.value)}
   />
    <Button   variant="contained" >Search</Button> 
    </div>
    <Button   variant="contained" onClick={gotoaddAdmin}>Add Admin</Button> 
    </div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Admin Name</TableCell>
            <TableCell align="right">E-mail</TableCell>
            <TableCell align="right">Password</TableCell>
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
                {item.name}
              </TableCell>
              <TableCell align="right">{item.email}</TableCell>
              <TableCell align="right">{item.password}</TableCell>
              <TableCell align="right" >
                <div className='deleteEdit'>

                <IconButton  onClick={()=>gotoViewAdmin(item?._id)} >
                <EditIcon fontSize='small' style={{color:config.global_color}} />
                </IconButton>

                <IconButton onClick={()=>deleteAdmin(item._id)} >
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




