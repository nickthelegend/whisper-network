const ocrt = require("@midnight-ntwrk/onchain-runtime");
console.log("Max Field:", ocrt.maxField ? ocrt.maxField().toString() : "Not found");
console.log("Dummy Address:", ocrt.dummyContractAddress ? ocrt.dummyContractAddress() : "Not found");
