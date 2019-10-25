const http = require("superagent");

 const viaHandler = async(functionPath, event) => {    
    const handler = require(`../../src/functions/${functionPath}`);
    const response = await handler.handler(event);

    response.body = JSON.parse(response.body);

    return response;
}

const viaHttp = async (functionPath) => {
    const apiRoot = "https://q7xr2gk8y3.execute-api.eu-west-1.amazonaws.com/dev/api";
    const method = "GET";
    const url = `${apiRoot}/${functionPath}`;
    const httpReq = http.get(url);
    const res = await httpReq;

    return {
        statusCode: res.status,
        body: res.body
    };
}

module.exports.we_invoke_get_gettogethers = () => {
    const mode = process.env.TEST_MODE;

    return mode === "http"
        ? viaHttp(`get-together`)
        : viaHandler("getGetToxºgethers", {});
}