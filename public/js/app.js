const formElement = document.querySelector('form')
const inputElement = document.querySelector('input')

const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')


formElement.addEventListener('submit',(e)=>{
    e.preventDefault()

    let place = inputElement.value

    message1.textContent = "Loading.."
    message2.textContent = ""

    fetch('/weather?address='+place).then((response) => {
    response.json().then((data) => {
        if(data.error)
        {
            message1.textContent = data.error
        }else{
            message1.textContent = data.location
            message2.textContent = data.forecast
        }
    })
})

})