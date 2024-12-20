async function addService(event){
    event.preventDefault()
    const serviceName=event.target.serviceName.value
    const description=event.target.description.value
    const duration=event.target.duration.value
    const price=event.target.price.value
    const available=event.target.available.value
    const obj={
        serviceName:serviceName,
        description:description,
        duration:duration,
        price:price,
        available:available,
    }
    const saloonToken=localStorage.getItem("saloonToken")
    
    const response=await axios.post('http://localhost:4008/services/addService',obj,{headers :{"Authorization" :saloonToken}})
    console.log(response)
    
}
function staff(){
    window.location.href = "./staffManagement.html";
}




function addStaffToService(){
    window.location.href = "./addServiceToStaff.html";
}
function checkreviews(){
    window.location.href = "./checkreviews.html";
}