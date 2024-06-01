import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
const AdminHome = () => {
  const [users,setUsers]=useState([])
  const [total,setTotal]=useState(0)
  
  const handleBlock= async(id)=>{
   try {
     const res = await axios.put(`http://localhost:5000/api/admin/blockUser/${id}`);
      console.log("Transfer blockss:", res.data);
      
    
      setUsers([...res.data.users])
    } catch (err) {
      console.error("Error transferring amount:", err);
    }
 }
useEffect(() => {
 const getUsers= async()=>{
  try {
    const res = await axios.get(`http://localhost:5000/api/admin/getAllUsers`);
     console.log("Transfer ojk:", res.data);
     setTotal(res.data.total)
     setUsers([...res.data.allUsers])

     
   } catch (err) {
     console.error("Error transferring amount:", err);
   }
}
getUsers()
}, [])
useEffect(() => {
 
  console.log("userr",users);
}, [users])
  return (
    <div>
      <AppBar position="sticky" sx={{backgroundColor:"green",height:"100px"}}>
          <Toolbar sx={{backgroundColor:"green",height:"90px",display:"flex",justifyContent:"space-between"}}>
            <Typography variant="h4">
               banking app
            </Typography>
            <Typography variant='h3'sx={{marginLeft:"auto"}}>
            Total Transaction:{total}
        </Typography>
            <Box display="flex" marginLeft="auto" sx={{fontSize:60}}>
               Admin
            </Box>
            <Box display="flex" LinkComponent={Link} to="Auth" marginLeft="auto" sx={{fontSize:20}}>
              <Link to="Auth"> Logout</Link>
            </Box>
          </Toolbar>
         
      </AppBar>
      <Box sx={{height:"80vh",width:"50vw",marginLeft:"auto",marginRight:"auto",marginTop:"2rem"}}>
       
      {users.map((user, index) => (
     <Box>
      {users.map((user, index) => (
        <div key={index} style={{ height: "40px", backgroundColor: "green", display: "flex", alignItems: "center", justifyContent: "space-between", minWidth: "400px", padding: "2rem", marginTop: "2rem" }}>
          <div style={{ height: "40px", display: "flex", alignItems: "center", marginLeft: "5%" }}>
            <img src='https://media.istockphoto.com/id/1327592420/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=aAIjqieKoc81QA6iaU4Yq40v_iAjJuYhstSgWy75r2k=' alt='avatar' style={{ height: "70px", borderRadius: "50%" }} />
          </div>
          <div>
            {user.username}
          </div>
          <div>
            {user.email}
          </div>
          <div>
            {user.access?"true":"access denied"}
          </div>
          <div>
            <button onClick={()=>handleBlock(user._id)} >Block/unblock</button>
          </div>
         
        </div>
      ))}
     </Box>
      ))}
</Box>
    </div>
  )
}

export default AdminHome