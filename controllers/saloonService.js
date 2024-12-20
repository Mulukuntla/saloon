const saloonService= require("../models/service")
const saloonStaff= require("../models/saloonStaff")
const staffServices= require("../models/staffServices")
const { Op } = require('sequelize');
const addSaloonService= async (req,res,next) =>{
    console.log("Hi")
    try{
      const service=await saloonService.create({name:req.body.serviceName,description:req.body.description,duration:req.body.duration,price:req.body.price,saloonId:req.saloon.id,availability:req.body.available})
      res.status(201).json({service:service})

      
      
    }  
    catch(err){
      res.status(500).json(err);
    }
  }



  const addStaff= async (req,res,next) =>{
    console.log("Hi")
    try{
      console.log("Hi")
      const Specialization=req.body.specialization
      console.log(Specialization)
      const saloonStaffs=await saloonStaff.create({Name:req.body.name,Specialization:req.body.specialization,skills:req.body.skills,availability:req.body.availability,saloonId:req.saloon.id})
      res.status(201).json({saloonStaffs:saloonStaffs})
        

      
      
    }  
    catch(err){
      console.log(err)
      res.status(500).json(err);
    }
  }

  const addStaffToService= async (req,res,next) =>{
    console.log("Hi")
    try{
     
      const staff=await saloonStaff.findAll({where:{saloonId:req.saloon.id}})
      const service=await saloonService.findAll({where:{saloonId:req.saloon.id}})
      
      res.status(201).json({staff:staff,service:service})

        

      
      
    }  
    catch(err){
      console.log(err)
      res.status(500).json(err);
    }
  }




  const addStaffToServicess= async (req,res,next) =>{
    console.log("Hi")
    try{
      console.log("Hi")
      const staffId=req.body.staffId
      const serviceId=req.body.serviceId
      console.log(staffId,serviceId)
      const staffServicess=await staffServices.create({saloonId:req.saloon.id,saloonStaffId:staffId,ServiceId:serviceId})
      res.status(201).json({staffServices:staffServicess})
     
    }
    catch(err){
      console.log(err)
    }
  }

  const getStaff= async (req,res,next) =>{
    console.log("Hi")
    try{
      console.log(req.params.serviceId)
      const staff=await staffServices.findAll({where:{ServiceId:req.params.serviceId}})
      console.log(staff)
      console.log(staff.id)
      const a=[]
      staff.forEach(element => {
        a.push(element.saloonStaffId)
      });
      console.log(a)
      var staffs;
     
      staffs = await saloonStaff.findAll({
        where: {
            id: {
                [Op.in]: a, // Match userId in the list of userIds
            },
        },
      });

      
      
      console.log(staffs)
      res.status(201).json({staffs:staffs})
      
    }
    
     

    catch(err){
      console.log(err)
    }
  }


module.exports={
    addSaloonService,
    addStaff,
    addStaffToService,
    addStaffToServicess,
    getStaff,
}