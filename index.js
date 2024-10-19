function handleFormSubmit(event) {
  event.preventDefault();
  const ide=event.target.ide.value;
  const expense=event.target.amount.value;
  const description=event.target.text.value;
  const category=event.target.cate.value;
  const obj={
    ide,
    expense,
    description,
    category
  };
  axios.post("http://localhost:4001/user/add-expense",obj) 
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
  document.getElementById("id").value = "";
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
      <button onclick=deleteUser('${userDetails.id}')>Delete</button>
      <button onclick=editUser('${userDetails.id}','${userDetails.expense}','${userDetails.description}','${userDetails.category}')>Edit</button>
    </li>
  `
    parentNode.innerHTML += userItemHtml
  }
  function fetchAndDisplayUsers() {
    axios.get("http://localhost:4001/user/get-expense")
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
    axios.delete(`http://localhost:4001/user/delete-expense/${userId}`)
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
  function editUser(userId,expense,description,category) {
    axios.delete(`http://localhost:4001/user/edit-expense/${userId}`)
    .then(response => {
      
      document.getElementById("id").value=response.data.id
      document.getElementById("amount").value=response.data.expense
      document.getElementById("text").value=response.data.description
      document.getElementById("cate").value=response.data.category
      
      
    })
    .catch(error => console.error('Error deleting user:', error));

    
    
  }

  
  