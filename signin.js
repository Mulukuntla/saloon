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
        
        alert(response.data.message)
        console.log(response.data)
        document.body.innerHTML+=`<div style="color:green;">${response.data.message}<div>`
        localStorage.setItem("token",response.data.token)

        window.location.href = "../ExpenseTrackerFrontendProject/addExpense.html";

       
      })
      .catch(err =>{
        console.log(err)
        document.body.innerHTML+=`<div style="color:red;">${err.response.data.message}<div>`

      })



}
document.getElementById("forgotPassword").onclick=async function (e){
  const parentNode = document.getElementById("forgotPasswordDiv");
    const userItemHtml = `
    <h1>Forgot Password</h1>
    <form onsubmit="ForgotPassword(event)">
    Enter email :<input type="email" name="forgotEmail"></input>
    <button type="submit">Submit</button>
    </form>
  `
    parentNode.innerHTML += userItemHtml

}
async function ForgotPassword(event){
  event.preventDefault()
  const email=event.target.forgotEmail.value
  await axios.post("http://localhost:4008/called/password/forgotpassword",obj)
  .then(response =>{

  })
  .catch(err =>{

  })

}