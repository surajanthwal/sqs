// Load the SDK for JavaScript
var AWS = require('aws-sdk');
// Load credentials and set the region from the JSON file
AWS.config.loadFromPath('./config.json');
// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});



function sendMessageToQueue() {
    //Random number generator between 1 and 6
    var num = (Math.floor(Math.random() * 6) + 1).toString();

    var params = {
        DelaySeconds: 10,
        MessageBody: num,
        QueueUrl: "https://sqs.ap-southeast-1.amazonaws.com/172479643299/q-cricket"
    };

    sqs.sendMessage(params, function (err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data.MessageId);
        }
    });
}

function sendContinousMessages() {
    setInterval(sendMessageToQueue, 10000);
}

module.exports = {
    sendContinousMessages: sendContinousMessages
}



// MessageAttributes: {
//     "Title": {
//         DataType: "String",
//         StringValue: "I am a message attribute"
//     }
// },
// for getting queue url
// var params = { QueueName: 'q-cricket'};
//
// sqs.getQueueUrl(params, function(err, data) {
//     if (err) {
//         console.log("Error", err);
//     } else {
//         console.log("Success", data.QueueUrl);
//     }
// });