const AWS = require("aws-sdk");
const sns = new AWS.SNS();
const chance = require("chance").Chance();

module.exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  const orderId = chance.guid();
  const getTogetherId = body.getTogetherId;
  const userEmail = body.userEmail;
  
  const notificationData = {
    orderId,
    getTogetherId,
    userEmail
  }

  const notification = {
      'Message' : JSON.stringify(notificationData),
      'TopicArn' : process.env.joinGetTogetherSnsTopic
  } 

  await sns.publish(notification).promise();
  
  const response = {
    statusCode: 200,
    body: JSON.stringify({ orderId })
  };

  return response;
};