async function signin(event){
    event.preventDefault()
    const email=event.target.email.value
    const password=event.target.password.value
    const obj={
        email:email,
        password:password
    }
    await axios.post("http://localhost:4008/user/signin",obj)
      .then(response =>{
        console.log(response)
        if(response.status ===200){
            document.body.innerHTML+=`<div style="color:green;">${response.data.message}<div>`

          window.location.href = "../ExpenseTrackerFrontendProject/addExpense.html";

        }
       
      })
      .catch(err =>{
        console.log(err)
        document.body.innerHTML+=`<div style="color:red;">${err.response.data.message}<div>`

      })



}