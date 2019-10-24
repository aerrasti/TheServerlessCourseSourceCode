module.exports.handler = async (event, context) => {
    const body = JSON.parse(event.body);
    const city = body.city;

    const res = {
        statusCode: 200,
        body: JSON.stringify(`Hello world ${city}`)
    };

    return res;
}