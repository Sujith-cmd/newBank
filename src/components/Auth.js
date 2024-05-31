import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import axios from "axios"
import {useDispatch, useSelector} from "react-redux"
import {authActions} from "../store"
import {useNavigate} from "react-router-dom" 
const Auth = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const selected=useSelector((state)=> state)
  console.log(selected);
  const [isSignup, setIsSignup] = useState(false)
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async (type = "login") => {
    const res = await axios
      .post(`http://localhost:5000/api/user/${type}`, {
        username: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => console.log(err));
    
      if(res==undefined){
        return "Somethinf went wrong"
      }
       const data = await res.data;
      //  console.log(data);
       return data;
     
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if (isSignup) {
      sendRequest("signup")
        .then((data) =>console.log(data) )
        // .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/userHome"));
    } else {
      sendRequest()
        .then((data) => {
          dispatch(authActions.login(data.user))

        }
      )
        
        // .then((data) => localStorage.setItem("userId", data.user._id))
        // .then(() => dispatch(authActions.login(data.user)))
        .then(() =>{
          navigate("/userHome")

        } 
        )
          ;
          
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection={"column"} alignItems="center" justifyContent="center" boxShadow="10px 10px 20px #ccc" padding={3} margin="auto" marginTop={5}
        borderRadius={5} maxWidth={400}>
          <Typography  variant="h2" padding={3} textAlign="center">
           {isSignup? "Signup":"login"}
          </Typography >
          {isSignup && (
            <TextField
              name="name"
              onChange={handleChange}
              value={inputs.name}
              placeholder="Name"
              margin="normal"
            />  
          )}{" "}
          <TextField
            name="email"
            onChange={handleChange}
            value={inputs.email}
            type={"email"}
            placeholder="Email"
            margin="normal"
          />
          <TextField
            name="password"
            onChange={handleChange}
            value={inputs.password}
            type={"password"}
            placeholder="Password"
            margin="normal"
          /><Button
            type="submit"
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3 }}
            color="warning"
          >
            Submit
          </Button>
          <Button
           onClick={()=>setIsSignup(!isSignup)}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
           {isSignup?"Login" :"Signup"}
          </Button>
        </Box>
      </form>
    </div>
  )
}

export default Auth