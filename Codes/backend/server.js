const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = express.Router(); //to create an instance of the Express Router
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to USP_ATS application." });
  });

mongoose.connect('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

//delivering all available users items
userRoutes.route('/').get(function(req, res) {
    User.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

//implemented is /:id. This path extension is used to retrieve a user item by providing an ID
userRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    User.findById(id, function(err, user) {
        res.json(user);
    });
});

//to add new user items by sending a HTTP post request (/add)
userRoutes.route('/add').post(function(req, res) {
    let user = new Users(req.body);
    user.save()
        .then(user => {
            res.status(200).json({'user': 'user added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new user failed');
        });
});

//used to update an existing user item with specific id
userRoutes.route('/update/:id').post(function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if (!user)
            res.status(404).send("data is not found");
        else
            user.firstname = req.body.firstname;
            user.lastname = req.body.lastname;
            user.email = req.body.email;
            user.title = req.body.title;

            user.save().then(user => {
                res.json('user updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

app.use('/users', userRoutes); //middleware and will take control of request starting with path /users

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});