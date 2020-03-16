const path = require('path')
const handlebars = require('express-handlebars')
const hbs = require('hbs')
const geocoder = require('./utils/geocode')
const foreDisplay = require('./utils/forecast')

const express = require('express')

const appExpress = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
appExpress.set('views' , viewsPath)
appExpress.set('view engine' , 'hbs')
hbs.registerPartials(partialsPath)

//Set up express static form
appExpress.use(express.static(publicPath))

appExpress.get('' , (req,res) => {
    //just need the name of the file in the folder
    res.render('index' , {
        title : 'Wanna Check The Weather?',
        name : 'Noah Sam'
    })
})

appExpress.get('/about' , (req,res) => {
    res.render('about', {
        title: 'About me',
        name : 'Bob Cyka'
    })
})
appExpress.get('/help' , (req,res) => {
    res.render('help', {
        helpText : 'This is some help text',
        title: 'help',
        name : 'Bob Cyka'
    })
})
//appExpress.get('/products', (req,res) => {
//    if (!req.query.search) {
//       return res.send({
//            error: 'You must provide a search here'
//        })
//    }


// if you see cannot set headers after they are sent to client, it means you sent two types
// of responses which means res.send is sent more than once which is the cap

//console.log(req.query.search)
//    res.send({
//        products: []
//    })
//})

appExpress.get('/weather' ,(req,res) => {
    if (!req.query.address) {
        return res.send({
             addressError: 'You must provide an address here'
         })
     } else {
        geocoder(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if (error) {
               return res.send({ error })
            }
        
            foreDisplay(latitude,longitude, (error,forecastData) => {
                if (error) {
                    return res.send({ error })
                }
                res.send({
                    location,
                    forecast: forecastData,
                    address: req.query.address
                }) 

            })
        })
     }
})

// has to be last for this 404 page because It will check all the matches before this gets called
// which means if you make another page you put this BEFORE this gets called
appExpress.get('/help/*' , (req,res) =>{
    res.render('404-page' , {
        title: '404',
        errorMessage: 'Help article not found',
        name :'Bob Cyka'
    })
})


appExpress.get('*' , (req,res) =>{
    res.render('404-page' , {
        title: '404',
        errorMessage: 'Page Not found',
        name :'Bob Cyka'
    })
})

appExpress.listen(port , () => {
    console.log('Server is up on port ' + port)
})