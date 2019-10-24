const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event, context) => {

    const req = {
        TableName: process.env.getTogethersTableName,
        Limit: 8
    };

    const resp = await dynamodb.scan(req).promise();
    const res = {
        statusCode: 200,
        body: JSON.stringify(resp.Items)
    };

    return res;
}