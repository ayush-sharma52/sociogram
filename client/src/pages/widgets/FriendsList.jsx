import { Box, Typography, useTheme } from "@mui/material"
import Friend from "components/Friend"
import WidgetWrapper from "components/WidgetWrapper"
import { useEffect, useState } from "react"
import {  useSelector } from "react-redux"
// import { setFreinds } from "state"

const FriendsList = ({freinds}) => {
  const {palette}=useTheme();
  
  //   const {loggedInUserFreinds}=useSelector(state=>state.user);
  //   const [freinds,setFreinds]=useState([]);
  //   const token=useSelector(state=>state.token);
  //   // const dispatch=useDispatch();

    
  // const getFriends=async()=>{
  //   try{
  //   const response=await fetch(`https://sociogram-api.onrender.com/users/${userId}/freinds`,{
  //       method:"GET",
  //       headers:{
  //           Authorization:`Bearer ${token}`,
  //       }
  //   });
     
  //    const freinds=await response.json();
  //   // dispatch(setFreinds({freinds}));
  //   setFreinds(freinds);
  // }
  //   catch(err){
  //     alert(err.message);
  //   }


  // }
    
  // useEffect(()=>{
  //   if(!userId) //if we are at home page then we show the loggedInUser's Freinds list and the add/remove icons on it accordingly
  //   setFreinds(loggedInUserFreinds);
  //   else
  //   getFriends();
  // },[loggedInUserFreinds])


    return (

    <WidgetWrapper>
        <Typography
        color={palette.neutral.main}
        variant="h5"
        fontWeight="500"
        sx={{mb:"1.5rem"}}
        >Friends List</Typography>
        <Box gap="2rem" display="flex" flexDirection="column">
            {freinds.map(freind=>
            <Friend 
            key={freind._id}
            freindImage={freind.picturePath}
            name={`${freind.firstName} ${freind.lastName}`}
            subtitle={freind.location}    
            freindId={freind._id}
            /> )}

        </Box>
    </WidgetWrapper>
  )
}

export default FriendsList