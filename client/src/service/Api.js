/* using axios lib to call apis */
import axios from 'axios';


const url = 'http://localhost:8000';

export const addUser = async(data) => {
  try{
    //asynchronous request hence await
    await axios.post(`${url}/add`,data);
  }catch(error){
    console.log("error called",error.message);
  }


}

export const getUsers = async()=>{
  try{
    let response = await axios.get(`${url}/users`);
    console.log(response);
    return response.data;
  }catch(error){
    console.log("error while getting users api",error.message);
  }
}
export const setConversation = async(data)=>{
  try{

   await axios.post(`${url}/Conversation/add`,data);

  }catch(error){
    console.log("ERROR:at separate chat function setConversation",error.message);
  }

}

export const getConversation = async(data)=>{
  try{

  let response = await axios.post(`${url}/Conversation/get`,data);
   return response.data;
  }catch(error){
    console.log("ERROR:at separate chat function get Conversation",error.message);
  }

}

export const newMessage = async(data) =>{
  try{
   await axios.post(`${url}/message/add`,data);
  }catch(error){
    console.log("error while calling newMessage api",error.message);
  }
}

export const getMessages = async(id)=>{
  try{
   let response = await axios.get(`${url}/message/get/${id}`);
   return response.data;



  }catch(error){
    console.log("ERROR API GETMESSAGE",error.message);

  }
}


export const uploadFile = async(data)=>{
   try{

     return await axios.post(`${url}/file/upload`,data);


   }catch(error){
    console.log("upload file error",error.message);
   }


}