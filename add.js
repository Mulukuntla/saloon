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
      const decodeToken=parseJwt(token)
      console.log(decodeToken)
      const ispremiumuser=decodeToken.ispremiumuser
      if(ispremiumuser){
        showpremiumusermessage()
        showLeaderBoard()
      }
      axios.get("http://localhost:4008/expense/get-expense",{headers :{"Authorization" :token}})
        .then((response) => {
          console.log(response.data.allUsers)
          response.data.allUsers.forEach(user => {
            
              displayUserOnScreen(user)
  
              
  
          })
             
         
         
        })
        .catch((error) => console.error("Error fetching users:", error));
    }
  
  function showpremiumusermessage(){
  document.getElementById("rzp-button").style.visibility="hidden"
  document.getElementById("message").innerHTML="you are a premium user"
  
  }
  
  function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  
  return JSON.parse(jsonPayload);
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
      
      var options=
      {
      "key":response.data.key_id,//Enter the key id generated from the dashboard
      "order_id":response.data.order.id,//for on time payment
      //This handler function handles the successful payment
      "handler":async function (response){
          
          const transactionResponse=await axios.post("http://localhost:4008/purchase/updatetransactionstatus",{
            order_id:options.order_id,
            payment_id:response.razorpay_payment_id
          },{headers :{"Authorization" :token}})
          
          alert("you are now a premium user")
          
          localStorage.setItem("token",transactionResponse.data.token)
          const tokens=localStorage.getItem("token")
          const decodeToken=parseJwt(tokens)
          
          const ispremiumuser=decodeToken.ispremiumuser
          if(ispremiumuser){
          showpremiumusermessage()
          showLeaderBoard()
        }
        }
      }
      
   
        const rzp1=new Razorpay(options)
        
        rzp1.open()
        e.preventDefault()
        rzp1.on("payment.failed",async function (response){
          
          const transactionResponses=await axios.post("http://localhost:4008/purchase/updatetransactionstatusfailed",{
          order_id:options.order_id,
          payment_id:response.error.metadata.payment_id
        },{headers :{"Authorization" :token}});
        
        alert("Something went wrong with the payment")
  
        })
      }
      catch(error){
        console.log(error)
      }
  }
  
  function showLeaderBoard(){
  const inputElement=document.createElement("input")
  inputElement.type="button"
  inputElement.value="Show Leaderboard"
  inputElement.onclick=async ()=>{
    const token=localStorage.getItem("token")
    const userLeaderBoardArray=await axios.get("http://localhost:4008/premium/showLeaderboard",{headers :{"Authorization" :token}})
    console.log(userLeaderBoardArray.data.userLeaderBoardDetails)
    const leaderboardElem=document.getElementById("leaderboard")
    leaderboardElem.innerHTML="<h1>Leader Board</h1>"
    userLeaderBoardArray.data.userLeaderBoardDetails.forEach((userDetails)=>{
      leaderboardElem.innerHTML +=`<li>Name-${userDetails.userName} Total Expense-${userDetails.totalExpenses} `
    })
  
  }
  document.getElementById("message").appendChild(inputElement)
  }
  
  
  
    
  
    
    