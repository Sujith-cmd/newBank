// import { Box, Button, TextField, Typography } from '@mui/material'
// import React, { useEffect, useState } from 'react'
// import axios from "axios"
// import {useDispatch, useSelector} from "react-redux"
// import {authActions} from "../store"
// import {useNavigate} from "react-router-dom" 
// const Auth = () => {
//   const navigate=useNavigate()
//   const dispatch=useDispatch()
//   const selected=useSelector((state)=> state.auth?.user)
  
//   const [isSignup, setIsSignup] = useState(false)
//   const [inputs, setInputs] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   useEffect(() => {
//   if(selected?.username){
//     setIsSignup(false)
//   }
//   }, [])
//   const handleChange = (e) => {
//     setInputs((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };
//   const sendRequest = async (type = "login") => {
//     const res = await axios
//       .post(`http://localhost:5000/api/user/${type}`, {
//         username: inputs.name,
//         email: inputs.email,
//         password: inputs.password,
//       })
//       .catch((err) => console.log(err));
    
//       if(res==undefined){
//         return "Somethinf went wrong"
//       }
//        const data = await res.data;
      
//        return data;
     
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (isSignup) {
//       sendRequest("signup")
//         .then((data) =>console.log(data) )
//         .then(() => dispatch(authActions.login()))
//         .then(() => navigate("/userHome"));
//     } else {
//       sendRequest()
//         .then((data) => {
//           console.log("dataa",data);
//           dispatch(authActions.login(data.user))
     
//         }
//       ).catch((err)=>{
        
//         console.log("what err0",err);
//       })
        
        
//         .then(() =>{
//           navigate("/userHome")

//         } 
//         )
//           ;
          
//     }
//   };
//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <Box display="flex" flexDirection={"column"} alignItems="center" justifyContent="center" boxShadow="10px 10px 20px #ccc" padding={3} margin="auto" marginTop={5}
//         borderRadius={5} maxWidth={400}>
//           <Typography  variant="h2" padding={3} textAlign="center">
//            {isSignup? "Signup":"login"}
//           </Typography >
//           {isSignup && (
//             <TextField
//               name="name"
//               onChange={handleChange}
//               value={inputs.name}
//               placeholder="Name"
//               margin="normal"
//             />  
//           )}{" "}
//           <TextField
//             name="email"
//             onChange={handleChange}
//             value={inputs.email}
//             type={"email"}
//             placeholder="Email"
//             margin="normal"
//           />
//           <TextField
//             name="password"
//             onChange={handleChange}
//             value={inputs.password}
//             type={"password"}
//             placeholder="Password"
//             margin="normal"
//           /><Button
//             type="submit"
//             variant="contained"
//             sx={{ borderRadius: 3, marginTop: 3 }}
//             color="warning"
//           >
//             Submit
//           </Button>
//           <Button
//            onClick={()=>setIsSignup(!isSignup)}
//             sx={{ borderRadius: 3, marginTop: 3 }}
//           >
//            {isSignup?"Login" :"Signup"}
          
//           </Button>
//         </Box>
//       </form>
//     </div>
//   )
// }

// export default Auth



import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.auth?.user);

  const [isSignup, setIsSignup] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selected?.username) {
      setIsSignup(false);
    }
  }, [selected]);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async (type = "login") => {
    setIsLoading(true);
    try {
      const res = await axios.post(`http://localhost:5000/api/user/${type}`, {
        username: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });

      const data = res.data;
      setIsLoading(false);
      return data;
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputs.email || !inputs.password || (isSignup && !inputs.name)) {
      setError("Please fill in all fields.");
      return;
    }

    const data = await sendRequest(isSignup ? "signup" : "login");
    if (data) {
      dispatch(authActions.login(data.user));
      navigate("/userHome");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection={"column"} alignItems="center" justifyContent="center" boxShadow="10px 10px 20px #ccc" padding={3} margin="auto" marginTop={5}
          borderRadius={5} maxWidth={400}>
          <Typography variant="h2" padding={3} textAlign="center">
            {isSignup ? "Signup" : "Login"}
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          {isSignup && (
            <TextField
              name="name"
              onChange={handleChange}
              value={inputs.name}
              placeholder="Name"
              margin="normal"
            />
          )}
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
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3 }}
            color="warning"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
          <Button
            onClick={() => {
              setIsSignup(!isSignup);
              setError(null);
              setInputs({
                name: "",
                email: "",
                password: "",
              });
            }}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            {isSignup ? "Login" : "Signup"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;
