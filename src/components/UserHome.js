import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from "axios";

const UserHome = () => {
  const userId = useSelector((state) => state.auth.user._id);
  const [allUsers, setAllUsers] = useState([]);
  const [transferAmount, setTransferAmount] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');

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
    try {
      const res = await axios.post(`http://localhost:5000/api/user/transfer/${userId}/${amount}`, {
      
      transferId:recipientId,
       
      });
      console.log("Transfer successful:", res.data);
      // Optionally, you can update the UI to reflect the successful transfer
    } catch (err) {
      console.error("Error transferring amount:", err);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "2rem" }}>
      {allUsers.map((user, index) => (
        <div key={index} style={{ height: "120px", backgroundColor: "green", display: "flex", alignItems: "center", justifyContent: "space-between", minWidth: "1400px", padding: "2rem", marginTop: "2rem" }}>
          <div style={{ height: "100px", display: "flex", alignItems: "center", marginLeft: "5%" }}>
            <img src='https://media.istockphoto.com/id/1327592420/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=aAIjqieKoc81QA6iaU4Yq40v_iAjJuYhstSgWy75r2k=' alt='avatar' style={{ height: "70px", borderRadius: "50%" }} />
          </div>
          <div>
            {user.email}
          </div>
          <div>
            {user.accountBal}
          </div>
          <div>
            <input type="number"  onChange={(e) => setTransferAmount(e.target.value)} />
            <button onClick={() => handleTransfer(transferAmount, user._id,userId)}>Transfer</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserHome;
