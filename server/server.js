const express = require("express");
const app = express();
const { MongoClient } = require('mongodb'); // needed to store listings in mongodb
app.use(express.json()); // parse body to json, built in middleware

const inquires = []; // array to hold inquiries data
let tempID = 10000000; // variable for listing ids

// monogo init
const url = process.env.MONGO_HOST || 'mongodb://localhost:27017';
const mongoClient = new MongoClient(url);

mongoClient.connect((err) => {
  if (err) console.log(err);
  const db = mongoClient.db('test101');

  // get last inserted id number
  db.collection('listings').findOne(
    {},
    { sort: { _id: -1 } },
    (err, data) => {
       console.log(data.data.id);
       tempID = data.data.id + 1;
    },
  );

  app.post('/api/createListing', (req, res) => {
    // sets object values from received data 
    const tempList = {
      description: req.body.description,
      type: req.body.type,
      price: req.body.price,
      title: req.body.title,
      id: tempID
    };

    tempID++; // increment id for future listings

    // insert listing into database
    db.collection('listings').insertOne({ data: tempList })
      .then(() => console.log('db insert worked'))
      .catch((e) => console.log(e));

    // prints the received listing to console
    console.log('Current listing:');
    console.log(tempList);

    res.send(tempList);
  });

  app.get('/api/viewListings', (req, res) => {
    // get listings from database
    db.collection('listings').find({}).toArray()
      .then((result) => {
        console.log(result);
        res.send(result);
      });
  });

});

// endpoints
app.get('/api/deleteListing', (req, res) => {
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
  // if there is a query in the url, search the array
  else {
    // loops through all the listings checking if the id matches
    for (let i = 0; i < listings.length; i++) {
      // if found, delete listing
      if (listings[i].id === parseInt(req.query.id)) {
        console.log('Deleting listing:');
        console.log(listings[i]);
        listings.splice(i, 1);
        break;
      }
    }

    const tempRes = {
      success: true,
      items: listings,
      inquiries: inquires,
      errorCode: 200
    };

    res.send(tempRes); // respond with filtered listings
  }
});

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
