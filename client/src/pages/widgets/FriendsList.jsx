import { Box, Typography, useTheme } from "@mui/material"
import Friend from "components/Friend"
import WidgetWrapper from "components/WidgetWrapper"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setFreinds } from "state"

const FriendsList = ({userId}) => {
    const {freinds}=useSelector(state=>state.user);
    const token=useSelector(state=>state.token);
    const dispatch=useDispatch();
    const {palette}=useTheme();

    
  const getFriends=async()=>{
    const response=await fetch(`http://localhost:3001/users/${userId}/freinds`,{
        method:"GET",
        headers:{
            Authorization:`Bearer ${token}`,
        }
    });
     
     const freinds=await response.json();
    dispatch(setFreinds({freinds}));

  }
    
  useEffect(()=>{
    getFriends();
  },[])


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