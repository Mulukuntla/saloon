staff()
async function staff(){
    try{
        const saloonToken=localStorage.getItem("saloonToken")
        const response=await axios.get('http://localhost:4008/services/addStaffToService',{headers :{"Authorization" :saloonToken}})
        console.log(response)
        const staffSelect = document.getElementById('staff');
        response.data.staff.forEach(staff => {
            const option = document.createElement('option');
            option.value = staff.id;
            option.textContent = staff.Name;
            staffSelect.appendChild(option);
        });

        // Populate service dropdown
        const serviceSelect = document.getElementById('service');
        response.data.service.forEach(service => {
            const option = document.createElement('option');
            option.value = service.id;
            option.textContent = service.name;
            serviceSelect.appendChild(option);
        });
        

    }
    catch(err){
        console.log(err)
    }

}
async function addServiceToStaff(event) {
    event.preventDefault();

    // Get selected staff and service
    const staffId = document.getElementById('staff').value;
    const serviceId = document.getElementById('service').value;

    // Send the data to the backend to associate the service with the staff
    try {
        const obj={
            staffId,serviceId
        }
        console.log(staffId,serviceId)
        const saloonToken=localStorage.getItem("saloonToken")
        const response=await axios.post('http://localhost:4008/services/addStaffToServicess',obj,{headers :{"Authorization" :saloonToken}})
        console.log(response)

        // Display success message
        document.getElementById('message').textContent = 'Service added to staff successfully!';
        document.getElementById('message').style.color = 'green';

        // Optionally clear the form after submission
        document.getElementById('addServiceForm').reset();
    } catch (error) {
        console.error('Error adding service to staff:', error);
        document.getElementById('message').textContent = 'Failed to add service to staff';
        document.getElementById('message').style.color = 'red';
    }
}