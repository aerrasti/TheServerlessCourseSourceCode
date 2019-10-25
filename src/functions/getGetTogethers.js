const AWSXray = require("aws-xray-sdk");
AWSXray.captureAWS(require("aws-sdk"));

const http = require("http");
const AWS = require("aws-sdk");
const middy = require('middy')
const { ssm } = require('middy/middlewares')
const dynamodb = new AWS.DynamoDB.DocumentClient();

const FunctionShield = require('@puresec/function-shield');

FunctionShield.configure({
    policy: {
        // 'block' mode => active blocking
        // 'alert' mode => log only
        // 'allow' mode => allowed, implicitly occurs if key does not exist
        outbound_connectivity: "alert",
        read_write_tmp: "block", 
        create_child_process: "block",
        read_handler: "block" },
    token: process.env.functionShieldToken });

const handler = async (event, context) => {

    http.get('http://vgaltes.com');

    const req = {
        TableName: context.tableName,
        Limit: 8
    };

    const resp = await dynamodb.scan(req).promise();
    const res = {
        statusCode: 200,
        body: JSON.stringify(resp.Items),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        }
    };

    return res;
}

module.exports.handler = middy(handler).use(
    ssm({
        cache: true,
        cacheExpiryInMillis: 3 * 60 * 1000,
        setToContext: true,
        names: {
            tableName: process.env.getTogethersTablePath
        }
    })
);