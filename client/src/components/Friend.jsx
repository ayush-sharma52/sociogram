import FlexBetween from './FlexBetween'
import UserImage from './UserImage'
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { setFreinds } from 'state'
import { useNavigate } from 'react-router-dom'

const Friend = ({freindId,freindImage,name,subtitle,}) => {
    const dispatch=useDispatch();
    const navigate=useNavigate()
    const {freinds,_id}=useSelector(state=>state.user);
    const token = useSelector(state=>state.token);
  
    const {palette}=useTheme();
    const primaryLight=palette.primary.light;
    const primaryDark=palette.primary.dark;
    const main = palette.neutral.main;
    const medium=palette.neutral.medium;
    
    const isFreind = freinds.find((friend) => friend._id === freindId);

    const patchFreind= async() => {
        try{
                const response = await fetch(
                  `http://localhost:3001/users/${_id}/${freindId}`,
                  {
                    method: "PATCH",
                    headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json",
                    },
                  }
                );
                const data = await response.json();
                dispatch(setFreinds({ freinds: data }));
              }
    
        catch(err){
            alert(err.message);
        }

    }

  return (
    <FlexBetween>
        <FlexBetween gap="1rem">
    <UserImage image={freindImage} size="55px"/>
    <Box onClick={()=>{
        navigate(`/profile/${freindId}`);
        navigate(0);
    }}
    >
        <Typography color={main}
         variant="h5"
         fontWeight="500"
         sx={{
            '&:hover':{
                color:palette.primary.light,
                cursor:"pointer",
            }
         }}
         >
            {name}
        </Typography>
        <Typography 
        color={medium}
        fontSize="0.75rem"
        >
            {subtitle}
        </Typography>
    </Box>
    </FlexBetween>

    <IconButton 
    onClick={()=>patchFreind()}
    sx={{
        backgroundColor:primaryLight,
        p:"0.6rem"
    }}
    >
        {isFreind ? 
        <PersonRemoveOutlined sx={{color:primaryDark}}/>
        :<PersonAddOutlined sx={{color:primaryDark}}/>
    }
    </IconButton>
</FlexBetween>

  )
}

export default Friend