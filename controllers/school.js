const school= require("../models/school");


const addSchool= async (req,res,next) =>{
    
    try{
      
      const date=req.body.date;
      const Siva=req.body.Siva;
      const Rajesh=req.body.Rajesh;
      const Ashok=req.body.Ashok;
      const Sai=req.body.Sai;
      const Haritha=req.body.Haritha;
      const Ram=req.body.Ram;
      const Krishna=req.body.Krishna;
      const Anu=req.body.Anu;
      const Ammu=req.body.Ammu;
      const Adi=req.body.Adi;
      const data=await school.create({date:date,Siva:Siva,Rajesh:Rajesh,Ashok:Ashok,Sai:Sai,Haritha:Haritha,Ram:Ram,Krishna:Krishna,Anu:Anu,Ammu:Ammu,Adi:Adi});
      res.status(200).json({newDate:data});


    }
    catch(error){
        console.log(error)
    }
}
const getSchool= async (req,res) => {
    try{
        const date=req.params.date
        let user;
    
       await school.findByPk(date)
       .then(product =>{
        user=product;
        
       })
        console.log("user--->"+user)
    
       if(user !==null){
            const data={
                date:user.date,
                Siva:user.Siva,
                Rajesh:user.Rajesh,
                Ashok:user.Ashok,
                Sai:user.Sai,
                Haritha:user.Haritha,
                Ram:user.Ram,
                Krishna:user.Krishna,
                Anu:user.Anu,
                Ammu:user.Ammu,
                Adi:user.Adi,
        }

        res.status(200).json({getDate:data});

       }
       else{
        res.status(200).json({getDate:null});

        }

    }
    catch(error){
        console.log(error)
    }
}

const getTotal= async (req,res) => {
    try{
        const users= await school.findAll();
    
    
        res.status(200).json({getUsers:users});
  

    }
    catch(error){
        console.log(error)
    }
   

}


    
module.exports={
    addSchool,
    getSchool,
    getTotal
   
}