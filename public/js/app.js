console.log('client side java script file loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

// fetch('http://localhost:3000/weather?address=boston').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error)
//         }
//         else {
//             console.log(data)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    console.log(location)

    messageOne.textContent = 'loading...'
    messageTwo.textContent = '...'

    if (!location) {
        console.log('Must enter location')
    }
    else {
        const locationURL = 'http://localhost:3000/weather?address=' + location
        fetch(locationURL).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    console.log(data)
                    messageOne.textContent = "Error"
                    messageTwo.textContent = "Unable to find requested location"
                }
                else {
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.description
                    console.log(data)
                }
            })
        })
    }
})
/**
 * 
 * 1) snd a request to geocode using fetch
 * 2) use .then() to get the response
 * 3) in .then() send another request to weather using fetch
 * 4) use .then() to get the response
 * 5) aend this respomse to the user
 * 6) .catch() to handle errors
 */