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
import { useEffect } from "react";
import Custom_loader from "../../Custom_loader";

const defaultTheme = createTheme();

export default function Update_customer() {
  const [customerName, setCutomerName] = React.useState("");
  const [phoneno, setphone] = React.useState("");
  // const[password,setPassword]=React.useState('')
  const [address, setAddress] = React.useState("");
  const [zipcode, setZipcode] = React.useState("");
  const [email, setemail] = React.useState("");
  const [render,setRender]=React.useState("")
  const[loader,setLoader]=React.useState(false)


  useEffect(() => {
    get_customer();
  }, [render]);

  const navigate = useNavigate();
  const params = useParams();
  console.log(params);

  const get_customer = async () => {
    setLoader(true)
    await axios
      .get(`${BASEURL}/api/get/single/customer/${params.id}`)
      .then((res) => {
        console.log("res=>", res);
        setCutomerName(res?.data?.data?.customer_Name);
        setphone(res?.data?.data?.phone_No);
        setAddress(res?.data?.data?.address);
        setZipcode(res?.data?.data?.zip_code);
        setemail(res?.data?.data?.email);
        setLoader(false)
      })

      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = async (e) => {
    setLoader(true)
    e.preventDefault();
    console.log("update customer=>");
    axios
      .patch(`${BASEURL}/api/update/customers/${params.id}`, {
        customer_Name: customerName,
        phone_No: phoneno,
        address:address,
        zip_code:zipcode,
        email:email
      })

      .then((res) => {
        console.log("result=>", res);
        setRender(prev=>!prev)
        navigate(-1)
        toast("Updated Customer Successfully", { type: "success" });
        setLoader(false)

      })
      .catch((err) => {
        console.log(err);
      });
  };

  
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Custom_loader open={loader}/>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className="customer">
            <Typography component="h1" variant="h5">
              Edit Customer
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
                label="Edit Customer Name"
                autoComplete="Edit Customer Name"
                size="small"
                variant="outlined"
                value={customerName}
                onChange={(e) => setCutomerName(e.target.value)}
              />
              <div className="combineBox">
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Edit Phone Number"
                  autoComplete="Edit Phone Number"
                  size="small"
                  value={phoneno}
                  onChange={(e) => setphone(e.target.value)}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Edit Email Address"
                  name="Edit email"
                  autoComplete="Edit email"
                  size="small"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
              </div>

              <div className="combineBox">
                {" "}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Edit Address"
                  size="small"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="Edit Zip Code"
                  label="Edit Zip Code"
                  size="small"
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
                />
              </div>

              {/* <TextField
              margin="normal"
              required
              fullWidth
              name="Edit password"
              label="Edit Password"
              type="Edit password"
              size='small'
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            /> */}

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
