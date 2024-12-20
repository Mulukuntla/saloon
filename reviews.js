async function fetchSalons() {
    try {
        // Example API endpoint (replace with your backend URL)
        const token=localStorage.getItem("token")
        const response=await axios.get('http://localhost:4008/reviews/getreview',{headers :{"Authorization" :token}})
        console.log(response)
    

        // Extract the data (assume it's an array of salon objects)
        const salons = response.data.reviews;

        // Select the container where salons will be displayed
        const salonList = document.getElementById('salon-list');

        // Clear any existing content
        salonList.innerHTML = '';

        // Loop through each salon and create a card
        salons.forEach(salon => {
            const salonCard = document.createElement('div');
            salonCard.classList.add('salon-card');
            salonCard.id=`${salon.id}`
            if(salon.saloon ==null){
                salon.saloon=""
            }
            salonCard.innerHTML = `
                <h3>${salon.service}</h3>
                <p class="gmail">${salon.date}</p>
                <p class="phone">user:${salon.user}</p>
                <p class="phone">saloon:${salon.saloon}</p>
            `;
           

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
