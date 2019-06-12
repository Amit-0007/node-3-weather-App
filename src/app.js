const path= require('path')
const express= require('express')
const hbs= require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const app= express()


const publicdiPath=path.join(__dirname,'../public')
const viewpath=path.join(__dirname,'../template')
const partialPath= path.join(__dirname,'../template/partials')
app.use(express.static(publicdiPath))

app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialPath)

 app.get('',(req,res)=>{
     res.render('index',{
         title:'Weather App',
         name:'Amit Singh'
     })
 })
 app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Amit singh'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helpfulText:'This is some helpful text',
        title:'Help',
        name:'Amit singh'


    })
})
 app.get('/weather',(req,res)=>{
     if(!req.query.adress){
        return  res.send({
            error:'please povide address '
        })
     }
    geocode(req.query.adress,(error,{longitude,latitude,location}={})=>{
       
        if(error){
            return res.send({error:error})
        }
        forecast(latitude,longitude, (error, forecastdata) => {
            if(error){
                return res.send({error:error})
            }
           return res.send({
               forecast:forecastdata,
               location,
               address:req.query.adress
           })
        })
    })
})

app.get('/products',(req,res)=>{
    console.log(req.query.search)
    if(!req.query.search){
        return  res.send({
            error:'please povide search term'
        })
    }
    res.send({
        products:[]
    })
})

 app.get('/help/*',(req,res)=>{
res.render('error-404',{
    title:'Help',
    name:'Amit singh',
    errorMessage:'Help Page Not found'
})
 })
 app.get('*',(req,res)=>{
    res.render('error-404',{
        title:'404',
        name:'Amit singh',
        errorMessage:'Page Not found'
     })
    })
 app.listen(3000,()=>{
     console.log('listening on port 3000')
 })