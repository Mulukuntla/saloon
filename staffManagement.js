async function addStaffMember(event) {
    try{
        event.preventDefault();
        console.log("Hi")
        // Get form values
        const name = event.target.name.value;
        const specializationInput = event.target.specialization.value;
        const skillsInput = event.target.skills.value;
        const availability = event.target.availability.value;
        let specializations = [];
        let skills = [];
        console.log(specializationInput)
    // Process specialization inputs
        if (specializationInput.includes(",")) {
            specializations = specializationInput
                .split(',')
                .map((item, index) => ({ [`specialization${index + 1}`]: item.trim() }));
        } else if (specializationInput.trim()) {
            // Single specialization without commas
            specializations.push({ specialization1: specializationInput});
        }

        // Process skills inputs
        if (skillsInput.includes(",")) {
            skills = skillsInput
                .split(',')
                .map((item, index) => ({ [`skill${index + 1}`]: item.trim() }));
        } else if (skillsInput.trim()) {
            // Single skill without commas
            skills.push({ skill1: skillsInput });
        }

        // Log the processed values
        console.log(specializations)
        console.log(name, specializations, skills, availability);
        const obj={
            name:name,
            specialization:specializations,
            skills:skills,
            availability:availability,
        }
        const saloonToken=localStorage.getItem("saloonToken")
        
        const response=await axios.post('http://localhost:4008/services/addStaff',obj,{headers :{"Authorization" :saloonToken}})
        console.log(response)

    }
    catch(err){
        console.log(err)
    }

}