function handleFormSubmit(event) {
  event.preventDefault();
  const element = document.getElementById("formDelete");
  console.log(element)
  if (element !== null){
    element.remove();
  }
 
  
  const link=event.target.link.value
  const time=event.target.time.value
  const vacancies=event.target.vacancies.value
  
  console.log(link);
  console.log(time); 
  console.log(vacancies);
   // Log the link value
  
  const parentNode = document.getElementById("login");
    
  const userItemHtml = document.createElement("div");
  userItemHtml.innerHTML = `
    <form id="formDelete" onsubmit="FormSubmit(event)">
    <input type="hidden" name="linkk" value="${link}">
    <input type="hidden" name="timee" value="${time}">
    <input type="hidden" name="vacancies" value="${vacancies}">
    Name: <input type="text" name="user">
    Mentor: <input type="text" name="mentor">
    <button type="submit">Submit</button>
    </form>
      
    `;
    parentNode.appendChild(userItemHtml);
    
    
  }
  function FormSubmit(event){
   
  
    event.preventDefault();
    const element = document.getElementById("formDelete");
    element.remove();
    
    const user=event.target.user.value;
    const mentor=event.target.mentor.value;
    const link=event.target.linkk.value
    const time=event.target.timee.value
    const vacancies=event.target.vacancies.value
    const obj={
      user,
      mentor,
      link,
      time,
      vacancies
    }
    console.log(user,mentor,link,time,vacancies)
    axios.post("http://localhost:4001/user/add-mUser",obj) 
    .then((response) => {
      console.log(response.data.allmUsers)
      console.log(response.data.allmTimes)
      displayUsersOnScreen(response.data.newmUser)
      response.data.allmTimes.forEach(user => {
        if(user.vacancies>0){
          uppp(user.time)
          displayTimesOnScreen(user)
          
        }
      })
      
      
     
      
      
      
    })
    .catch((error) => {
      
      console.log(error)
      console.log("Something went wrong")
    });
    
  }
  function displayTimesOnScreen(userDetails) {
    
    const link=userDetails.link
    const time=userDetails.time
    const vacancies=userDetails.vacancies
    console.log("link"+link)
    const parentNodes = document.getElementById("listOfTimes");
    
    const userItemHtmls = `
      <form id="${time}" onsubmit="handleFormSubmit(event)">
        <button type="submit" >
          <input type="hidden" name="link" value="${link}">
          <input type="hidden" name="time" value="${time}">
          <input type="hidden" name="vacancies" value="${vacancies}">
          <h5>Meeting scheduled at "${time}"</h5>
          <a>Slots available: <span  value="${vacancies}">"${vacancies}"</span></a>
        </button>
      </form>
    `
    parentNodes.innerHTML += userItemHtmls
    
    
    
   
  }
  function displayUsersOnScreen(userDetails) {
    const parentNode = document.getElementById("listOfItems");
    
    const userItemHtml = `
      
        <li id="${userDetails.id}">
        
          <h4>Hi "${userDetails.user}" </h4><br><br>
          <a>Your interview is scheduled with "${userDetails.mentor}"<br>
          and link is "${userDetails.link} at "${userDetails.time}"
          <button onclick="select('${userDetails.id}','${userDetails.time}')">Cancel</button>
  
        </li>
     
      
      `
      parentNode.innerHTML += userItemHtml
  }
  function fetchAndDisplayUsers() {
    axios.get("http://localhost:4001/user/get-mUser")
      .then((response) => {
        
        response.data.allmTimes.forEach(user => {
          if(user.vacancies>0){
            displayTimesOnScreen(user)
            
          }
        })
        response.data.allmUsers.forEach(user => {
          
          
          displayUsersOnScreen(user)
      })
        
           
       
       
      })
      .catch((error) => console.error("Error fetching users:", error));
  }
  document.addEventListener('DOMContentLoaded', function() {
    
    fetchAndDisplayUsers();
  });
  
 function select(userId,time){
   
    axios.delete(`http://localhost:4001/user/delete-mUser/${userId}`)
    .then( (response) => {
      removeUserFromScreen(response.data.id)
      axios.get("http://localhost:4001/user/get-mUser")
        .then(res =>{
          res.data.allmTimes.forEach(user => {
            if(user.vacancies>0){
              uppp(user.time)
              displayTimesOnScreen(user)
              
            }
          })
          
        })

      
      
    })
    
      
      
    
    .catch(error => console.error('Error deleting user:', error));
    

  }
  function removeUserFromScreen(userId) {
    const parentNode = document.getElementById("listOfItems");
    const childNodeToBeDeleted = document.getElementById(userId);
    if (childNodeToBeDeleted) {
      parentNode.removeChild(childNodeToBeDeleted);
     
     
    }
  }
  function uppp(time){
    console.log(time)
    var element = document.getElementById(time);
    if (element) {
        element.remove();
    }

  }

  
  