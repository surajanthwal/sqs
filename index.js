// node modules to be imported
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');


//importing producer module
var producer = require('./producer');

//importing consumer module
var consumer = require('./consumer');

//starting producer to continously generate nd supply runs to queue
producer.sendContinousMessages();

//consuming the runs from queue and storing in MongoDB
consumer.startConsumer();


// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set our port
var port = process.env.PORT || 8080;
console.log('SQS application is running on port ' + port);
// startup our app at http://localhost:8080
app.listen(port);




//deleting received messages
// var queueURL = "https://sqs.ap-southeast-1.amazonaws.com/172479643299/q-cricket";

// var params = {
//     AttributeNames: [
//         "SentTimestamp"
//     ],
//     MaxNumberOfMessages: 1,
//     MessageAttributeNames: [
//         "All"
//     ],
//     QueueUrl: queueURL,
//     VisibilityTimeout: 0,
//     WaitTimeSeconds: 0
// };
//
// sqs.receiveMessage(params, function (err, data) {
//     if (err) {
//         console.log("Receive Error", err);
//     } else {
//
//         console.log("received data");
//         console.log(data);
//         if (data.Messages) {
//             var deleteParams = {
//                 QueueUrl: queueURL,
//                 ReceiptHandle: data.Messages[0].ReceiptHandle
//             };
//             sqs.deleteMessage(deleteParams, function (err, data) {
//                 if (err) {
//                     console.log("Delete Error", err);
//                 } else {
//                     console.log("Message Deleted", data);
//                 }
//             });
//         }
//     }
// });


