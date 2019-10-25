const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event, context) => {

    const req = {
        TableName: 'gettogethers',
        Limit: 8
    };

    const resp = await dynamodb.scan(req).promise();
    const res = {
        statusCode: 200,
        body: JSON.stringify(resp.items)
    };

    return res;
}