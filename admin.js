async function seeappointments(){
    console.log("Hi")
    const response=await axios.get('http://localhost:4008/admin/allappointments')
    console.log(response)
    const appointment=document.getElementById("appointments")
    response.data.bookings.forEach(element => {
        
        const b=`<div id="${element.id}">${element.id}</div>`
        
    });
}