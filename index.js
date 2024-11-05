function handleFormSubmit(event){
  event.preventDefault()
  const name=event.target.name.value
  const email=event.target.email.value
  const password=event.target.password.value
  const obj={
    name:name,
    email:email,
    password:password
  }
  axios.post("http://localhost:4001/user/signup",obj)
    .then(response =>{
     

    })
    .catch(error =>{
      

    })


}