import { Box, useMediaQuery } from '@mui/material'
import NavBar from './NavBar'
import UserWidget from './widgets/UserWidget';
import { useDispatch, useSelector } from 'react-redux';
import MyPostWidget from './widgets/MyPostWidget';
import PostsWidget from './widgets/PostsWidget';
import Advert from './widgets/Advert';
import FriendsList from './widgets/FriendsList';
import { useEffect } from 'react';
import { setFreinds } from 'state';

const HomePage = () => {
  const user=useSelector(state=>state.user);
  const token=useSelector(state=>state.token);
  const {_id,picturePath} = user;
  
  const dispatch=useDispatch();
  const isNonMobileScreen=useMediaQuery("(min-width:1000px)");

  const getFriends=async()=>{
    try{
    const response=await fetch(`https://sociogram-api.onrender.com/users/${_id}/freinds`,{
        method:"GET",
        headers:{
            Authorization:`Bearer ${token}`,
        }
    });
     
     const freinds=await response.json();
    dispatch(setFreinds({freinds}));
    
  }
    catch(err){
      alert(err.message);
    }


  }

  useEffect(()=>{
    getFriends(); //we called this function when the component  rendered so that we update the user.freinds in redux state to their formatted 
    // value before passing them onto freindsList widget coz it works on formattedFreinds
  },[])

  return (
    <Box>
        <NavBar/>
        <Box 
        width="100%"
        display={isNonMobileScreen? "flex" : "block"}
        justifyContent="space-between"
        padding="2rem 6%"
        gap="0.5rem"
        >
          <Box flexBasis={isNonMobileScreen?"26%":undefined}>
          <UserWidget user={user} />
          </Box>
          
          <Box flexBasis={isNonMobileScreen?"42%":undefined}
           mt={isNonMobileScreen?undefined:"2rem"}>
            <MyPostWidget picturePath={picturePath}/>
            <PostsWidget/>
          </Box>

          {isNonMobileScreen && 
          <Box flexBasis="26%" >
            <Advert/>
            <Box m="2rem 0"/>
            <FriendsList freinds={user.freinds}/>
            </Box>}
          
        </Box>
    </Box>
  )
}

export default HomePage