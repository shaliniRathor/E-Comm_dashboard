import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Custom_loader from "../Custom_loader";
import { BASEURL } from "../config";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function LogIn() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(true);
  const [loader,setLoader]=React.useState(false)
  const [error,setError]= React.useState("")
  
  const navigate = useNavigate()

console.log("error==>",error);
  const handleSubmit = (event) => {
    setLoader(true)
    event.preventDefault();
    axios.post(`${BASEURL}/api/logIn/admin`,{
      password:password,
      email:email
    })
    .then(res=>{
      console.log("res=>>",res);
      if(!res?.data?.status){
        setError(res?.data?.message)
      return  toast.error("Admin Not Found")
      }

      toast.success("log in successfully")
      navigate("/")
    })
     .catch(err=>{
      console.log(err);
     })

    console.log("email=>", email, "password=>", password);
    setLoader(false)
  };

  const toggleButton = () => {
    setShowPassword((prev) => !prev);
  };

  return (

    <ThemeProvider theme={defaultTheme}>
      <Custom_loader open={loader}/> 
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <p className="errorHandling">{error}</p>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              {/* <div className="showPasswordFiend"> */}
              {/* <div className='passwordBUtton'>
             </div> */}

              <Grid item xs={15}>
                <div className="showPasswordFiend">
                 <div className="loginpasswordBUtton">
                 {showPassword ? (
                    <VisibilityIcon
                      
                      onClick={toggleButton}
                    />
                  ) : (
                    <VisibilityOffIcon
                      onClick={toggleButton}
                    />
                  )}
                 </div>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    id="password"
             
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </Grid>
              {/* </div> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
