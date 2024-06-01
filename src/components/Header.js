import React, { useState } from 'react'
import {AppBar,Box,Button,Tab,Tabs,Toolbar,Typography} from "@mui/material"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../store'
const Header = () => {
  const dispatch=useDispatch()
    const [value,setValue]=useState()
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
   

    return (
      <AppBar position="sticky" sx={{background:"linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(42,63,82,1) 25%, rgba(0,212,255,1) 100%);"}}>
          <Toolbar>
            <Typography variant="h4">
               banking app
            </Typography>
            { isLoggedIn && <Box display="flex" marginRight="auto" marginLeft="auto">
                <Tabs textColor='inherit' value={value} onChange={(e,val)=>setValue(val)}>
                    <Tab LinkComponent={Link} to="/userHome" label="Transfer"></Tab>
                    <Tab LinkComponent={Link} to="userHistory" label="History"></Tab>
                </Tabs>
            </Box>}
            <Box display="flex" marginLeft="auto">
             {!isLoggedIn  && <><Button variant="contained" sx={{margin:1, borderRadius:"10"}} LinkComponent={Link} to="Auth" color="warning">Join us</Button>
                {/* <Button variant="contained" sx={{margin:1, borderRadius:"10"}} LinkComponent={Link} to="Auth" color="warning">Signup </Button> */}
                </>}
{    isLoggedIn &&     <Button onClick={()=>dispatch(authActions.logout())} variant="contained" sx={{margin:1, borderRadius:"10"}} LinkComponent={Link} to="Auth" color="warning">Logout </Button>}        
               </Box>
          </Toolbar>
  
      </AppBar>
    )
  }
  
export default Header