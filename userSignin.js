async function signin(event){
    try{
      event.preventDefault()
      const gmail=event.target.gmail.value
      const password=event.target.password.value
      const obj={
          gmail:gmail,
          password:password
      }
      const response=await axios.post("http://localhost:4008/saloon/signin",obj)
      alert(response.data.message)
      console.log(response.data)
      window.location.href = "./saloonService.html";
      document.body.innerHTML+=`<div style="color:green;">${response.data.message}<div>`
      localStorage.setItem("saloonToken",response.data.salaryToken)
      
    }
    catch(err){
      console.log(err)
      document.body.innerHTML+=`<div style="color:red;">${err.response.data.message}<div>`
    }
  }
  
  document.getElementById("forgotPassword").onclick=async function (e){
    console.log("Hi")
    window.location.href = "./forgotPassword.html";
  
  }
    
    