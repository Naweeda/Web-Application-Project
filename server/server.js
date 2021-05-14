const express = require("express");
const app = express();
const { MongoClient, } = require('mongodb'); // needed to store listings in mongodb
const mongodb = require('mongodb'); // needed for delete
app.use(express.json()); // parse body to json, built in middleware

const upload = require('./imageUpload'); // s3 upload

const inquires = []; // array to hold inquiries data

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
      id: makeid(8)
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
        // console.log(result);
        res.send(result);
      });
  });

  app.get('/api/viewListings', (req, res) => {
    // get listings from database
    db.collection('listings').find({}).toArray()
      .then((result) => {
        // console.log(result);
        res.send(result);
      });
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

});

// endpoints

app.post('/api/makeInquiry', (req, res) => {
  // checks if there were no queries in the url
  if (Object.keys(req.query).length === 0) {
    const tempRes = {
      success: false,
      items: [],
      inquiries: [],
      errorCode: 404
    };

    res.send(tempRes);
  }
  else {
    // sets object values from received data 
    const tempInquiry = {
      message: req.body.message,
      id: parseInt(req.query.listingId)
    };

    inquires.push(tempInquiry);

    // set values for response
    const tempRes = {
      success: true,
      items: listings,
      inquiries: inquires,
      errorCode: 200
    };

    // prints the received listing to console
    console.log('Current inquiry:');
    console.log(tempInquiry);

    res.send(tempRes);
  }
});

app.get('/api/getInquiries', (req, res) => {
  // checks if there were no queries in the url
  if (Object.keys(req.query).length === 0) {
    const tempRes = {
      success: true,
      items: listings,
      inquiries: inquires,
      errorCode: 200
    };

    res.send(tempRes); // respond with the full list
  }
  // if the query in the url is for 'type', filter the array
  else {
    let filteredInquires = []; // array to hold filtered results
    // loops through all the listings checking if the type matches
    for (let i = 0; i < inquires.length; i++) if (inquires[i].id === parseInt(req.query.listingId)) filteredInquires.push(inquires[i]);

    const tempRes = {
      success: true,
      items: listings,
      inquiries: filteredInquires,
      errorCode: 200
    };

    res.send(tempRes); // respond with filtered listings
  }
});

module.exports = app;

if (require.main === module) {
  console.log('Starting api app');
  app.listen(4001); // changed to 4001 from 4000
}
