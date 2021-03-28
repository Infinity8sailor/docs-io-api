const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dbName = 'docs-io';
const url = 'mongodb+srv://user_8808:8808@cluster0.5mmlh.mongodb.net/test';

const client = new MongoClient(url,{useNewUrlParser: true, useUnifiedTopology: true});


const Connect = () => {client.connect((err) => {
  assert.strictEqual(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  client.close();
})};

function update_data(data){
    var topic = data.name
    fs.writeFile('./public/topics/'+topic+'.json',JSON.stringify(data),err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    });
}

function add_new_topic(data,topics){
    var topic = data[0].toUpperCase()+ data.slice(1);
    // console.log("Capitalized here",topic);
    const empty_data = {"name":topic,"color":"red","cells":[
        {
            "cell_layout":{"cell_type":"Markdown","code_lan":"markdown"},
            "source":"Add Edit Content Here....!"
        }
    ]}
    fs.writeFile('./public/topics/'+topic+'.json',JSON.stringify(empty_data),err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    });
    topics.topics.push(topic);
    fs.writeFile('./public/topics/Topics.json',JSON.stringify(topics),err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    });
}

function add_new_image(img,metadata){
    var name = new Date.now();
    // console.log("Capitalized here",topic);
    const empty_data = {"name":topic,"color":"red","cells":[
        {
            "cell_layout":{"cell_type":"Img","code_lan":"markdown"},
            "source":"Add Edit Content Here....!"
        }
    ]}
    fs.writeFile('./public/topics'+topic+'.json',JSON.stringify(empty_data),err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    });
    topics.topics.push(topic);
    fs.writeFile('./public/topics/Topics.json',JSON.stringify(topics),err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    });
}

module.exports =  {update_data, add_new_topic};