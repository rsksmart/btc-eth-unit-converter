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
const MINIMUM_WEIS_TO_SATOSHIS = 10000000000;
const MINIMUM_GWEI = '0.000000001';
const MINIMUM_ETH_VALUE = '0.000000000000000001';
const MINIMUM_BTC = '0.00000001';

const isZero = (value) => {
    return bigDecimal.compareTo(value, 0) === 0;
};

/**
 * This function helps to check if a base unit value is valid, 
 * like satoshis or weis that are the smallest units of BTC and ETH respectively and cannot be negative or have decimals.
 * 
 * Throws an error if the amount in the smallest unit (satoshis or weis) is invalid.
 * @param {number | string} smallestUnitAmount 
 */
const checkValidBaseAmount = (smallestUnitAmount) => {
    const value = new bigDecimal(smallestUnitAmount)
    const zero = new bigDecimal(0);
    // Return early if the value is 0
    if(value.compareTo(zero) === 0) {
        return;
    }
    const isDecimal = value.compareTo(value.floor()) !== 0;
    const isNegative = value.compareTo(zero) === -1;
    if(isDecimal || isNegative) {
        throw new Error('Amount in the smallest unit must be greater or equal than 0 and cannot have decimals.');
    }
};

const isNegative = (value) => {
    return bigDecimal.compareTo(value, 0) === -1;
};

const checkIsNegative = (value) => {
    if(isNegative(value)) {
        throw new Error('The value cannot be negative.');
    }
};

const checkMinimumGweiValue = (amountInGweis) => {
    if(isZero(amountInGweis)) {
        return;
    }
    checkIsNegative(amountInGweis);
    if(bigDecimal.compareTo(amountInGweis, MINIMUM_GWEI) === -1) {
        throw new Error(`The amount in gweis is less than the minimum valid gwei value: ${MINIMUM_GWEI}.`);
    }
};

const checkMinimumEthValue = (amountInEth) => {
    if(isZero(amountInEth)) {
        return;
    }
    checkIsNegative(amountInEth);
    if(bigDecimal.compareTo(amountInEth, MINIMUM_ETH_VALUE) === -1) {
        throw new Error(`The amount in eth is less than the minimum valid eth value: ${MINIMUM_ETH_VALUE}.`);
    }
};

const checkMinimumBtcValue = (amountInBtc) => {
    if(isZero(amountInBtc)) {
        return;
    }
    checkIsNegative(amountInBtc);
    if(bigDecimal.compareTo(amountInBtc, MINIMUM_BTC) === -1) {
        throw new Error(`The amount in btc is less than the minimum valid btc value: ${MINIMUM_BTC}.`);
    }
};

const checkMinimumWeisToSatoshisValue = (amountInWeis) => {
    if(isZero(amountInWeis)) {
        return;
    }
    checkIsNegative(amountInWeis);
    if(bigDecimal.compareTo(amountInWeis, MINIMUM_WEIS_TO_SATOSHIS) === -1) {
        throw new Error(`The amount in weis is less than the minimum valid weis to satoshis value: ${MINIMUM_WEIS_TO_SATOSHIS}.`);
    }
};

/* ETH units conversion */

/**
 * 
 * @param {number | string} amountInWeis 
 * @returns {string}
 * @throws {Error} If the amount in weis is invalid (negative or decimal)
 */
const weisToGwei = (amountInWeis) => {
    checkValidBaseAmount(amountInWeis);
    return bigDecimal.divide(amountInWeis, WEIS_IN_GWEI, WEIS_TO_GWEI_PRECISION);
};

/**
 * 
 * @param {number | string} amountInWeis 
 * @returns {string}
 * @throws {Error} If the amount in weis is invalid (negative or decimal)
 */
const weisToEth = (amountInWeis) => {
    checkValidBaseAmount(amountInWeis);
    return bigDecimal.divide(amountInWeis, WEIS_IN_ETH, WEIS_TO_ETH_PRECISION);
};

const gweisToWeis = (amountInGweis) => {
    checkMinimumGweiValue(amountInGweis);
    return bigDecimal.multiply(amountInGweis, WEIS_IN_GWEI);
};

/**
 * 
 * @param {number | string} amountInGweis 
 * @returns {string}
 */
const gweisToEth = (amountInGweis) => {
    checkMinimumGweiValue(amountInGweis);
    return bigDecimal.divide(amountInGweis, GWEIS_IN_ETH, GWEIS_TO_ETH_PRECISION);
}

/**
 * 
 * @param {number | string} amountInEth 
 * @returns {string}
 */
const ethToWeis = (amountInEth) => {
    checkMinimumEthValue(amountInEth);
    return bigDecimal.multiply(amountInEth, WEIS_IN_ETH);
};

/**
 * 
 * @param {number | string} amountInEth 
 * @returns {string}
 */
const ethToGweis = (amountInEth) => {
    checkMinimumEthValue(amountInEth);
    return bigDecimal.multiply(amountInEth, GWEIS_IN_ETH);
};

/* BTC units conversion */

/**
 * 
 * @param {number | string} amountInSatoshis 
 * @returns {string}
 * @throws {Error} If the amount in satoshis is invalid (negative or decimal)
 */
const satoshisToBtc = (amountInSatoshis) => {
    checkValidBaseAmount(amountInSatoshis);
    return bigDecimal.divide(amountInSatoshis, SATOSHIS_IN_BTC);
};

/**
 * 
 * @param {number | string} amountInBtc 
 * @returns {string}
 */
const btcToSatoshis = (amountInBtc) => {
    checkMinimumBtcValue(amountInBtc);
    return bigDecimal.multiply(amountInBtc, SATOSHIS_IN_BTC);
};

/* ETH to BTC units conversion */

/**
 * 
 * @param {number | string} amountInWeis 
 * @returns {string}
 * @throws {Error} If the amount in satoshis is invalid (negative or decimal)
 */
const weisToSatoshis = (amountInWeis) => {
    checkValidBaseAmount(amountInWeis);
    checkMinimumWeisToSatoshisValue(amountInWeis);
    if(bigDecimal.compareTo(amountInWeis, 0) === 0) {
        return '0';
    }
    if (amountInWeis < MINIMUM_WEIS_TO_SATOSHIS) {
        throw new Error(`Amount in weis must be greater or equal than the minimum weis to satoshis conversion value: ${MINIMUM_WEIS_TO_SATOSHIS}, 
        other wise it would yield a satoshis value less than 1 with decimals which would not be a valid satoshi value.`);
    }
    return bigDecimal.divide(amountInWeis, WEIS_IN_SATOSHI);
};

/**
 * 
 * @param {number | string} amountInWeis 
 * @returns {string}
 * @throws {Error} If the amount in weis is invalid (negative or decimal)
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
 * @throws {Error} If the amount in satoshis is invalid (negative or decimal)
 */
const satoshisToWeis = (amountInSatoshis) => {
    checkValidBaseAmount(amountInSatoshis);
    return bigDecimal.multiply(amountInSatoshis, WEIS_IN_SATOSHI);
};

/**
 * 
 * @param {number | string} amountInSatoshis 
 * @returns {string}
 * @throws {Error} If the amount in satoshis is invalid (negative or decimal)
 */
const satoshisToEth = (amountInSatoshis) => {
    checkValidBaseAmount(amountInSatoshis);
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
