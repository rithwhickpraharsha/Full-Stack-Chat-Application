import React from 'react';
import { useContext } from 'react';
import { List,Dialog, ListItem , Box ,styled} from '@mui/material';
import { AccountContext } from '../../context/AccountProvider';
import { qrCodeImage } from '../../Constants/data';
import { addUser } from '../../service/Api';
import { GoogleLogin } from '@react-oauth/google';

import jwt_decode from 'jwt-decode';
import ChatDialog from '../chat/ChatDialog';

/*
../ means surfing in parents parent folder if we want to go to parents parents parent folder then ../../ wil work 
*/
/*
display flex makes boxes or two divisions form side by side view

*/
const Component = styled(Box)`
display:flex;
`
const QRcode = styled('img')({
   height : 264,
   width :264,
   margin : '50px 0 0 50px'
})
const dialogstyle ={
    height : '66%',
    width : '50%',
    maxWidth:'100%',
    maxHeight:'100%',   
}

const LoginDialog = () =>{

   const { setAccount } = useContext(AccountContext);

   const onLoginSuccess = async(res) => { 
      const decoded = jwt_decode(res.credential);
      // gives complete informationa about credientials related information etc
      //like header payload and signature related to the credentials string
      console.log(decoded);
      setAccount(decoded);
      await addUser(decoded);
      //storing  decoded information in set account 
   }
   const onLoginError = (res) => {
      console.log('Login Failed',res);
   }
   return( <Dialog open ={true} PaperProps={ {sx : dialogstyle}}>
     
     <Component>
        <Box>
           <h1><b>To Login to Your Account Do the Following Steps :</b></h1>
           <List>
           <ListItem> <b>1. There is Qr Code provided </b></ListItem>
           <ListItem><b>2.Click that which enables Google Authentication </b></ListItem>
            <ListItem><b>3.Login to Google Account of your Choice</b></ListItem>
            </List>
        </Box>
        <Box style = {{position : 'relative'}}>
        
        <QRcode src ={qrCodeImage} alt ="Reload"></QRcode>
      
       <Box style = {{ position : 'absolute',top:'50%',transform : 'translate(30%)'}}>
         <GoogleLogin 
            onSuccess = {onLoginSuccess}
            onError={onLoginError}
         /> 
       </Box>
        </Box>
      </Component>
      
    </Dialog>
    
   )
    
}
export default LoginDialog;
