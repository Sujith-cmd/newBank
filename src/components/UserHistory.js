import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from "axios";

const UserHistory = () => {
  const userId = useSelector((state) => state.auth.user._id);
  const [historyData, setHistoryData] = useState([])
  useEffect(() => {
  const tHistory = async () => {

       try {
         const res = await axios.get(`http://localhost:5000/api/user/getTransaction/${userId}`);
          // console.log("Transfer successful:", res.data);
          // Optionally, you can update the UI to reflect the successful transfer
          const test=res.data.users
          console.log("test",test);
          if(res.status==200){

            setHistoryData([...res.data.users])
          }
        } catch (err) {
          console.error("Error transferring amount:", err);
        }
      
  };
 
    tHistory()
  
  }, [])
 
  return (
    <div>
      {historyData.map((user, index) => (
        <div style={{color:"white",fontSize:"20px"}} key={index} style={{borderRadius:"5%",maxWidth:"1000px", height: "10vh", backgroundColor: "green", display: "flex", alignItems: "center", justifyContent: "space-between", minWidth: "400px", padding: "2rem", marginTop: "2rem",marginLeft:"auto",marginRight:"auto" }}>
          
          <div style={{color:"white",fontSize:"20px"}}>
            receiver : {user.receiver.username}
          </div>
          <div style={{color:"white",fontSize:"20px"}}>
            sender :{user.sender.username}
          </div>
          <div style={{color:"white",fontSize:"20px"}}>
           amount :{user.amount}
          </div>
        </div>
      ))}
    </div>
  )
}

export default UserHistory