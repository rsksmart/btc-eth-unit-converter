const btcEthUnitConverter = require("../index");

console.log("Convert 1 bitcoin to sathoshis:", btcEthUnitConverter.btcToSatoshis(1));
console.log("Convert 0.00000001 bitcoin to sathoshis:", btcEthUnitConverter.btcToSatoshis(0.00000001));
console.log("Convert 1 eth to satoshis:", btcEthUnitConverter.ethToSatoshis(1));
console.log("Convert 10000000000 weis to satoshis:", btcEthUnitConverter.weisToSatoshis(10000000000));
console.log();

console.log("Convert 1 satoshi to bitcoin:", btcEthUnitConverter.satoshisToBtc(1));
console.log("Convert 100000000000 sathoshis to bitcoin:", btcEthUnitConverter.btcToSatoshis(100000000000));
console.log("Convert 10000000000 weis to bitcoin:", btcEthUnitConverter.weisToBtc(10000000000));
console.log();

console.log("Convert 1 bitcoin to weis:", btcEthUnitConverter.btcToWeis(1));
console.log("Convert 1 satoshi to weis:", btcEthUnitConverter.satoshisToWeis(1));
