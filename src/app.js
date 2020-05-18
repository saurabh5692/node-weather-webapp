const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geolocation = require('./utils/geolocation')
const weather = require('./utils/weather')


const app = express()


//Define paths
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsDirectoryPath = path.join(__dirname,'../templates/views')
const partialsDirectoryPath = path.join(__dirname,'../templates/partials')

//Setup Handlebars and views/partial location
app.set('views',viewsDirectoryPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsDirectoryPath)


//Setup static content loader
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index',{
        title : 'Welcome',
        name: 'Saurabh'
    })
})
app.get('/about', (req, res)=>{
    res.render('about',{
        title : 'About me',
        name: 'Saurabh'
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        title : 'Helpdesk',
        message: 'Help yourselves',
        name: 'Saurabh'
    })
})

app.get('/weather',(req, res)=>{
    if(!req.query.address)
    {
       return res.send({
            error : 'No address given'
        })
    }

    geolocation(req.query.address, (error, {latitude,longitude,location} ={}) => {
        if(error)
        {
            return res.send({error});
        }   
        weather(latitude, longitude, (error, {summary}) =>{
        if(error)
        {
            return res.send({error});
        }
    
            return res.send({
                location : location,
                forecast : summary,
                address : req.query.address
            })
        })
    })
    
})

app.get('/help/*', (req, res)=>{
    res.render('404',{
        title : '404 not found',
        message: 'Help article not found',
        name: 'Saurabh'
    })
})

app.get('*', (req, res)=>{
    res.render('404',{
        title : '404 not found',
        message: 'Page not found',
        name: 'Saurabh'
    })
})


app.listen(3000,()=>{
    console.log("Server started on port 3000")
})