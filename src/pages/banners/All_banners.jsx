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
import { BASEURL } from "../../config";
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
import noImage from "../../asset/picture.png";
import Custom_loader from "../../Custom_loader";
import AddIcon from "@mui/icons-material/Add";

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

export default function All_banners
() {

  //--------------------all----------------------//
  const [All_banners , setAllBannrs ] = React.useState([]);

  //--------------------update-------------------//
  const [render, setRender] = React.useState(false);
  //--------------loader-----------------//
  const [loader, setloader] = React.useState(false);

  

  React.useEffect(() => {
    getAllBanner();
  }, [render]);

  const getAllBanner = async () => {
    await axios
      .get(`${BASEURL}/api/get/all/banners`)
      .then((res) => {
        console.log("res=>", res);
        setAllBannrs
        (res.data.data);
      })
      .catch((err) => {
        console.log("err=>", err);
      });
  };

  //------------------image store----------------//
  const [image, setImage] = React.useState(null);

  const addBannerImage = async (e) => {
    let fileImage = e.target.files[0];

    const imageRef = ref(ImageDb, `imageupload/${v4()}`);
    let myImg = {
      image_url: "",
      image_name: "",
      path: "",
    };

    await uploadBytes(imageRef, fileImage).then(async (value) => {
      // console.log(value);
      await getDownloadURL(value.ref).then((downloadLink) => {
        myImg.image_name = fileImage.name;
        myImg.image_url = downloadLink;
      });
    });

    await axios
      .post(`${BASEURL}/api/create/new/banners`, {
        ...myImg,
      })
      .then((res) => {
        console.log("res=>>", res);
        toast("Add Product Successfully", { type: "success" });
        setRender((prev) => !prev);
        setloader(false);
      });
  };

  const updateBannerImage = async (e, id) => {
    let fileImage = e.target.files[0];

    const imageRef = ref(ImageDb, `imageupload/${v4()}`);
    let myImg = {
      image_url: "",
      image_name: "",
      path: "",
    };

    await uploadBytes(imageRef, fileImage).then(async (value) => {
      // console.log(value);
      await getDownloadURL(value.ref).then((downloadLink) => {
        myImg.image_name = fileImage.name;
        myImg.image_url = downloadLink;
      });
    });

    await axios
      .patch(`${BASEURL}/api/update/banners/${id}`, {
        ...myImg,
      })
      .then((res) => {
        console.log("res=>>", res);
        toast("Add Product Successfully", { type: "success" });
        setRender((prev) => !prev);
        setloader(false);
      });
  };


  const handleDelete = async (id) => {
    setloader(true);
    let deleteBox = window.confirm("do you want to delete Bannerr");
    if (!deleteBox) {
      return;
    }
    await axios
      .delete(`${BASEURL}/api/delete/banners/${id}`)
      .then((res) => {
        console.log("deletes", res);
        setRender((prev) => !prev);

        toast.error("Deleted Banner");
        setloader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };


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
      {/*----------------------------------------- popup for add Banner
r --------------------------------------- */}

      <Modal
       

        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <Custom_loader open={loader} />
          {/*--------------------- button------------------------- */}
          <Box sx={style}>
            <div>
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

            {/*------------------------- upload button --------------------------------*/}
            <Button
              component="label"
              role={undefined}
              variant="text"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}

              // onClick={handleImage}
            >
              Edit Banner
              <VisuallyHiddenInput
                type="file"
                onChange={(e) => {
                  console.log(e.target.files);
                  setImage(e.target.files[0]);
                }}
              />
            </Button>
            <img
              src={image ? URL.createObjectURL(image) : noImage}
              alt="no image"
              height={80}
              width={80}
            />
            <p>{image?.name}</p>

            {/* button */}
          </Box>
        </div>
      </Modal>
      {/*------------------------------------- EDIT Banner
r -------------------------------------*/}

      <div className="searchField">
        <div className="innerflex"></div>
        <div>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<AddIcon />}

            // onClick={handleImage}
          >
            Add Banner
            <VisuallyHiddenInput
              type="file"
              onChange={(e) => {
                console.log(e.target.files);
                // setImage(e.target.files[0]);

                addBannerImage(e);
              }}
            />
          </Button>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Image </TableCell>
              <TableCell align="center">Banner Name</TableCell>
              <TableCell align="center">Publish Date</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {All_banners
            ?.length > 0 ? (
              All_banners
              .map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <img src={row?.image_url} alt="" height={100} width={215} style={{borderRadius:6}} />
                  </TableCell>
                  <TableCell align="center">{row.image_name}</TableCell>
                  <TableCell align="center">
                    {new Date(row?.createdAt).getDate()}/
                    {new Date(row?.createdAt).getMonth()}/
                    {new Date(row?.createdAt).getFullYear()} Time:{" "}
                    {new Date(row?.createdAt).getDay()}:
                    {new Date(row?.createdAt).getTime()}
                  </TableCell>

                  <TableCell align="right">
                    <div className="deleteEdit">
                      {/* <EditIcon
                        // onClick={() => openEditBanner
                  rModal(row)}
                        fontSize="small"
                        style={{ color: config.global_color }}
                        // <EditIcon onClick={()=>handleUpdate(row?._id)} fontSize="small" style={{ color: config.global_color }}
                      /> */}

                      <Button
                        startIcon={<EditIcon />}

                        // onClick={handleImage}
                      >
                        <VisuallyHiddenInput
                          type="file"
                          onChange={(e) => {
                            console.log(e.target.files);
                            // setImage(e.target.files[0]);

                            updateBannerImage(e, row._id);
                          }}
                        />
                      </Button>
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
