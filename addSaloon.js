async function addSaloon(event){
    event.preventDefault();
    
    // Get values from the form
    const name = event.target.name.value;
    const gmail = event.target.gmail.value;
    const password = event.target.password.value;
    const phone = event.target.phone.value;
    const street = event.target.street.value;
    const apartment = event.target.apartment.value;
    const zip = event.target.zip.value;
    const city = event.target.city.value;
    const country = event.target.country.value;
   
    // Log the collected data
    const obj={
        name,
        gmail,
        password,
        phone,
        street,
        apartment,
        zip,
        city,
        country
    }
    console.log(name,gmail,password, phone, street, apartment, zip, city, country);
    const response=await axios.post('http://localhost:4008/saloon/signup',formData,{headers :{"Authorization" :token}})
    console.log(response)
}