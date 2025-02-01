import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Avatar, Select, MenuItem, FormControl, InputLabel, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';
import Rating from '@mui/material/Rating'; // Import Rating from MUI

const AdminHome = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [users, setUsers] = useState([]);
  const [adminName, setAdminName] = useState('');
  const [open, setOpen] = useState(false); // Modal open state
  const [selectedUserId, setSelectedUserId] = useState(null); // Store selected user's ID
  const [selectedRole, setSelectedRole] = useState(''); // Store selected role
  const [roles] = useState(['admin', 'user']); // Example roles: ['admin', 'user']

  // Fetch feedback data and user data from the backend
  useEffect(() => {
    // Fetch feedbacks
    axios.get('http://localhost:3001/admin/feedback', { withCredentials: true })
      .then(response => {
        setFeedbacks(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching feedback data!", error);
      });

    // Fetch users
    axios.get('http://localhost:3001/admin/users', { withCredentials: true })
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching users data!", error);
      });

    // Fetch the admin's name
    axios.get('http://localhost:3001/user', { withCredentials: true })
      .then(response => {
        if (response.data.user) {
          setAdminName(response.data.user.name);
        }
      })
      .catch(error => {
        console.error("There was an error fetching the admin's name!", error);
      });
  }, []);

  // Open the edit modal
  const handleEditClick = (userId, currentRole) => {
    setSelectedUserId(userId);
    setSelectedRole(currentRole);
    setOpen(true); // Open the modal
  };

  // Close the edit modal
  const handleClose = () => {
    setOpen(false);
  };

  // Handle role change
  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  // Save the updated role
  const handleSave = () => {
    // Send the updated role to the backend
    axios.put(`http://localhost:3001/admin/users/${selectedUserId}`, { role: selectedRole }, { withCredentials: true })
      .then(() => {
        setUsers((prevUsers) => 
          prevUsers.map((user) =>
            user._id === selectedUserId ? { ...user, role: selectedRole } : user
          )
        );
        handleClose(); // Close the modal after saving
      })
      .catch((error) => {
        console.error("There was an error updating the role!", error);
      });
  };

  return (
    <Box sx={{ padding: "2rem", backgroundColor: "#f4f4f4", minHeight: "100vh" }}>
      {/* Welcome Admin Message */}
      <Paper elevation={3} sx={{ padding: "2rem", borderRadius: "12px", backgroundColor: "#fff", marginBottom: "2rem" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333", marginBottom: "1rem" }}>
          Welcome, Admin {adminName || 'Admin'}!
        </Typography>
      </Paper>

      {/* Users Section */}
      <Box sx={{ marginBottom: "2rem" }}>
        <Paper elevation={3} sx={{ padding: "2rem", borderRadius: "12px", backgroundColor: "#fff" }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333", marginBottom: "1rem" }}>
            Users:
          </Typography>

          <TableContainer component={Paper} sx={{ marginBottom: "2rem" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ marginRight: 2 }}>{user.name[0]}</Avatar>
                        {user.name}
                      </Box>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      {/* Edit button */}
                      <Button variant="contained" color="secondary" onClick={() => handleEditClick(user._id, user.role)}>Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

      {/* Feedback Section */}
      <Box>
        <Paper elevation={3} sx={{ padding: "2rem", borderRadius: "12px", backgroundColor: "#fff" }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333", marginBottom: "1rem" }}>
            Feedbacks:
          </Typography>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Comment</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {feedbacks.map((feedback) => (
                  <TableRow key={feedback._id}>
                    <TableCell>{feedback.name}</TableCell>
                    <TableCell>
                      <Rating
                        name="feedback-rating"
                        value={feedback.rating}
                        readOnly
                        precision={0.5}
                      />
                    </TableCell>
                    <TableCell>{feedback.comment}</TableCell>
                    <TableCell>{new Date(feedback.createdAt).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

      {/* Edit Role Modal */}
<Dialog
  open={open}
  onClose={handleClose}
  sx={{
    "& .MuiDialog-paper": {
      width: "500px", 
      maxWidth: "80%",
      padding: "16px", // Add padding for better spacing
    },
  }}  // Adjust the width and padding
>
  <DialogTitle sx={{ wordWrap: "break-word" }}>Edit User Role</DialogTitle>
  <DialogContent sx={{ paddingBottom: "16px" }}>
    <FormControl fullWidth sx={{ marginTop: "16px" }}>
      <InputLabel id="role-select-label" sx={{ whiteSpace: "normal" }}>Role</InputLabel>
      <Select
        labelId="role-select-label"
        value={selectedRole}
        onChange={handleRoleChange}
        label="Role"
      >
        {roles.map((role) => (
          <MenuItem key={role} value={role}>
            {role}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </DialogContent>
  <DialogActions sx={{ justifyContent: "space-between" }}>
    <Button onClick={handleClose} color="primary">
      Cancel
    </Button>
    <Button onClick={handleSave} color="primary">
      Save
    </Button>
  </DialogActions>
</Dialog>

    </Box>
  );
};

export default AdminHome;
