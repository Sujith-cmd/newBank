import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from "axios";

const UserHome = () => {
  const userId = useSelector((state) => state.auth?.user._id);
  const userDetails = useSelector((state) => state.auth.user);
  const [allUsers, setAllUsers] = useState([]);
  const [transferAmount, setTransferAmount] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
useEffect(() => {
   if(transferAmount>userDetails.accountBal){
    alert("no sufficient amount")
   }
}, [transferAmount])
  useEffect(() => {
    userListing();
  }, []);

  const userListing = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/user/getAllUsers/${userId}`);
      setAllUsers(res.data.users);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleTransfer = async (amount, recipientId,userId) => {
    if(transferAmount>userDetails.accountBal){
      alert("no sufficient amount")
     }else{

       try {
         const res = await axios.post(`http://localhost:5000/api/user/transfer/${userId}/${amount}`, {
           
           transferId:recipientId,
           
          });
          console.log("Transfer successful:", res.data);
          // Optionally, you can update the UI to reflect the successful transfer
        } catch (err) {
          console.error("Error transferring amount:", err);
        }
      }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "2rem" }}>
        <div style={{}}>

          <h3>User Home</h3>
          <h3>name:{userDetails.username}</h3>
          <h3>email:{userDetails.email}</h3>
          <h3>accountBal:{userDetails.accountBal}</h3>
        </div>
      {allUsers.map((user, index) => (
        <div key={index} style={{fontSize:"20px",fontWeight:"600",color:"white", height: "50px", backgroundColor: "green", display: "flex", alignItems: "center", justifyContent: "space-between", minWidth: "1400px", padding: "2rem", marginTop: "2rem",borderRadius:"5%" }}>
          <div style={{ height: "50px", display: "flex", alignItems: "center", marginLeft: "5%" }}>
            <img src='https://media.istockphoto.com/id/1327592420/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=aAIjqieKoc81QA6iaU4Yq40v_iAjJuYhstSgWy75r2k=' alt='avatar' style={{ height: "70px", borderRadius: "50%" }} />
          </div>
          <div >
           <p > {user.email}</p>
          </div>
          <div>
            {user.accountBal}
          </div>
          <div>
            <input style={{height:"30px",marginLeft:"2rem"}} type="number"  onChange={(e) => setTransferAmount(e.target.value)} />
            <button style={{height:"30px",marginLeft:"2rem",fontWeight:"600"}} onClick={() => handleTransfer(transferAmount, user?._id,userId)}>Transfer</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserHome;
