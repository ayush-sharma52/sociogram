import { Box, Typography, useTheme } from "@mui/material"
import Friend from "components/Friend"
import WidgetWrapper from "components/WidgetWrapper"

const FriendsList = ({freinds}) => {
  const {palette}=useTheme();
  
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