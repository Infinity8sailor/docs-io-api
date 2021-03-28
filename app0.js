const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const upload = require('./public/topics/Shivam.json');

//requiring path and fs modules
const path = require('path');
const fs = require('fs');
//joining path of directory 

const directoryPath = path.join(__dirname, 'public/topics');
//passsing directoryPath and callback function


// Connection URL
const url = 'mongodb+srv://user_8808:8808@cluster0.5mmlh.mongodb.net/test';

const dbName = 'docs-io';

const client = new MongoClient(url,{useUnifiedTopology: true});

const insertDocuments = function(db,file) {
    // Get the documents collection
    const collection = db.collection('topics');
    json_data = file;//JSON.stringify(file);
    // Insert some documents
    collection.insertMany([
      json_data
    ], function(err, result) {
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      assert.equal(1, result.ops.length);
      console.log("Inserted 3 documents into the collection");
    });
  };

const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('topics');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs)
      callback(docs);
    });
};

const updateDocument = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('topics');
    // Update document where a is 2, set b equal to 1
    collection.updateOne({ a : 2 }
      , { $set: { b : 1 } }, function(err, result) {
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      console.log("Updated the document with the field a equal to 2");
      callback(result);
    });  
};

const removeDocument = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('topics');
    // Delete document where a is 3
    collection.deleteOne({ a : 3 }, function(err, result) {
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      console.log("Removed the document with the field a equal to 3");
      callback(result);
    });    
};

const indexCollection = function(db, callback) {
    db.collection('topics').createIndex(
      { "a": 1 },
        null,
        function(err, results) {
          console.log(results);
          callback();
      }
    );
  };

var loadFile = function (filePath, done) {
    filePath = 'public/topics/'+filePath;
    console.log("filepath",filePath);
    var xhr = new XMLHTTPRequest();
    xhr.onload = function () { return done(this.responseText) }
    xhr.open("GET", filePath, true);
    xhr.send();
};

var loadLocalFile = function (filePath, done) {
    var fr = new FileReader();
    fr.onload = function () { return done(this.result); }
    fr.readAsText(filePath);
};
  

// // Use connect method to connect to the server
client.connect(function(err) {
  assert.strictEqual(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  insertDocuments(db, upload);
  console.log(upload);
  setTimeout(() => { client.close(); }, 5000);
  // client.close();
});
