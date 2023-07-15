import React from 'react';
import {Box, InputBase,styled} from '@mui/material';
import {EmojiEmotionsOutlined,AttachFile,Mic} from '@mui/icons-material';
import { useEffect } from 'react';
import { uploadFile } from '../../../service/Api.js';
const Component = styled(Box)`
 height:55px;
 background : #ededed;
 display : flex;
 width:100%;
 align-items:center;
 padding : 0 15px;
 &>*{
    margin:5px;
    color:#919191;

 }
`;
const Search = styled(Box)`
background-color: #FFFFFF;
border-radius:18px;
width:calc(94% - 100px);

`;
const InputField =styled(InputBase)`
 width : 100%;
 padding: 20px;
 height : 20px;
 padding-left:25px;
 font-size:14px;

`
const Footer =({sendText,setValue,value,file,setFile,setImage})=>{
   
   useEffect(()=>{
        const getImage = async()=>{
         if(file){
            const data = new FormData();
            data.append("name",file.name);
            data.append("file",file);



            const  response = await uploadFile(data);
              console.log(response);
            if (response && response.data) { // add a check here
               setImage(response.data);
             }

           
         }
        }
      getImage();  
   },[file])
   
   
   
   
   const onFileChange = (e)=>{
       console.log(e);
      setFile(e.target.files[0]);
      setValue(e.target.files[0].name);
   }
    return(
       <Component>
          <EmojiEmotionsOutlined />
         <label htmlFor = "fileInput">
          <AttachFile />
         </label>
          <input 
          type = "file" 
          id ="fileInput"
          style = {{display : 'none'}}
           onChange ={(e)=>onFileChange(e)}
          />
          <Search>
            <InputField 
               placeholder='Type a Message'
               onChange={(e)=>setValue(e.target.value)}
               onKeyPress={(e)=>sendText(e)}
               value={value}
            />
          </Search>
          <Mic />
       </Component>

    )
}

export default Footer;
