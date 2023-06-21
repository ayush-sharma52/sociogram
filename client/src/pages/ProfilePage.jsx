
import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "./NavBar";
import FriendsList from "./widgets/FriendsList";
import MyPostWidget from "./widgets/MyPostWidget";
import PostsWidget from "./widgets/PostsWidget";
import UserWidget from "./widgets/UserWidget";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

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
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <FriendsList userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <PostsWidget userId={userId}   />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
// import { Box, useMediaQuery } from "@mui/material";
// import { useEffect, useState } from "react";
// import NavBar from "./NavBar";
// import { useParams } from "react-router-dom";
// import UserWidget from "./widgets/UserWidget";
// import PostsWidget from "./widgets/PostsWidget";
// import FriendsList from "./widgets/FriendsList";
// import { useSelector } from "react-redux";

// const ProfilePage = () => {
//   const {userId}=useParams();
//   const isNonMobileScreen=useMediaQuery("(min-width:1000px)");
//   const [user,setUser]=useState(null);
//   const token=useSelector(state=>state.token);

//   const getUser=async()=>{
//     try{
//       const response=await fetch(`http://localhost:3001/users/${userId}`,{
//         method:"GET",
//         "Authorization":`Bearer ${token}`,
//       })
//       const user=await response.json();
//       setUser(user);
//     }
//     catch(err){
//       alert(err.message);
//     }

//   }

//   useEffect(()=>{
//     getUser();
//   },[]);

//   if(!user)
//   return null;

//   return (
//     <Box>
//       <NavBar/>
//       <Box 
//         width="100%"
//         display={isNonMobileScreen? "flex" : "block"}
//         justifyContent="center"
//         padding="2rem 6%"
//         gap="2rem"
//         >
//           <Box flexBasis={isNonMobileScreen?"26%":undefined}>
//           <UserWidget  userId={userId} picturePath={user.picturePath} />
//           <Box m="2rem 0"/>
//           <FriendsList userId={userId} />
//           </Box>

//           <Box flexBasis={isNonMobileScreen?"42%":undefined}
//            mt={isNonMobileScreen?undefined:"2rem"}>
//              <Box m="2rem 0"/>
//              <PostsWidget userId={userId} />
//           </Box>
//           </Box>
//     </Box>
    
//   )
// }

// export default ProfilePage
  

  
   
  
 

      

        