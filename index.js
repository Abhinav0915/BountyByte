const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
// const Profile = require('./model/profileSchema');

async function main() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/BountyByte');
    console.log('Connection Successful');
  } catch (error) {
    console.error('Connection Error:', error);
  }
}
mongoose.set('strictQuery', false);
main().catch(err => console.log(err));

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'/views'))
app.use(express.static(path.join(__dirname, '/public')));

app.listen(8080, (req,res)=>{
    console.log('Server is running on port 3000');
})


app.get('/' , (req,res) => {
    res.render('homepage')
})
app.get('/postQuestion' , (req,res) => {
    res.send('Page Where You can Post Your Question')
})
app.get('/answerQuestion' , (req,res) => {
    res.send('Page Where You can Redeem Points')
})
app.get('/profile' , (req,res) => {
    res.send('Page Where You can see your Profile')
})

app.get('/settings', (req,res) => {
    res.render('settings')
})

app.get('/login',(req,res) => {
    res.render('login')
})

app.get('/signup',(req,res) => {
    res.render('signup')
})

// const profile1 = new Profile({
//     firstName: 'Abhinav',
//     lastName: 'Saxena',
//     phone : 7565893606,
//     email: 'abhinav150601@gmail.com',
//     address: 'Ayodhya Prasad Apartment',
//     city: 'Gorakhpur',
//     state: 'Uttar Pradesh',
//     pincode: 273001
// })

