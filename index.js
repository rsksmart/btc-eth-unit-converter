const bigDecimal = require('js-big-decimal');

const WEIS_TO_GWEI_PRECISION = 9;
const WEIS_TO_ETH_PRECISION = 18;
const GWEIS_TO_ETH_PRECISION = 9;
const SATOSHIS_TO_BTC_PRECISION = 8;

const WEIS_IN_ETH = 10 ** WEIS_TO_ETH_PRECISION;
const WEIS_IN_GWEI = 10 ** WEIS_TO_GWEI_PRECISION;
const GWEIS_IN_ETH = 10 ** GWEIS_TO_ETH_PRECISION;
const SATOSHIS_IN_BTC = 10 ** SATOSHIS_TO_BTC_PRECISION;

const WEIS_IN_SATOSHI = bigDecimal.divide(WEIS_IN_ETH, SATOSHIS_IN_BTC);

/* ETH units conversion */

/**
 * 
 * @param {number | string} amountInWeis 
 * @returns {string}
 */
const weisToGwei = (amountInWeis) => {
   return bigDecimal.divide(amountInWeis, WEIS_IN_GWEI, WEIS_TO_GWEI_PRECISION);
};

/**
 * 
 * @param {number | string} amountInWeis 
 * @returns {string}
 */
const weisToEth = (amountInWeis) => {
    return bigDecimal.divide(amountInWeis, WEIS_IN_ETH, WEIS_TO_ETH_PRECISION);
};

const gweisToWeis = (amountInGweis) => {
    return bigDecimal.multiply(amountInGweis, WEIS_IN_GWEI);
};

/**
 * 
 * @param {number | string} amountInGweis 
 * @returns {string}
 */
const gweisToEth = (amountInGweis) => {
    return bigDecimal.divide(amountInGweis, GWEIS_IN_ETH, GWEIS_TO_ETH_PRECISION);
}

/**
 * 
 * @param {number | string} amountInEth 
 * @returns {string}
 */
const ethToWeis = (amountInEth) => {
    return bigDecimal.multiply(amountInEth, WEIS_IN_ETH);
};

/**
 * 
 * @param {number | string} amountInEth 
 * @returns {string}
 */
const ethToGweis = (amountInEth) => {
    return bigDecimal.multiply(amountInEth, GWEIS_IN_ETH);
};

/* BTC units conversion */

/**
 * 
 * @param {number | string} amountInSatoshis 
 * @returns {string}
 */
const satoshisToBtc = (amountInSatoshis) => {
    return bigDecimal.divide(amountInSatoshis, SATOSHIS_IN_BTC);
};

/**
 * 
 * @param {number | string} amountInBtc 
 * @returns {string}
 */
const btcToSatoshis = (amountInBtc) => {
    return bigDecimal.multiply(amountInBtc, SATOSHIS_IN_BTC);
};

/* ETH to BTC units conversion */

/**
 * 
 * @param {number | string} amountInWeis 
 * @returns {string}
 */
const weisToSatoshis = (amountInWeis) => {
    return bigDecimal.divide(amountInWeis, WEIS_IN_SATOSHI);
};

/**
 * 
 * @param {number | string} amountInWeis 
 * @returns {string}
 */
const weisToBtc = (amountInWeis) => {
    const satoshis = weisToSatoshis(amountInWeis);
    return satoshisToBtc(satoshis);
};

/**
 * 
 * @param {number | string} amountInEth 
 * @returns {string}
 */
const ethToSatoshis = (amountInEth) => {
    const weis = ethToWeis(amountInEth);
    return weisToSatoshis(weis);
};

/* BTC to ETH units conversion */

/**
 * 
 * @param {number | string} amountInSatoshis 
 * @returns {string}
 */
const satoshisToWeis = (amountInSatoshis) => {
    return bigDecimal.multiply(amountInSatoshis, WEIS_IN_SATOSHI);
};

/**
 * 
 * @param {number | string} amountInSatoshis 
 * @returns {string}
 */
const satoshisToEth = (amountInSatoshis) => {
    const weis = satoshisToWeis(amountInSatoshis);
    return weisToEth(weis);
};

/**
 * 
 * @param {number | string} amountInBtc 
 * @returns {string}
 */
const btcToWeis = (amountInBtc) => {
    const satoshis = btcToSatoshis(amountInBtc);
    return satoshisToWeis(satoshis);
};

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
};
