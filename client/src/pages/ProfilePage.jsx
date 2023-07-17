
import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "./NavBar";
import FriendsList from "./widgets/FriendsList";
import PostsWidget from "./widgets/PostsWidget";
import UserWidget from "./widgets/UserWidget";
import { setCurrentFreinds } from "state";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();

  const token = useSelector((state) => state.token);
  const {_id,freinds}=useSelector(state=>state.user);
  const currentFreinds=useSelector(state=>state.currentFreinds);

  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const dispatch=useDispatch();

  const getUser = async () => {
    const response = await fetch(`https://sociogram-0h3b.onrender.com/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };
  const getFreinds=async()=>{
    const response=await fetch(`https://sociogram-0h3b.onrender.com/users/${userId}/freinds`,{
        method:"GET",
        headers:{
            Authorization:`Bearer ${token}`,
        }
    });
     
     const freinds=await response.json();
    dispatch(setCurrentFreinds({freinds}));
  }
    
 
  useEffect(() => {
    getUser();
    getFreinds();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  user.freinds= ((userId!==_id) ? currentFreinds:freinds);
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget user={user}  />
          <Box m="2rem 0" />
          <FriendsList freinds={user.freinds} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <Box m="2rem 0" />
          <PostsWidget userId={userId}   />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
 

  