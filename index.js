const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const multer = require('multer');
const app = express();
const path = require('path');
const login = require('./model/loginSchema');
const crypto = require('crypto');
const Question = require('./model/postQuestion');
// const Profile = require('./model/profileSchema');

// Generate a random secret key
const secretKey = crypto.randomBytes(32).toString('hex');

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
app.use(express.urlencoded({extended: false}))

app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
  }));

app.listen(3000, (req,res)=>{
    console.log('Server is running on port 3000');
})

//storage settings
const storage = multer.diskStorage({
    destination: './public/uploads', // Where to store uploaded files
    filename: (req, file, cb) => {
      // Generate a unique filename (you can customize this)
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({storage: storage});

app.get('/homepage' , (req,res) => {
    res.render('homepage')
})
app.get('/postQuestion' , (req,res) => {
    res.render('postQuestion')
})
app.get('/problems' , async (req,res) => {
    const questions = await Question.find({})
    res.render('problems', {questions})
})
app.get('/profile' , (req,res) => {
    res.send('Page Where You can see your Profile')
})

app.get('/settings', (req,res) => {
    res.render('settings')
})

app.get('/',(req,res) => {
    res.render('login')
})

app.get('/signup',(req,res) => {
    res.render('signup')
})

app.post('/signup', async (req,res)=>{
    const data = {
        email: req.body.email,
        password: req.body.password
    }
    await login.insertMany([data])
    res.redirect('/homepage')
})

app.post('/', async (req,res)=>{
    const data = {
        email: req.body.email,
        password: req.body.password
    }
    const result = await login.findOne(data)
    try {
        if(result){
        res.redirect('/homepage')
    }
    else{
        res.render('login',{error: 'Wrond Details!!'})
    }
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
    
})
app.get('/logout', (req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            return res.redirect('/homepage')
        }
        res.clearCookie('sid')
        res.redirect('/')
    })
}
)

app.post('/postQuestion',upload.single('codeImageField'), (req, res) => {
    // Access the form data using req.body
    const question = new Question({
        questionField: req.body.questionField,
        preferredLanguage: req.body.preferredLanguage,
        bountyField: req.body.bountyField,
        timeField: req.body.timeField,
        codeImageField: req.file.filename
    });

    // Save the question to the database
    question.save()
        .then(() => {
            // Handle successful submission
            res.send('Question submitted successfully');
        })
        .catch(error => {
            // Handle any errors
            res.status(500).send('Error submitting question: ' + error.message);
        });
});

