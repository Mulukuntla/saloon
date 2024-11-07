async function signup(event){
  
 
    event.preventDefault()
    const name=event.target.name.value
    const email=event.target.email.value
    const password=event.target.password.value
    const obj={
      name:name,
      email:email,
      password:password
    }
    console.log(obj)
    await axios.post("http://localhost:4008/user/signup",obj)
      .then(response =>{
        console.log("created")
        console.log(response.data)
        
        
      })
      .catch(err =>{
        document.body.innerHTML+=`<div style="color:red;">${err}<div>`

      })


    
    
}