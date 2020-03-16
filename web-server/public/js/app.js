console.log('Client side javascript file is loaded!')




const formData = document.querySelector('.weatherForm')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')

messageOne.textContent = 'From Javascript'

formData.addEventListener('submit' , (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((forecastResponse) => {
    forecastResponse.json().then((forecastData) => {
        if(forecastData.error) {
            messageOne.textContent = forecastData.error
        } else {
            messageOne.textContent = forecastData.location
            messageTwo.textContent = forecastData.forecast
        }
    })
})

    

    console.log(location)
})