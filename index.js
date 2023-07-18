const bigDecimal = require('js-big-decimal');

const WEIS_IN_ETH = 1e18;
const WEIS_IN_GWEI = 1e9;
const GWEIS_IN_ETH = 1e9;
const SATOSHIS_IN_BTC = 1e8;

const WEIS_IN_SATOSHI = WEIS_IN_ETH / SATOSHIS_IN_BTC;

const WEIS_TO_GWEI_PRECISION = 9;
const WEIS_TO_ETH_PRECISION = 18;
const GWEIS_TO_ETH_PRECISION = 9;

/* ETH units conversion */
const weisToGwei = (amountInWeis) => {
   return bigDecimal.divide(amountInWeis, WEIS_IN_GWEI, WEIS_TO_GWEI_PRECISION);
}

const weisToEth = (amountInWeis) => {
    return bigDecimal.divide(amountInWeis, WEIS_IN_ETH, WEIS_TO_ETH_PRECISION);
}

const gweisToWeis = (amountInGweis) => {
    return bigDecimal.multiply(amountInGweis, WEIS_IN_GWEI);
}

const gweisToEth = (amountInGweis) => {
    return bigDecimal.divide(amountInGweis, GWEIS_IN_ETH, GWEIS_TO_ETH_PRECISION);
}

const ethToWeis = (amountInEth) => {
    return bigDecimal.multiply(amountInEth, WEIS_IN_ETH);
}

const ethToGweis = (amountInEth) => {
    return bigDecimal.multiply(amountInEth, GWEIS_IN_ETH);
}

/* BTC units conversion */
const satoshisToBtc = (amountInSatoshis) => {
    return bigDecimal.divide(amountInSatoshis, SATOSHIS_IN_BTC);
}

const btcToSatoshis = (amountInBtc) => {
    return bigDecimal.multiply(amountInBtc, SATOSHIS_IN_BTC);
}

/* ETH to BTC units conversion */
const weisToSatoshis = (amountInWeis) => {
    return bigDecimal.round(bigDecimal.divide(amountInWeis, WEIS_IN_SATOSHI));
}

const weisToBtc = (amountInWeis) => {
    const satoshis = weisToSatoshis(amountInWeis);
    return satoshisToBtc(satoshis);
}

const ethToSatoshis = (amountInEth) => {
    const weis = ethToWeis(amountInEth);
    return weisToSatoshis(weis);
}

/* BTC to ETH units conversion */
const satoshisToWeis = (amountInSatoshis) => {
    return bigDecimal.multiply(amountInSatoshis, WEIS_IN_SATOSHI);
}

const satoshisToEth = (amountInSatoshis) => {
    const weis = satoshisToWeis(amountInSatoshis);
    return weisToEth(weis);
}

const btcToWeis = (amountInBtc) => {
    const satoshis = btcToSatoshis(amountInBtc);
    return satoshisToWeis(satoshis);
}

module.exports = {
    weisToGwei,
    weisToEth,
    gweisToWeis,
    gweisToEth,
    ethToWeis,
    ethToGweis,
    satoshisToBtc,
    btcToSatoshis,
    weisToSatoshis,
    weisToBtc,
    ethToSatoshis,
    satoshisToWeis,
    satoshisToEth,
    btcToWeis
}
