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
            

            salonCard.innerHTML = `
                <h3>${salon.service}</h3>
                <p class="gmail">${salon.date}</p>
                <p class="phone">user:${salon.user}</p>
                <p class="phone">saloonStaff:${salon.saloon}</p>
                <button type="submit" onclick="reply(${salon.id})">reply</button>
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
function reply(reviewId){
    console.log("Hi")
    const id=document.getElementById("reviews")
    const a=`
    <form onsubmit="reviewss(event)">
        <input type="hidden" name="bookingId" value="${reviewId}"></input>
        <label for="comment">Your review:</label><br>
        <textarea id="comment" name="review" rows="4" cols="50" placeholder="Write your review here..."></textarea><br><br>
        <button type="submit">submit</button>
    </form>
    `
    id.innerHTML=a


}
async function reviewss(event){
    event.preventDefault()
    const obj={
        reviewId:event.target.bookingId.value,
        review:event.target.review.value
    }
    console.log(event.target.bookingId.value)
    console.log(event.target.review.value)
    const token=localStorage.getItem("token")
    const response=await axios.post('http://localhost:4008/reviews/sendreview',obj,{headers :{"Authorization" :token}})
    console.log(response)
    fetchSalons()
    
}
