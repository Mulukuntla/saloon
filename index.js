const form=document.querySelector("form")
    form.addEventListener('submit',e=>{
      e.preventDefault()
      if(!form.checkValidity()){
        
      }
      form.classList.add('was-validated')
    })
function handleFormSubmit(event){
    event.preventDefault();
    const form=document.querySelector("form")
    form.addEventListener('submit',e=>{
      e.preventDefault()
      if(!form.checkValidity()){
        
      }
      form.classList.add('was-validated')
    })
    console.log('Hi');
    
   
    let namee=event.target.amount.value;
    let emaill=event.target.text.value;
    let phonee=event.target.cate.value;
    localStorage.setItem('amount',namee)
    localStorage.setItem('text',emaill)
    localStorage.setItem('cate',phonee)
    
    
    let obj= {
      'amount':namee,
      'text':emaill,
      'cate':phonee,
    }
    
    console.log(namee);
    console.log(emaill);
    console.log(phonee);
    console.log(obj);
    localStorage.setItem(obj.email,JSON.stringify(obj));
    
    const parent=document.getElementById('listOfItems');
    const child=document.createElement('li');
    child.textContent=`${obj.amount} - ${obj.text} - ${obj.cate}`
    const deleteButton=document.createElement('button');
    const deleteText=document.createTextNode('delete expense');
    deleteButton.appendChild(deleteText)
    deleteButton.type='button'
    deleteButton.value='Delete'
    child.appendChild(deleteButton)
    parent.appendChild(child)
    deleteButton.onclick=()=>{
      localStorage.removeItem(obj.text);
      parent.removeChild(child)  
    }
    const editButton=document.createElement('button');
    const editText=document.createTextNode('edit expense');
    editButton.appendChild(editText)
    editButton.type='button'
    editButton.value='edit'
    child.appendChild(editButton)
    editButton.onclick=()=>{
      localStorage.removeItem(obj.text);
      parent.removeChild(child)  
      document.getElementById('amount').value=obj.amount
      document.getElementById('text').value=obj.text
      document.getElementById('cate').value=obj.cate
    }
    
    
    
    
    
  }