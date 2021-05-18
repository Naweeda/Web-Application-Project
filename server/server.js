const express = require("express");
const app = express();
const { MongoClient } = require('mongodb'); // needed to store listings in mongodb
const mongodb = require('mongodb'); // needed for delete
app.use(express.json()); // parse body to json, built in middleware

const upload = require('./imageUpload'); // s3 upload

// from HW3 test files
function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// monogo init
const url = process.env.MONGO_HOST || 'mongodb://localhost:27017';
const mongoClient = new MongoClient(url);

mongoClient.connect((err) => {
  if (err) console.log(err);
  const db = mongoClient.db('test101');

  // gets uploaded file from multer
  app.post('/api/createListing', upload.single("imageFile"), (req, res) => {
    // sets object values from received data 
    const tempList = {
      description: req.body.description,
      type: req.body.type,
      price: req.body.price,
      title: req.body.title,
      imageFile: 'req.file.location',
      userId: req.body.userId
    };

    if (!req.body.imageFile) {
      tempList.imageFile = req.file.location; // set image location of uploaded file
    }
    else {
      tempList.imageFile = 'https://csc667.s3-us-west-1.amazonaws.com/default-image.jpg'; // if no image is uploaded, use default hosted on bucket
    }

    // insert listing into database
    db.collection('listings').insertOne({ data: tempList })
      .then(() => console.log('db insert worked'))
      .catch((e) => console.log(e));

    // prints the received listing to console
    console.log('Current listing:');
    console.log(tempList);

    // get and returns all the listings
    db.collection('listings').find({}).toArray()
      .then((result) => {
        res.send(result);
      });
  });

  app.get('/api/viewListings', (req, res) => {
    // checks if there were no queries in the url
    if (Object.keys(req.query).length === 0) {
      // get all listings from database
      db.collection('listings').find({}).toArray()
        .then((result) => {
          console.log(result);
          res.send(result);
        });
    }
    else {
      // get individual listing from database
      db.collection('listings').findOne({ _id: new mongodb.ObjectID(req.query.id) })
        .then((result) => {

          // gets listing owner so it doesn't have to be in another endpoint
          db.collection('credentials').findOne({ _id: new mongodb.ObjectID(result.data.userId) })
            .then((result2) => {
              result.data.name = result2.data.name;
              result.data.email = result2.data.email;
              console.log(result);
              res.send(result);
            });
        });
    }
  });

  app.get('/api/deleteListing', (req, res) => {
    // checks if there were no queries in the url
    if (Object.keys(req.query).length === 0) {
      res.send('Error deleting');
    }
    // if there is a query in the url, search the array
    else {
      console.log('Deleting a listing');
      db.collection('listings', function (err, collection) {
        collection.deleteOne({ _id: new mongodb.ObjectID(req.query.id) });
      });

      // get and returns all the listings
      db.collection('listings').find({}).toArray()
        .then((result) => {
          res.send(result);
        });
    }
  });

  // gets the user of a listing
  app.get('/api/getListingUser', (req, res) => {
    // checks if there were no queries in the url
    if (Object.keys(req.query).length === 0) {
      res.send('Error getting user');
    }
    else {
      // get individual listing from database
      db.collection('credentials').findOne({ _id: new mongodb.ObjectID(req.query.id) })
        .then((result) => {
          console.log(result);
          res.send(result);
        });
    }
  });

  // saves data of user into database
  app.post('/api/register', (req, res) => {
    const registerInfo = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    db.collection('credentials').insertOne({ data: registerInfo })
      .then(() => console.log('db insert worked'))
      .catch((e) => console.log(e));

    res.send(registerInfo);
  });

  // authenticates login credentials enetered by user
  app.post('/api/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    db.collection('credentials').findOne({ 'data.email': `${email}`, 'data.password': `${password}` })
      .then((result) => {
        console.log(result);
        res.send(result);
      })
      .catch((e) => console.log(e));
  });

});

module.exports = app;

if (require.main === module) {
  console.log('Starting api app');
  app.listen(4001); // changed to 4001 from 4000
}
