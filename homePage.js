function updatePreferences(){
    console.log("Hi")
    window.location.href = "./updateProfile.html";
  
}


async function fetchSalons() {
    try {
        // Example API endpoint (replace with your backend URL)
        const token=localStorage.getItem("token")
        const response=await axios.get('http://localhost:4008/saloon/allsaloons',{headers :{"Authorization" :token}})
        console.log(response)
    

        // Extract the data (assume it's an array of salon objects)
        const salons = response.data.allsaloons;

        // Select the container where salons will be displayed
        const salonList = document.getElementById('salon-list');

        // Clear any existing content
        salonList.innerHTML = '';

        // Loop through each salon and create a card
        salons.forEach(salon => {
            const salonCard = document.createElement('div');
            salonCard.classList.add('salon-card');
            salonCard.id=`${salon.id}`

            salonCard.innerHTML = `
                <h3>${salon.saloonName}</h3>
                <p class="gmail">${salon.email}</p>
                <p class="phone">${salon.phone}</p>
                <p class="city">${salon.city}</p>
            `;
            salonCard.addEventListener("click",()=>{
                showdescription(salon.id)
            })

            // Append the salon card to the container
            salonList.appendChild(salonCard);
        });
    } catch (error) {
        console.error('Error fetching salons:', error);
        alert('Failed to load salons. Please try again later.');
    }
}

// Call the function to fetch salons on page load
fetchSalons();

async function showdescription(saloonId){
    
    const token=localStorage.getItem("token")
    const response=await axios.get(`http://localhost:4008/saloon/allsaloons/${saloonId}`,{headers :{"Authorization" :token}})
    console.log(response)
    const services = response.data.getSaloon;

        // Select the container where salons will be displayed
    const salonList = document.getElementById('salon-list');

        // Clear any existing content
    salonList.innerHTML = '';
    console.log(services)
    services.forEach(salon => {
        const salonCard = document.createElement('div');
        salonCard.classList.add('salon-card');
        salonCard.id=`${salon.id}`

        salonCard.innerHTML = `
            <h3>${salon.id}</h3>
            <p class="saloonName">Name of the service:${salon.name}</p>
            <p class="saloondescription">description:${salon.description}</p>
            <p class="saloonPrice">price:${salon.price}</p>
            <p class="saloonAvailability">availability:${salon.availability}</p>
        `;
        salonCard.addEventListener("click",()=>{
            showStaff(salon.id,salon.name)
        })
        
       

        // Append the salon card to the container
        salonList.appendChild(salonCard);
    });
}



async function showStaff(serviceId,serviceName){
    try{
        console.log(serviceId)
        const token=localStorage.getItem("token")
        const response=await axios.get(`http://localhost:4008/services/${serviceId}`,{headers :{"Authorization" :token}})
        console.log(response)
        const staffs = response.data.staffs;

        // Select the container where salons will be displayed
        const salonList = document.getElementById('salon-list');

            // Clear any existing content
        salonList.innerHTML = '';
        console.log(staffs)
        staffs.forEach(salon => {
            const salonCard = document.createElement('div');
            salonCard.classList.add('salon-card');
            salonCard.id=`${salon.id}`
            console.log(salon.Specialization)
            
            
           
            salonCard.innerHTML = `
                <h3>${salon.id}</h3>
                <p class="saloonName">Name of the service:${salon.Name}</p>
                <p class="saloonAvailability">availability:${salon.availability}</p>
            `;
            salonCard.addEventListener("click",()=>{
                showBooking(salon.id,salon.availability,serviceName,serviceId)
            })
            
        

            // Append the salon card to the container
            salonList.appendChild(salonCard);
        });

    }
    catch(err){
        console.log(err)
    }
    


}






function showBooking(staffId,availability,serviceName,serviceId){
    console.log(staffId)
    console.log(availability)
    const available=convertToHalfHourIntervals(availability)
    const salonList = document.getElementById('salon-list');

            // Clear any existing content
        salonList.innerHTML = '';
       
        available.forEach(salon => {
            const salonCard = document.createElement('div');
            salonCard.classList.add('salon-card');
            salonCard.id=`${salon}`
            
            
           
            salonCard.innerHTML = `
                
                <p>${salon}</p>
                <form onsubmit="booking(event)">
                    <input type="hidden" name="time" value="${salon}">
                    <input type="hidden" name="staff" value="${staffId}">
                     <input type="hidden" name="serviceId" value="${serviceId}">
                    <input type="hidden" name="service" value="${serviceName}">
                    date:<input type="date" id="date" name="date" ><br><br>
                    <button type="submit">book</button>
                </form>
               
            `;
            
            
        

            salonList.appendChild(salonCard);
        })
   
}



async function booking(event){
    try{
        event.preventDefault()
        console.log(event.target.time.value)
        console.log(event.target.staff.value)
        console.log(event.target.date.value)
        console.log(event.target.service.value)
        const obj={
            time:event.target.time.value,
            staff:event.target.staff.value,
            date:event.target.date.value,
            service:event.target.service.value,
            serviceId:event.target.serviceId.value
        }
        const token=localStorage.getItem("token")
        const response=await axios.post('http://localhost:4008/booking/addbooking',obj,{headers :{"Authorization" :token}})
        console.log(response)
        const objs={
            bookingId:response.data.bookings.id
        }
        const responses=await axios.post('http://localhost:4008/booking/bookingsms',objs,{headers :{"Authorization" :token}})
        console.log(responses)
        window.location.href = "./appointment.html";

    }
    catch(err){
        console.log(err)
    }

}





function convertToHalfHourIntervals(timeRange) {
    // Extract the start and end times from the input string
    const timePattern = /(\d{1,2}:\d{2}[ap]m)\s*-\s*(\d{1,2}:\d{2}[ap]m)/i;
    const match = timeRange.match(timePattern);

    if (!match) {
        console.error("Invalid time range format.");
        return [];
    }

    // Function to convert 12-hour time format to 24-hour format
    function convertTo24HourFormat(time) {
        const [hours, minutes] = time.slice(0, -2).split(':');
        const period = time.slice(-2);
        let hour = parseInt(hours, 10);
        if (period === 'pm' && hour !== 12) {
            hour += 12;
        } else if (period === 'am' && hour === 12) {
            hour = 0;
        }
        return { hour, minute: parseInt(minutes, 10) };
    }

    // Convert start and end times to 24-hour format
    const startTime = convertTo24HourFormat(match[1]);
    const endTime = convertTo24HourFormat(match[2]);

    // Convert to Date objects
    const startDate = new Date();
    startDate.setHours(startTime.hour, startTime.minute, 0);

    const endDate = new Date();
    endDate.setHours(endTime.hour, endTime.minute, 0);

    const intervals = [];
    let currentTime = new Date(startDate);

    // Generate half-hour intervals
    while (currentTime < endDate) {
        const start = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        currentTime.setMinutes(currentTime.getMinutes() + 30); // Move 30 minutes ahead
        const end = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        intervals.push(`${start} - ${end}`);
    }

    return intervals;
}
