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
import { Box, FormControl, InputLabel, Select } from "@mui/material";
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

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

export default function Edit_category() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [category, setCategory] = React.useState("");
  const [All_category,setAllCategory]=React.useState('')

  const navigate= useNavigate()

 

  
    //  const geteditcategory=async()=>{
    //   await axios.get(`${BASEURL}/api/get/all/category`)
    //   .then((res)=>{
    //     console.log("res=>",res);
    //     setAllCategory(res.data.data)
    //   })
    //   .catch(err=>{
    //     console.log(err);
    //   })
    //  }
    const handleCategory=async()=>{
      console.log("function run=>");
    if (!category) {
      return alert('Please Fill The Category')
    }
    await axios.post(`${BASEURL}/api/create/new/category`,{
      category_name:category
     })
     .then ((res)=>{
      console.log("res=>",res);
      setCategory('')
      toast('New Category Added Successfully',{type:'success'})
      
     })
     .catch(err=>{
      console.log(err);
     })

      
    }
  return (
    <div>
      {/* popup for add category  */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
     <div>
   
        

        {/* button */}
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Category
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="Add Category"
              label="Add Category"
              sx={{ mt: 3, mb: 2 }}
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
            />
          </Typography>

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
              save
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
          />
          <Button variant="contained">Search</Button>
        </div>
        <Button onClick={handleOpen} variant="contained">
          Add Category
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Image Image</TableCell>
              <TableCell align="center">Category Name</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {All_category?.length>0 && All_category.map((row) => (
              <TableRow
                key={row.image}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.category_name}</TableCell>

                <TableCell align="right">
                  <div className="deleteEdit">
                    <EditIcon
                      fontSize="small"
                      style={{ color: config.global_color }}
                    />
                    <DeleteIcon fontSize="small" style={{ color: "red" }} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
