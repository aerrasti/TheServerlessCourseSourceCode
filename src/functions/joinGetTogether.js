const AWSXray = require("aws-xray-sdk");
AWSXray.captureAWS(require("aws-sdk"));

const chance = require("chance").Chance();
const Log = require('@dazn/lambda-powertools-logger');
const sns = require('@dazn/lambda-powertools-sns-client')
const middy = require("middy");
const correlationIds = require('@dazn/lambda-powertools-middleware-correlation-ids');

const handler = async (event, context) => {
  const body = JSON.parse(event.body);
  const orderId = chance.guid();
  const getTogetherId = body.getTogetherId;
  const userEmail = body.userEmail;
  
  const notificationData = {
    orderId,
    getTogetherId,
    userEmail
  }
  
  Log.info("published 'join together post' event", {
    getTogetherId, userEmail }
  );

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

module.exports.handler = middy(handler)
    .use(correlationIds({ sampleDebugLogRate: 0 }));