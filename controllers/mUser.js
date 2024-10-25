const mUsers= require("../models/mUser");
const mTimes= require("../models/mTimes");

const addmUsers= async (req,res,next) =>{
    
    try{
      
      const user=req.body.user;
      const mentor=req.body.mentor;
      const link=req.body.link;
      const time=req.body.time;
      const vacancies=req.body.vacancies;
      console.log(user,mentor,link,time,vacancies)


      mTimes.findByPk(time)
        .then(product =>{
          product.time=time;
          product.link=link;
          product.vacancies=vacancies-1;
      
          product.save();
          console.log("vacancy created")

        })
        .catch(err =>{
          console.log(err)
        })
        const products = await mTimes.findByPk(time)
        const newTimes= {
          time:products.time,
          link:products.link,
          vacancy:products.vacancies
        }

      
      
      
      const data=await mUsers.create({user:user,mentor:mentor,link:link,time:time});
      
      const users= await mUsers.findAll();
      
      const times= await mTimes.findAll();
      
      res.status(200).json({allmUsers :users,allmTimes:times,newmUser:data});

      
    
   
    
   
      

    }  
    catch(err){
      res.status(500).json({
        error:err
      })
    }
}
const getmUsers=async (req,res,next)=>{
  try{
    const users= await mUsers.findAll();
    const times= await mTimes.findAll();
    console.log(users)  
    res.status(200).json({allmUsers :users,allmTimes:times});

  }
  catch(error){
    console.log("Get user is failing",JSON.stringify(error))
    res.status(500).json({error:error})
  }
 
}

const deletemUsers= async (req,res) => {
  
    const id=req.params.id
   
    let time;
    await mUsers.findByPk(id)
      .then(product =>{
        time=product.time
        
      })
      .catch(err => console.log(err))
    console.log(time)
    
    await mTimes.findByPk(time)
      .then(product =>{
        console.log("before" +product.vacancies)
        product.time=product.time;
        product.link=product.link;
        product.vacancies=product.vacancies+1;
      
        product.save();
        console.log("vacancy created")

      })
    await mTimes.findByPk(time)
      .then(product =>{
        console.log("now"+product.vacancies)
      })
    await mUsers.destroy({where:{id:id}});
    
    const users= await mUsers.findAll();
      
    const times= await mTimes.findAll();
      
      

    await res.status(200).json({id:id,time:time,allmUsers:users,allmTimes:times});
    
 
   
     
  
    
  
  }


    
module.exports={
    addmUsers,
    getmUsers,
    deletemUsers
}