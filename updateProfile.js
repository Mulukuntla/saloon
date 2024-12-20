async function updatePreferences(event) {
    event.preventDefault();
    
    // Get values from the form
    const userName = event.target.userName.value;
    const phone = event.target.phone.value;
    const street = event.target.street.value;
    const apartment = event.target.apartment.value;
    const zip = event.target.zip.value;
    const city = event.target.city.value;
    const country = event.target.country.value;
    const preferences = event.target.preferences.value;  // Make sure this matches the HTML name

    // Log the collected data
    console.log(userName, phone, street, apartment, zip, city, country, preferences);
    const preferencesArray = preferences.split(',').map(item => item.trim());  // Split by commas and trim spaces
    
    const preferencesObject = preferencesArray.reduce((obj, item, index) => {
        obj[`preference${index + 1}`] = item;
        return obj;
    }, {});
    const formData = {
        userName,
        phone,
        street,
        apartment,
        zip,
        city,
        country,
        preferences: preferencesObject  // Store preferences as an object
    };
    console.log(formData);
    const token=localStorage.getItem("token")
    const response=await axios.post('http://localhost:4008/user/updatePreferences',formData,{headers :{"Authorization" :token}})
    console.log(response)
}