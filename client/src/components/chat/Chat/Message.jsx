import { useContext } from 'react';
import {Box,Typography,styled} from '@mui/material';
import { GetApp as GetAppIcon } from '@mui/icons-material';
import React from 'react';
import {iconPDF} from '../../../Constants/data.js';
import {formatDate,downloadMedia} from '../../../utils/common-utils.js'
import { AccountContext } from '../../../context/AccountProvider';

const Component = styled(Box)`
  max-height:100px;
  max-width:100px;
 

`
const  Own =styled(Box)`
  background :#dcf8c6;
  max-width:60%;
  margin-left:auto;
  padding: 5px ;
  width:fit-content;
 display:flex;
 border-radius:10px;
 word-break:break-word;

`;


const  Wrapper =styled(Box)`
  background :#FFFFFF;
  max-width:60%;
 
  padding: 5px ;
  width:fit-content;
 display:flex;
 border-radius:10px;
 word-break:break-word;
 
`
const Time = styled(Typography)`
font-size: 10px;
color:#919191;
margin-top:6px;
word-break: keep-all;
margin-top:auto;
`;
const Text =styled(Typography)`
font-size:14px;
padding : 0 25px 0 5px;
 
`
export const Message =({message})=>{


    const {account} = useContext(AccountContext);
return(
      <>
        {
          account.sub === message.senderId ?
            <Own>
              {
                 message.type === 'file' ? <ImageMessage message ={message} /> : <TextMessage message={message} />
              }
              
            </Own>
        :
            <Wrapper>
             {
                 message.type === 'file' ? <ImageMessage message ={message} /> : <TextMessage message={message} />
            }
            </Wrapper>
 

        }
      
      
      
      </> 
   
)

}


const ImageMessage = ({ message }) => {
return(
        <Box style = {{postion : 'relative'}}>
          {
           message.text.includes('.pdf') ? 
          
             <Box  style = {{display:'flex'}}>
               <img  src ={iconPDF} alt ="pdf" style={{width:80}} />
              <Typography style ={{fontSize:'14px'}}>{message.text.split('/').pop()}</Typography>
              </Box>
          
          :
          
             
                <img style = {{width:300,height:'100%',objextFit:'cover'}}src={message.text} alt={message.text} />
             
          }
           <Time style = {{position: 'relative',bottom : 0, right:0}}>
            <GetAppIcon 
              onClick = {(e) =>downloadMedia(e,message.text)}     
              style={{marginRight:10,border:'1px solid grey',borderRadius:'50%'}}
              fontSize="small"
        
            />
             {formatDate(message.createdAt)}
        </Time>
        </Box>
)
}

const TextMessage = ({message})=>{
  return(
     <>
      <Text>{message.text}</Text>
      <Time>{formatDate(message.createdAt)}</Time>
     
     </>

  )
}