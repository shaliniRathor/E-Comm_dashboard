import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BASEURL } from "../../config";
import { toast } from "react-toastify";
import axios from "axios";                   
import { useNavigate, useParams } from "react-router-dom";
import Custom_loader from "../../Custom_loader";   
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const defaultTheme = createTheme();

export default function Create_admin() {
  const [adminEditName, setAdminEditName] = React.useState("");
  const [editpassword, setEditPassword] = React.useState("");
  const [editemail, setEditemail] = React.useState("");
  const [loader, setLoader] = React.useState(false);
  const [render,setRender]=React.useState(true)
  const [showPassword,setShowPassword]=React.useState(true)
  const navigate = useNavigate();

  const toggleButton= ()=>{
    setShowPassword((prev)=>!prev)
  }
 
  React.useEffect(()=>{
     axios.get(`${BASEURL}/api/single/admin/${params.id}`)
    .then((res) => {
      console.log("res=>", res);
      setAdminEditName(res.data.data.name);
      setEditPassword(res.data.data.password);
      setEditemail(res.data.data.email);
      // toast("saved all changes", { type: "success" });
      // setLoader(false);
    })

    .catch((err) => {
      console.log(err);
    });
  },[render])
  
  const params=useParams()
  console.log("params=>>",params);
  
  const handleSubmit = async (event) => {
    setLoader(true);
    event.preventDefault();

    axios.patch(`${BASEURL}/api/update/admin/${params.id}`,{
        name:adminEditName,
        password:editpassword,
        email:editemail
    })
    .then(res=>{
        console.log("res=>",res);
        setRender(prev=>!prev)
        navigate(-1)
        toast("Updated Banner Successfully", { type: "success" });
        setLoader(false)
    })
    .catch(err=>{
        console.log("error=>",err);
    })
   
  };

  

  return (
    <>
      <Custom_loader open={loader} />

      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className="admin">
            <Typography component="h1" variant="h5">
              Edit admin
            </Typography>
          </div>
          <Box
            sx={{
              marginTop: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                required
                fullWidth
                label="Edit Name"
                autoComplete="Edit Name"
                size="small"
                variant="outlined"
                value={adminEditName}
                onChange={(e) => setAdminEditName(e.target.value)}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Edit Email"
                name="email"
                autoComplete="email"
                size="small"
                value={editemail}
                onChange={(e) => setEditemail(e.target.value)}
              />

             <div className="showPasswordFiend" >

             <div className="passwordBUtton">
                {showPassword ? <VisibilityIcon onClick={toggleButton}/> : <VisibilityOffIcon onClick={toggleButton} /> }
             </div>

             <TextField
                margin="normal"
                required
                fullWidth
                name=" Edit password"
                label="Edit Password"
                type={showPassword ? "text": "Password"}
                id="password"
                size="small"
                value={editpassword}
                onChange={(e) => setEditPassword(e.target.value)}
              />

             </div>

              <div className="combineBox">
                <Button
                  onClick={() => navigate(-1)}
                  fullWidth
                  sx={{ mt: 3, mb: 2 }}
                  variant="outlined"
                >
                  Go back
                </Button>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Save Changes
                </Button>
              </div>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}

