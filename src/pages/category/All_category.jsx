import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import config, { BASEURL } from "../../config";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import noSearchinf from "../../asset/Animation - 1716965132359.gif";
import { ImageDb } from "../../config";
import { v4 } from "uuid";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import noImage from '../../asset/picture.png'
import Custom_loader from "../../Custom_loader";


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

export default function All_category() {
  //-------------------- add ---------------//
  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = React.useState("");

  //--------------------all----------------------//
  const [All_category, setAllCategory] = React.useState([]);

  //--------------------update-------------------//
  const [editOpen, setEditOPen] = React.useState(false);
  const [editCategory, seteditCategory] = React.useState("");
  const [editCateData, seteditCateData] = React.useState({});
  const [searchField, setSearchField] = React.useState("");
  const [render, setRender] = React.useState(false);
  //--------------loader-----------------//
  const[loader,setloader]=React.useState(false)



  //-------------------add-----------------------//
  const handleOpen = () => {
    console.log("OPEN ADD MODAL");
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //-----------------edit----------=------------//
  const edithandleOpen = () => {
    console.log("OPEN EDIT MODAL");

    setEditOPen(true);
  };
  const edithandleClose = () => {
    setEditOPen(false);
  };

  React.useEffect(() => {
    getAllcategory();
  }, [render, searchField]);

  //-------------------upload image----------------//

  // const handleImage = async () => {
  //   if (image !== null) {
  //     const imageRef = ref(ImageDb, `imageupload/${v4()}`);
  //     console.log("imageref=>", imageRef);
  //     uploadBytes(imageRef, image).then((value) => {
  //       console.log(value);

  //       getDownloadURL(value.ref).then((url) => {
  //         console.log("url=>", url);
  //         setImageUrl((data) => [...data, url]);
  //       });
  //     });
  //   }
  // };

  const getAllcategory = async () => {
    await axios
      .get(`${BASEURL}/api/get/all/category?searchData=${searchField}`)
      .then((res) => {
        console.log("res=>", res);
        setAllCategory(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // console.log("imgURL=>", imgURL);

    //------------------image store----------------//
    const [image, setImage] = React.useState(null);
    // const [imgURL, setImageUrl] = React.useState("");

  const handleCategory = async () => {
    console.log("function run=>");
    if (!category) {
      return toast("fill the category",{type:"error"}) ;
    }
    setloader(true)
    let myImg ={
      image_url:"",
      image_name:"",
      path:""
    }

    const imageRef = ref(ImageDb, `imageupload/${v4()}`);
    // console.log("imageref=>", imageRef);
    // console.log("image==>",image);
   await uploadBytes(imageRef, image)
    .then(async(value) => {
      // console.log(value);
    await  getDownloadURL(value.ref)
      .then(downloadLink=>{
        // console.log("url=>",downloadLink);
        myImg.image_name = "my Name.png"
        myImg.image_url=downloadLink
  
      })
    })
   
    // console.log("myImg=>",myImg);
    await axios
      .post(`${BASEURL}/api/create/new/category`, {
        category_name: category,
        ...myImg
       

      })
      .then((res) => {
        console.log("res=>", res);
        setCategory("");
        toast("New Category Added Successfully", { type: "success" });
        setRender((prev) => !prev);
        setImage(null)
        setloader(false)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditSave = async () => {
    setloader(true)
    await axios
      .patch(`${BASEURL}/api/update/category/${editCateData._id}`, {
        category_name: editCategory,
      })
      .then((res) => {
        console.log("res=>>", res);
        toast("Update Product Successfully", { type: "success" });
        setRender((prev) => !prev);
        edithandleClose();
        setloader(false)
      });
  };

  const handleDelete = async (id) => {
    let deleteBox = window.confirm("do you want to delete category");
    if (!deleteBox) {
      return;
    }
    await axios
      .delete(`${BASEURL}/api/delete/category/${id}`)
      .then((res) => {
        console.log("deletes", res);
        setRender((prev) => !prev);

        toast.error("deleted category");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // open edit category modal
  const openEditCategoryModal = async (item) => {
    console.log("item for edit=>", item);
    seteditCateData(item);
    seteditCategory(item?.category_name);
    edithandleOpen();
  };
  // open edit category modal

  console.log("item on use State=>", editCateData);

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

  return (
    <div>
     
      {/*----------------------------------------- popup for add category --------------------------------------- */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
        <Custom_loader open={loader}/>
          {/*--------------------- button------------------------- */}
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Category
            </Typography>

            
            <Typography id="modal-modal-description" sx={{ mt: 0 }}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="Add Category"
                label="Add Category"
                sx={{ mt: 3, mb: 2 }}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Typography>

            <div>
              {/*------------------------- upload button --------------------------------*/}
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
                type="file"
                onChange={(e) => {
                  console.log(e.target.files);
                  setImage(e.target.files[0]);
    
                }}
              />
            </Button>

            </div>
            <img src={image ? URL.createObjectURL(image) : noImage} alt="no image" height={80} width={80} />
                <p>{image?.name}</p>

            <div className="combineBox">
              <Button
                onClick={handleClose}
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
              >
                Cancel
              </Button>

              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleCategory}
              >
                Save
              </Button>
            </div>

            {/* button */}
          </Box>
        </div>
      </Modal>
      {/*------------------------------------- EDIT CATEGORY -------------------------------------*/}

      <Modal open={editOpen} onClose={edithandleClose}>

        <div>
          {/* button */}
      <Custom_loader open={loader}/>
          <Box sx={style}>
            <Typography id="modal-modal-title1" variant="h6" component="h2">
              Edit Category
            </Typography>
            <Typography id="modal-modal-description1" sx={{ mt: 2 }}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="Edit Category"
                label="Edit Category"
                sx={{ mt: 3, mb: 2 }}
                value={editCategory}
                onChange={(e) => seteditCategory(e.target.value)}
              />
            </Typography>

            <div className="combineBox">
              <Button
                onClick={edithandleClose}
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
              >
                Cancel
              </Button>

              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleEditSave}
              >
                save Changes
              </Button>
            </div>

            {/* button */}
          </Box>
        </div>
      </Modal>

      <div className="searchField">
        <div className="innerflex">
          <TextField
            size="small"
            id="outlined-basic"
            label="Search Category"
            variant="outlined"
            onChange={(e) => setSearchField(e.target.value)}
          />
          <Button value={searchField} variant="contained">
            Search
          </Button>
        </div>
        <Button onClick={handleOpen} variant="contained">
          Add Category
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Image </TableCell>
              <TableCell align="center">Category Name</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {All_category?.length > 0 ? (
              All_category.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <img src={row?.image_url} alt="" height={100} width={100} />
                  </TableCell>
                  <TableCell align="center">{row.category_name}</TableCell>

                  <TableCell align="right">
                    <div className="deleteEdit">
                      <EditIcon
                        onClick={() => openEditCategoryModal(row)}
                        fontSize="small"
                        style={{ color: config.global_color }}
                        // <EditIcon onClick={()=>handleUpdate(row?._id)} fontSize="small" style={{ color: config.global_color }}
                      />
                      <DeleteIcon
                        onClick={() => handleDelete(row?._id)}
                        fontSize="small"
                        style={{ color: "red" }}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableCell colSpan={8} align="center">
                <img src={noSearchinf} alt="nofoundlogo" />
                <h3>No Result Found</h3>
              </TableCell>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
