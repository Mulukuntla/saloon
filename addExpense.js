async function handleFormSubmit(event) {
    event.preventDefault();
   
    const expense=event.target.amount.value;
    const description=event.target.text.value;
    const category=event.target.cate.value;
    const obj={
      
      expense,
      description,
      category
    };
    await axios.post("http://localhost:4008/expense/add-expense",obj) 
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
    async function fetchAndDisplayUsers() {
      await axios.get("http://localhost:4008/expense/get-expense")
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
    async function deleteUser(userId) {
      await axios.delete(`http://localhost:4008/expense/delete-expense/${userId}`)
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
    
  
    
    