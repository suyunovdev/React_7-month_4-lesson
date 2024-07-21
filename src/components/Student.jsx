import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { mainListItems } from "./ListItems";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Stack } from "react-bootstrap";
import './StudentApp.css';
import { Person } from "@mui/icons-material";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const defaultTheme = createTheme();

const Dashboard = () => {
  const [open, setOpen] = useState(true);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGroup, setFilterGroup] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editGroup, setEditGroup] = useState('');
  const [editId, setEditId] = useState(null);
  const [showLogout, setShowLogout] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/student');
        const data = await response.json();
        setStudents(data);
        setFilteredStudents(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleAdd = () => {
    setIsEditing(false);
    setEditFirstName('');
    setEditLastName('');
    setEditGroup('');
    setShowModal(true);
  };

  const handleEdit = (id, firstname, lastname, group) => {
    setIsEditing(true);
    setEditFirstName(firstname);
    setEditLastName(lastname);
    setEditGroup(group);
    setEditId(id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setStudents(students.filter(student => student.id !== id));
    toast.success('Student deleted successfully');
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleSave = () => {
    if (isEditing) {
      setStudents(students.map(student => 
        student.id === editId ? { ...student, firstname: editFirstName, lastname: editLastName, group: editGroup } : student
      ));
      toast.success('Student updated successfully');
    } else {
      const newStudent = {
        id: students.length + 1,
        firstname: editFirstName,
        lastname: editLastName,
        group: editGroup
      };
      setStudents([...students, newStudent]);
      toast.success('Student added successfully');
    }
    setShowModal(false);
  };

  useEffect(() => {
    const filtered = students.filter(student =>
      student.firstname.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterGroup === '' || student.group === filterGroup)
    );
    setFilteredStudents(filtered);
  }, [searchTerm, filterGroup, students]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Student
            </Typography>
            <IconButton color="inherit">
              <Badge className="badgers" badgeContent={4} sx={{ flexGrow: 1 }} color="secondary">
                <Person onClick={handleLogout} />
                <p style={{ fontSize: 14 }} onClick={handleLogout}>Logout </p>
              </Badge>
            </IconButton>
            {showLogout && (
              <Button variant="contained" color="secondary" onClick={handleLogout} style={{ marginLeft: '16px' }}>
                Logout
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">{mainListItems}</List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container   >
            <Grid className="grids">
              <Stack>
                <h1 className="text-center">Student List</h1>
                <Stack>
                  <div className='biggest'>
                    <div className="search-bar">
                      <TextField
                        className='searches'
                        type="text"
                        label="Search by first name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />
                    </div>
                    <div className="filter-group">
                      <TextField
                        select
                        label="Filter by group"
                        value={filterGroup}
                        onChange={(e) => setFilterGroup(e.target.value)}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="N59">N59</MenuItem>
                        <MenuItem value="N58">N58</MenuItem>
                        <MenuItem value="N50">N50</MenuItem>
                        <MenuItem value="N55">N55</MenuItem>
                      </TextField>
                    </div>
                     <Button variant="contained" onClick={handleAdd} className="btn btn-primary adds">Add Student</Button>
                  </div>
                </Stack>
               
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Group</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => (
                      <tr key={student.id}>
                        <td>{student.firstname}</td>
                        <td>{student.lastname}</td>
                        <td>{student.group}</td>
                        <td className="actionss">
                          <button
                            className="btn btn-primary mr-2 cool" 
                            onClick={() => handleEdit(student.id, student.firstname, student.lastname, student.group)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger delete"
                            onClick={() => handleDelete(student.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Stack>
            </Grid>
          </Container>
        </Box>
      </Box>
      <ToastContainer />
      <Modal
        open={showModal}
        onClose={handleCancel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius:2,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {isEditing ? 'Edit Student' : 'Add Student'}
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="First Name"
            value={editFirstName}
            onChange={(e) => setEditFirstName(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Last Name"
            value={editLastName}
            onChange={(e) => setEditLastName(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            select
            label="Group"
            value={editGroup}
            onChange={(e) => setEditGroup(e.target.value)}
          >
            <MenuItem value="N59">N59</MenuItem>
            <MenuItem value="N58">N58</MenuItem>
            <MenuItem value="N50">N50</MenuItem>
            <MenuItem value="N55">N55</MenuItem>
          </TextField>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
          <Button onClick={handleCancel} variant="contained" color="secondary" style={{ marginLeft: '8px' }}>
            Cancel
          </Button>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default Dashboard;
