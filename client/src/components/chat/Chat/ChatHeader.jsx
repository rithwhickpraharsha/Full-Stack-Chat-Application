import { useContext } from 'react';
import React from 'react';
import {Box,Typography,styled} from '@mui/material';
import {Search,MoreVert} from '@mui/icons-material';
import {defaultProfilePicture} from '../../../Constants/data';
import { AccountContext } from '../../../context/AccountProvider';
const Header =styled(Box)`
 height : 34px;
 background:#ededed;
 padding :8px 16px;
 display : flex;

`

const Image =styled ('img')({
    height : 40,
    width:40,
    borderRadius :'50%'

});
const Name = styled(Typography)`
 margin-left: 12px !important;
`
const Status = styled(Typography)`
margin-left:12px !important;
font-size : 12px;
color:rgb(0,0,0,0.6);
`
const RightComp =styled(Box)`
margin-left : auto;
& > svg(
    padding: 8px;
    font-size:24px;
    color : black;

)
`
const ChatHeader = ({person}) =>{
     

    const {activeUsers} = useContext(AccountContext);

    return(
        <Header>
            <Image src={person.picture}alt="dp" />
            <Box>
                <Name>{person.name}</Name>
                <Status>{
                    
                   
                
                (person.sub === '113479671392928537726' || person.sub==='102537123581403205330')? 'Online' :'Offline'


                
                }</Status>
            </Box>
           <RightComp>
            <Search />
            <MoreVert />
           </RightComp>
        </Header>
    )



}
export default ChatHeader;