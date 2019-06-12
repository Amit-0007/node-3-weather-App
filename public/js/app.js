console.log('from js file')

const weatherForm=document.querySelector('form')
const searchElement= document.querySelector('input')
const messageOne= document.querySelector('#message-1')
const messagetwo= document.querySelector('#message-2')

messageOne.textContent='Loading...'
messagetwo.textContent=''

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location=searchElement.value
    fetch('http://localhost:3000/weather?adress='+location).then((response)=>{
        response.json().then((data)=>{
            if (data.error){
                messageOne.textContent= data.location
               
            }
            messageOne.textContent=data.location
            messagetwo.textContent=data.forecast
        })
        })
})