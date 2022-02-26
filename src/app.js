const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

/* console.log(__dirname)
console.log(path.join(__dirname,"../public"))
 */
const app = express()

const port = process.env.PORT || 3000

const publicDirPath = path.join(__dirname,"../public")
const viewsPath = path.join(__dirname,"../templets/views")
const partialsPath = path.join(__dirname,"../templets/partials")
app.set('view engine','hbs')
app.set('views',viewsPath)

hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))

/* app.get('',(req,res)=>{
    res.send("<h1>Weather</h1>")
}) */
 app.get('',(req,res)=>{
    res.render('index',{
        title:'weather',
        name:'hari charan'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help",
        message:"helpful text",
        name:'hari charan'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'hari charan'
    })
})
app.get('/weather',(req,res)=>{
    if (!req.query.address) {
        return res.send({
            error:"address must be provided"
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){  
                return res.send(error)
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })

        })
    })
   /*  res.send({
        forecast:"forecast",
        location:"kurool",
        address:req.query.address
    }) */
})

app.get('/help/*',(req,res)=>{
    res.render('error404',{
        title:"404",
        error:"help article not found",
        name:'hari charan'
    })
})

app.get('*',(req,res)=>{
res.render("error404",{
    title:"404",
        error:"route not there",
        name:'hari charan'
})
})

app.listen(port,()=>{
    console.log('up n running at'+port)
})
