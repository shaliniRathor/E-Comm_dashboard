import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BASEURL } from '../../config';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Custom_loader from '../../Custom_loader';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const defaultTheme = createTheme();

export default function Add_customer() {

  const[customerName,setCutomerName]=React.useState('')
const[phoneno,setphone]=React.useState('')
const[password,setPassword]=React.useState('')
const[address,setAddress]=React.useState('')
const[zipcode,setZipcode]=React.useState('')
const[email,setemail]=React.useState('')
const[loader,setLoader]=React.useState(false)
const[showPassword,setShowPassword]=React.useState(false)

const navigate=useNavigate()

const toggleButton=()=>{
  setShowPassword((prev)=>!prev)
}

  const handleSubmit = async(event) => {
    setLoader(true)
    console.log(customerName,phoneno,password,address,zipcode,email);
    event.preventDefault();
    await axios.post(`${BASEURL}/api/create/new/customers`,
    {customer_Name:customerName,
      phone_No:phoneno,
      password,
      address,
      zip_code:zipcode,
      email:email

    })
    .then(res=>{
      console.log("res=>",res);
      setCutomerName("")
      setphone('')
      setAddress('')
      setZipcode('')
      setemail('')
      setPassword('')
      toast('New Customer Added Successfully',{type:'success'})
      setLoader(false)
    })

    .catch(err=>{
      console.log(err);
    })
  };

  return (

    <>

    <Custom_loader open={loader} />
    
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
            <div className='customer' >
            <Typography component="h1" variant="h5">
              Add Customer
            </Typography>
            </div>
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
          <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 }}>
          <TextField
              required
              fullWidth
              label="Customer Name"
              autoComplete="Customer Name"
              size='small'
              variant='outlined'
              value={customerName}
              onChange={(e)=>setCutomerName(e.target.value)}
            />
                < div className='combineBox'>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Phone Number"
              autoComplete="Phone Number"
              size='small'
              value={phoneno}
              onChange={(e)=>setphone(e.target.value)}
            />
           
            
           <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              size='small'
              value={email}
              onChange={(e)=>setemail(e.target.value)}
            />
            </div>

            <div className='combineBox'> <TextField
              margin="normal"
              required
              fullWidth
              label="Address"
              size='small'
              value={address}
              onChange={(e)=>setAddress((e.target.value))}
            />
            
              <TextField
              margin="normal"
              required
              fullWidth
              name="Zip Code"
              label="Zip Code"
              size='small'
              value={zipcode}
              onChange={(e)=>setZipcode(e.target.value)}
            /> 
            </div>

            <div className='showPasswordFiend' >

           <div className='passwordBUtton' >
            {showPassword ?< VisibilityIcon onClick={toggleButton}/> : <VisibilityOffIcon onClick={toggleButton}/>}

            {/*  value ? condition : consdiotion */}
           </div>

     <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
             type={showPassword ? "text" : "password"}
              id="password"
              size='small'
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
     </div>
  
           <div className='combineBox'> 
           <Button
            onClick={() => navigate(-1)}
            fullWidth
            sx={{ mt: 3, mb: 2 }}
            variant='outlined'
            >             
             Go back
            </Button>

            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Confirm
            </Button>
           </div>
            
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </>
  );
}