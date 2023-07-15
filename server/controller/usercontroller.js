import User from '../model/User.js';
/*api function always has two inputs that is request and response   */
export const addUser = async(request,response) => {

     try{

       let exist = await User.findOne({sub:request.body.sub});
      //checking if user with certain id is registered and stored or not
       if(!exist){
        const newUser = new User(request.body);
        await newUser.save();
        return response.status(200).json(newUser);

       }
       else{
        response.status(200).json({msg : 'user already exists'}); 
        return ;
       }

     }catch(error){
       return response.status(500).json(error.message);
     }

}
export const getUsers = async(request,response) =>{
    try{
      const users = await User.find({});
      return response.status(200).json(users);

    }catch(error){
     return response.status(500).json(error.message);
    }

}
