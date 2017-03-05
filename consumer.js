var constants = require('./Constants');
var run = require('./run');
var mongoose = require('mongoose');

// connect to our mongoDB database 
// (uncomment after you enter in your own credentials in config/db.js)
mongoose.connect(constants.DB);
var dbconnect = mongoose.connection;
dbconnect.on('error', console.error.bind(console, 'DB connection error.'))
    .once('open', console.log.bind(console, 'DB Connection established.'));

const Consumer = require('sqs-consumer');
const AWS = require('aws-sdk');

AWS.config.update({
    region: constants.REGION,
    accessKeyId: constants.ACCESS_KEY_ID,
    secretAccessKey: constants.SECRET_ACCESS_KEY
});

function startConsumer() {
    const app = Consumer.create({
        queueUrl: 'https://sqs.ap-southeast-1.amazonaws.com/172479643299/q-cricket',
        handleMessage: function (message, done) {
            console.log(message);
            if (message.Body) {
                var newRun = run({
                    run: message.Body
                });
            
                newRun.save(function (err, user) {
                    if (err)
                        console.log("err");
                   
                });
            }
            done();

        },
        sqs: new AWS.SQS()
    });

    app.on('error', function (err) {
        console.log(err.message);
    });

    app.start();
}

module.exports = {
    startConsumer: startConsumer
};