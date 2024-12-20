async function fetchSalons() {
    try {
        // Example API endpoint (replace with your backend URL)
        const token=localStorage.getItem("token")
        const response=await axios.get('http://localhost:4008/booking/getbooking',{headers :{"Authorization" :token}})
        console.log(response)
        const bookings = response.data.bookings;

        // Select the container where salons will be displayed
        const salonList = document.getElementById('salon-list');

        // Clear any existing content
        salonList.innerHTML = '';

        // Loop through each salon and create a card
        bookings.forEach(salon => {
            const salonCard = document.createElement('div');
            salonCard.classList.add('salon-card');
            salonCard.id=`${salon.id}`

            salonCard.innerHTML = `
                <h3>${salon.service}</h3>
                <p class="gmail">${salon.datetime}</p>
                <button type="submit" onclick="reshedule(${salon.id})">reshedule</button>
                <button type="submit" onclick="shedulelater(${salon.id})">shedulelater</button>
                <button type="submit" onclick="pay(${salon.id})">pay</button>
                <button type="submit" onclick="addreviews(${salon.id})">addreview</button>   
                
                
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


async function reshedule(bookingId){
    console.log("Hi")
    const token=localStorage.getItem("token")
    const response=await axios.get(`http://localhost:4008/booking/reshedule/${bookingId}`,{headers :{"Authorization" :token}})
    console.log(response)
    window.location.href = "./homePage.html";


}
async function shedulelater(bookingId){
    try{
        console.log("Hi")
        const token=localStorage.getItem("token")
        const response=await axios.get(`http://localhost:4008/booking/reshedule/${bookingId}`,{headers :{"Authorization" :token}})
        console.log(response)
        const shedule=document.getElementById(bookingId)
        shedule.remove()
   

    
    
    
    
    }
   

    catch(err){
        console.log(err)
    }
   


}
async function pay(bookingId){
    try{
        console.log(bookingId)
        const token=localStorage.getItem("token")
        const response=await axios.get(`http://localhost:4008/pay/purchase/${bookingId}`,{headers :{"Authorization" :token}})
        console.log(response)
        var options=
       {
      "key":response.data.key_id,//Enter the key id generated from the dashboard
      "order_id":response.data.order.id,//for on time payment
      //This handler function handles the successful payment
      "handler":async function (response){
        
        
        const transactionResponse=await axios.post(`http://localhost:4008/pay/updatetransactionstatus/${bookingId}`,{
          order_id:options.order_id,
          payment_id:response.razorpay_payment_id
        },{headers :{"Authorization" :token}})
        console.log(transactionResponse)
        addreview()
        
       }

       }
       const rzp1=new Razorpay(options)
       rzp1.open()
       rzp1.on("payment.failed",async function (response){
        const transactionResponses=await axios.post(`http://localhost:4008/pay/updatetransactionstatusfailed/${bookingId}`,{
        order_id:options.order_id,
        payment_id:response.error.metadata.payment_id
      },{headers :{"Authorization" :token}});

      
      
      
     console.log(transactionResponses)
     alert("Something went wrong with the payment")
  
      })
       

    }
    catch(err){
        console.log(err)
    }
    

}

async function addreview(){
    const token=localStorage.getItem("token")
        const response=await axios.get('http://localhost:4008/booking/getbooking',{headers :{"Authorization" :token}})
        console.log(response)
        const bookings = response.data.bookings;

        // Select the container where salons will be displayed
        const salonList = document.getElementById('salon-list');

        // Clear any existing content
        salonList.innerHTML = '';

        // Loop through each salon and create a card
        bookings.forEach(salon => {
            const salonCard = document.createElement('div');
            salonCard.classList.add('salon-card');
            salonCard.id=`${salon.id}`

            salonCard.innerHTML = `
                <h3>${salon.service}</h3>
                <p class="gmail">${salon.datetime}</p>
                <button type="submit" onclick="addreviews(${salon.id})">addreview</button>   
            `;
            
            // Append the salon card to the container
            salonList.appendChild(salonCard);
            
        });
    

}











function addreviews(salonId){
    console.log("hi")
    const id=document.getElementById("reviews")
    const a=`
    <form onsubmit="reviewss(event)">
        <input type="hidden" name="bookingId" value="${salonId}"></input>
        <label for="comment">Your review:</label><br>
        <textarea id="comment" name="review" rows="4" cols="50" placeholder="Write your review here..."></textarea><br><br>
        <button type="submit">submit</button>
    </form>
    `
    id.innerHTML=a

}
async function reviewss(event){
    event.preventDefault()
    console.log("Hi")
    
    console.log(event.target.bookingId.value)
    console.log(event.target.review.value)
    const obj={
        bookingId:event.target.bookingId.value,
        review:event.target.review.value,
    }
    const token=localStorage.getItem("token")
    const response=await axios.post('http://localhost:4008/reviews/addreview',obj,{headers :{"Authorization" :token}})
    console.log(response)
    window.location.href = "./reviews.html";
}
