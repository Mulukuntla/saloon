function handleFormSubmit(event) {
    event.preventDefault();
    const name=event.target.name.value;
    const number=event.target.number.value;
    const email=event.target.email.value;
    const obj={
      name,
      number,
      email
    };
    axios.post("http://localhost:4001/user/add-user",obj) 
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
    document.getElementById("name").value = "";
    document.getElementById("number").value = "";
    document.getElementById("email").value = "";
    }
    
    function displayUserOnScreen(userDetails) {
      if (!userDetails.name || !userDetails.email || !userDetails.phonenumber) {
        alert("Please fill in all fields.");
        return;
      }
      
      const parentNode = document.getElementById("listOfUsers");
      const userItemHtml = `
      <li id="${userDetails.id}">
        ${userDetails.name} - ${userDetails.email} - ${userDetails.phonenumber}
        <button onclick=deleteUser('${userDetails.id}')>Delete</button>
        <button onclick=editUser('${userDetails.id}','${userDetails.name}','${userDetails.email}','${userDetails.phonenumber}')>Edit</button>
      </li>
    `
      parentNode.innerHTML += userItemHtml
    }
    function fetchAndDisplayUsers() {
      axios.get("http://localhost:4001/user/get-users")
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
      axios.delete(`http://localhost:4001/user/delete-user/${userId}`)
      .then(response => {
        
        removeUserFromScreen(response.data.ide);
        
      })
      .catch(error => console.error('Error deleting user:', error));
    }
    
    // Function to remove a user from the screen
    function removeUserFromScreen(userId) {
      const parentNode = document.getElementById("listOfUsers");
      const childNodeToBeDeleted = document.getElementById(userId);
      if (childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted);
       
       
      }
    }
    function editUser(userId,name,number,email) {
      document.getElementById("username").value=name
      document.getElementById("number").value=number
      document.getElementById("email").value=email
      deleteUser(userId)
      
    }
  
    
    