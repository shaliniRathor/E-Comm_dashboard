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
import { useNavigate } from "react-router-dom";
import Custom_loader from "../../Custom_loader";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton } from "@mui/material";

const defaultTheme = createTheme();

export default function Create_admin() {
  const [adminName, setAdminName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setemail] = React.useState("");
  const [loader, setLoader] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(true);

  const navigate = useNavigate();

//   const toglePass = () => {
//     setShowPassword((prev) => !prev);
//   };

const showNhide=()=>{
    setShowPassword((prev)=> !prev)
    
}


  const handleSubmit = async (event) => {
    setLoader(true);
    console.log(adminName, password, email);
    event.preventDefault();
    await axios
      .post(`${BASEURL}/api/create/new/admin`, {
        name: adminName,
        password,
        email: email,
      })
      .then((res) => {
        console.log("res=>", res);
        setAdminName("");
        setemail("");
        setPassword("");
        toast("New admin Added Successfully", { type: "success" });
        setLoader(false);
      })

      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Custom_loader open={loader} />

      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className="admin">
            <Typography component="h1" variant="h5">
              Add admin
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
                label="admin Name"
                autoComplete="admin Name"
                size="small"
                variant="outlined"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                size="small"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
              {/* ---------------show and hide button setup---------------------- */}
              <div className="showPasswordFiend">
               <div className="passwordBUtton">
                {showPassword ? <VisibilityIcon onClick={showNhide}/> : <VisibilityOffIcon onClick={showNhide}/>}                 
                </div>  
                 <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                //   type={showPassword ? "text" : "password"}
              
                  id="password"
                  size="small"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
