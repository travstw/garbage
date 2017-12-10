const express = require('express');
const hbs = require('hbs');
const app = express();
const fs = require('fs');

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    let now = new Date().toString();
    let log =`${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('unable to append file');
        }
    })
    
    next();
})

// app.use((req, res, next) => { 
//     res.render('maintenance.hbs',  {
//         pageTitle: 'Maintenance',
//         date: new Date().toString(),
//         currentYear: new Date().getFullYear()
//     })
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        currentYear: new Date().getFullYear(),
        welcomeMessage: 'Eat my balls'
    });
})

app.get('/bad', (req, res) => {
    res.send({
        error: 'You blew it'
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
})
app.listen(3000, () => {
    console.log('Server is up on port 3000');
});