
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.getElementById('msg2')


weatherForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    msg1.textContent ="loading...."
    msg2.textContent =""
    const location = search.value
    fetch("/weather?address="+encodeURIComponent(location)).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            msg1.textContent = data.error
        }else{
            msg1.textContent = data.forecast
            msg2.textContent = data.location 
            
        }
      
    })
})
})