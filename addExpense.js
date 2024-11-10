 function handleFormSubmit(event) {
    event.preventDefault();
   
    const expense=event.target.amount.value;
    const description=event.target.text.value;
    const category=event.target.cate.value;
    const obj={
      
      expense,
      description,
      category
    };
    const token=localStorage.getItem("token")
    axios.post("http://localhost:4008/expense/add-expense",obj,{headers :{"Authorization" :token}}) 
      .then((response) => {
        console.log(response.data.newUserDetail)
        console.log("created")
        displayUserOnScreen(response.data.newUserDetail)
      })
      .catch((error) => {
        
        console.log(error)
        console.log("Something went wrong")
      });
    
      // Clearing the input fields
   
    document.getElementById("amount").value = "";
    document.getElementById("text").value = "";
    document.getElementById("cate").value = "";
    }
    
    function displayUserOnScreen(userDetails) {
      if (!userDetails.expense || !userDetails.description || !userDetails.category) {
        alert("Please fill in all fields.");
        return;
      }
      
      const parentNode = document.getElementById("listOfItems");
      const userItemHtml = `
      <li id="${userDetails.id}">
        ${userDetails.expense} - ${userDetails.description} - ${userDetails.category}
        <button onclick=deleteUser('${userDetails.id}')>Delete Expense</button>
      </li>
    `
      parentNode.innerHTML += userItemHtml
    }
    function fetchAndDisplayUsers() {
      const token=localStorage.getItem("token")
      console.log(token)
      axios.get("http://localhost:4008/expense/get-expense",{headers :{"Authorization" :token}})
        .then((response) => {
          console.log(response.data.allUsers)
          response.data.allUsers.forEach(user => {
            
              displayUserOnScreen(user)
  
              
  
          })
             
         
         
        })
        .catch((error) => console.error("Error fetching users:", error));
    }
    document.addEventListener('DOMContentLoaded', function() {
      
      fetchAndDisplayUsers();
    });
    function deleteUser(userId) {
      const token=localStorage.getItem("token")
      axios.delete(`http://localhost:4008/expense/delete-expense/${userId}`,{headers :{"Authorization" :token}})
        .then(response => {
        
          removeUserFromScreen(response.data.ide);
        
        })
        .catch(error => console.error('Error deleting user:', error));
    }
    
    // Function to remove a user from the screen
    function removeUserFromScreen(userId) {
      const parentNode = document.getElementById("listOfItems");
      const childNodeToBeDeleted = document.getElementById(userId);
      if (childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted);
       
       
      }
    }

document.getElementById("rzp-button").onclick=async function (e){
  try{
    const token=localStorage.getItem("token")
    const response=await axios.get("http://localhost:4008/purchase/premiummembership",{headers :{"Authorization" :token}})
    console.log(response)
    console.log(response.razorpay_payment_id)

  
  
  var options={
    "key":response.data.key_id,//Enter the key id generated from the dashboard
    "order_id":response.data.order.id,//for on time payment
    //This handler function handles the successful payment
    "handler":async function (response){
      try{
        const transactionResponse=await axios.post("http://localhost:4008/purchase/updatetransactionstatus",{
          order_id:options.order_id,
          payment_id:response.razorpay_payment_id
        },{headers :{"Authorization" :token}})
        console.log(transactionResponse)
        alert("you are now a premium user")

      }
      catch(err){
        console.log(err)
      }
      
        
      
    }
    
  }
  const rzp1=new Razorpay(options)
  rzp1.open()
  e.preventDefault()
  rzp1.on("payment.failed",async function (response){
    alert("Something went wrong with the payment")

    try{
      const transactionResponse=await axios.post("http://localhost:4008/purchase/updatetransactionstatusfailed",{
        order_id:options.order_id,
        payment_id:response.razorpay_payment_id
      },{headers :{"Authorization" :token}})
      console.log(transactionResponse)
      alert("Something went wrong with the payment")

    }
    catch(error){
      console.log(error)
    }
    
    
  })
}
catch(err){
  console.log(err)
}

}
    
  
    
    