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

const defaultTheme = createTheme();



export default function Update_products() {
  const [updateproduct_name, setupdateproduct_name] = React.useState("");
  const [updateprice, setupdateprice] = React.useState("");
  const [updatecategory, setupdatecategory] = React.useState("");
  const [updatequantity, setupdatequantity] = React.useState("");
  const [updatedescription, setupdatedescription] = React.useState("");
  const [render, setRender] = React.useState("");

  useEffect(()=>{
    getProduct();
  },[render])

  const navigate = useNavigate();
  const params= useParams()
  console.log("params=>",params);

  const getProduct= async()=>{
    await axios.get(`${BASEURL}/api/get/single/product/${params.id}`)
    .then((res) =>{
      console.log("res=>",res);
      setupdateproduct_name(res?.data?.data?.product_name)
      setupdateprice(res?.data?.data?.price)
      setupdatequantity(res?.data?.data?.quantity)
      setupdatecategory(res?.data?.data?.category)
      setupdatedescription(res?.data?.data?.description)
    })
    .catch((err)=>{
      console.log(err);
    })
  
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("update customer=>");
    axios.patch(`${BASEURL}/api/update/products/${params.id}`, {
      product_name :updateproduct_name,
      price:updateprice,
      category:updatecategory,
       quantity:updatequantity,
       description:updatedescription
      })

      .then((res) => {
        console.log("res=>", res);
        setRender(prev=>!prev)
        navigate(-1)
         toast("Update Product Successfully", { type: "success" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className="customer">
            <Typography component="h1" variant="h5">
              Edit Product
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
                label="Edit Product Name"
                autoComplete="Edit Product Name"
                size="small"
                variant="outlined"
                value={updateproduct_name}
                onChange={(e) => setupdateproduct_name(e.target.value)}
              />

              {/* <input type="file" id="myFile" name="filename" /> */}
              {/* <Button
               component="label"
               role={undefined}
               variant="contained"
               tabIndex={-1}
      
               >
                  Upload file
                   <VisuallyHiddenInput type="file" />
                  </Button> */}

              <div className="combineBox">
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Edit Price"
                  autoComplete="Edit Price"
                  size="small"
                  value={updateprice}
                  onChange={(e) => setupdateprice(e.target.value)}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="Edit Quantity"
                  label="Quantity"
                  size="small"
                  value={updatequantity}
                  onChange={(e) => setupdatequantity(e.target.value)}
                />
              </div>

              <TextField
                margin="normal"
                required
                fullWidth
                label="Edit Category"
                autoComplete="Edit Category "
                size="small"
                value={updatecategory}
                onChange={(e) => setupdatecategory(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="Edit Description"
                label="Edit Description"
                size="small"
                multiline
                rows={4}
                value={updatedescription}
                onChange={(e) => setupdatedescription(e.target.value)}
              />

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
                  GO Back
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

