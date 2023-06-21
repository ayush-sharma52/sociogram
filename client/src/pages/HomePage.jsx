import { Box, useMediaQuery } from '@mui/material'
import NavBar from './NavBar'
import UserWidget from './widgets/UserWidget';
import { useSelector } from 'react-redux';
import MyPostWidget from './widgets/MyPostWidget';
import PostsWidget from './widgets/PostsWidget';
import Advert from './widgets/Advert';
import FriendsList from './widgets/FriendsList';

const HomePage = () => {
  const {_id,picturePath} = useSelector(state => state.user);
  const isNonMobileScreen=useMediaQuery("(min-width:1000px)");
  

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
          <UserWidget  userId={_id} picturePath={picturePath} />
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
            <FriendsList userId={_id}/>
            </Box>}
          
        </Box>
    </Box>
  )
}

export default HomePage