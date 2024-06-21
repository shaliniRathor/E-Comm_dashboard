import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BASEURL, ImageDb } from "../../config";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import Custom_loader from "../../Custom_loader";

// import Backdrop from '@mui/material/Backdrop';
// import CircularProgress from '@mui/material/CircularProgress';


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const defaultTheme = createTheme();

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function Add_products() {
  const [product_name, setproduct_name] = React.useState("");
  const [price, setprice] = React.useState("");
  const [category, setcategory] = React.useState("");
  const [quantity, setquantity] = React.useState("");
  const [description, setdescription] = React.useState("");
  const [render, setRender] = React.useState("");
  const [productImage, setProductImage] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  

  const navigate = useNavigate();
  console.log("productImage=>", productImage);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productImage.length) {
      return toast("please add image!!",{type:"error"})
    }
    setOpen(true)
    

    let myarrImg = []
    for (let i=0; i<productImage?.length; i++){
      console.log("enter in loop", i);
      const imagereference= ref(ImageDb,`productImageFile/${v4()}`)
      console.log(imagereference);
       
      await uploadBytes(imagereference,productImage[i]).then(
        async(value)=>{
          console.log(value);
          await getDownloadURL(value.ref)
          .then((urlLink)=>{
            myarrImg?.push({
              image_url:urlLink,
              image_name: "my product Image.png"
            })
          })
        }
      )
    }

    console.log("update myImgArr =>", myarrImg);

    axios
      .post(`${BASEURL}/api/create/new/products`, {
        product_name,
        price,
        category,
        quantity,
        description,
        image: myarrImg,
      })

      .then((res) => {
        console.log("result=>", res);
        setproduct_name("");
        setprice("");
        setcategory("");
        setquantity("");
        setdescription("");
        setProductImage([]);
        toast("New Product Added Successfully", { type: "success" });
        setOpen(false)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const handleImageUpload = (e) => {
  //   // console.log("my new images==>>",e.target?.files);
  //   const allImages = [...e.target?.files];
  //   // console.log("ALL IMAGES VAR====>>",allImages);
  //   setProductImage(allImages);
  // };

  return (
    <>
    <Custom_loader open={open}/>


      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className="customer">
            <Typography component="h1" variant="h5">
              Add Product
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
                sx={{ mt: 1 }}
                label="Product Name"
                autoComplete="Product Name"
                size="small"
                variant="outlined"
                value={product_name}
                onChange={(e) => setproduct_name(e.target.value)}
              />

              <div className="combineBox">
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="Price"
                  label="Price"
                  autoComplete="Price"
                  size="small"
                  value={price}
                  onChange={(e) => setprice(e.target.value)}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Quantity"
                  size="small"
                  value={quantity}
                  onChange={(e) => setquantity(e.target.value)}
                />
              </div>

              <TextField
                margin="normal"
                required
                fullWidth
                name="Category"
                label="category"
                autoComplete="Category "
                size="small"
                value={category}
                onChange={(e) => setcategory(e.target.value)}
              />

              {/* -------------------------------------upload button-------------------------------------- */}
              <Button 
                component="label"
                role={undefined}
                variant="text"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                // onClick={handleImage}
                >
             


                Upload Image
                <VisuallyHiddenInput
                  accept="image/*"
                  multiple
                  // onChange={handleImageUpload}
                  // onChange={(e) => setProductImage([...e.target?.files])}
                  // type="file"

                  onChange={(e)=>setProductImage([...e.target.files])}
                   type="file"

                  // }}
                />
              </Button>

              {productImage && productImage?.length && productImage?.length > 0
                ? productImage?.map((val) => (
                    <div className="imageSetup">
                      <img
                        src={URL.createObjectURL(val)}
                        alt="no Image"
                        height={50}
                        width={50}
                      />
                      <p style={{ fontSize: "16px" }}>{val?.name}</p>
                    </div>
                  ))
                : null}
              {/* <img src={productImage?.length > 0 ?  URL?.createObjectURL(productImage[0]):""} alt="no Image" height={80} width={80} /> */}
              {/* <img src={emptyImage} alt="no Image" height={80} width={80} /> */}
              {/* <img src={productImage ? URL.createObjectURL (productImage): emptyImage} alt="no Image" height={80} width={80} /> */}

              <TextField
                margin="normal"
                required
                fullWidth
                name="Description"
                label="Description"
                size="small"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setdescription(e.target.value)}
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
