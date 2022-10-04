const express = require('express')
const mongoose = require('mongoose')
const app = express();
const Blog = require('./models/blog');
app.set('view engine','ejs');

const dbURI = 'mongodb+srv://Khivvi:Raunak@timetables.huo6slc.mongodb.net/Timetable?retryWrites=true&w=majority';
mongoose.connect(dbURI);
app.listen(3000);
app.use((req,res,next) => {
    console.log('new request made:');
    console.log('host: ',req.hostname);
    console.log('path: ',req.path);
    console.log('method: ', req.method);
    next();
})
app.use(express.urlencoded({extended:true}));

app.get('/', (req,res)=>
{
    res.redirect('/blogs');
});

app.get('/about', (req,res)=>
{
    res.render('about', {title:'Home'}); 
});
app.get('/blogs', (req,res)=>{
    Blog.find().sort({createdAt:-1})
    .then((result)=>{
        res.render('index',{title:'All Blogs',blogs:result})
        
    })
    .catch((err) =>{
        console.log(err)
    })

    
});
app.post('/blogs',(req,res)=> {
    const blog = new Blog(req.body);
    blog.save()
    .then((result)=>{
    res.redirect('/');
    })
    .catch((err) =>{
        console.log(err)
    })

});
app.get('/blogs/create',(req,res)=>{
    res.render('create', {title:'Home'})
})


app.use((req,res)=>{
    res.status(404).render('404', {title:'Home'});
});
