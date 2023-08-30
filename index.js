const decimal = require('decimal.js');

const ZERO = new decimal(0);
const ONE = new decimal(1);
const TEN = new decimal(10);

const SATOSHIS_TO_BTC_PRECISION = new decimal(8);
const WEIS_TO_GWEI_PRECISION = new decimal(9);
const GWEIS_TO_ETH_PRECISION = new decimal(9);
const WEIS_TO_ETH_PRECISION = new decimal(18);

const WEIS_IN_ETH = TEN.toPower(WEIS_TO_ETH_PRECISION);
const WEIS_IN_GWEI = TEN.toPower(WEIS_TO_GWEI_PRECISION);
const GWEIS_IN_ETH = TEN.toPower(GWEIS_TO_ETH_PRECISION);
const SATOSHIS_IN_BTC = TEN.toPower(SATOSHIS_TO_BTC_PRECISION);

const WEIS_IN_SATOSHI = WEIS_IN_ETH.dividedBy(SATOSHIS_IN_BTC);
const MINIMUM_GWEI = ONE.dividedBy(WEIS_IN_GWEI);
const MINIMUM_ETH = ONE.dividedBy(WEIS_IN_ETH);
const MINIMUM_BTC = ONE.dividedBy(SATOSHIS_IN_BTC);

/**
 * Checks if the provided value is zero, returns true if it is, false otherwise.
 * @param {decimal.Decimal.Value} value 
 * @returns {boolean}
 */
const isZero = (value) => {
    return value.comparedTo(ZERO) === 0;
};

/**
 * Checks if the provided value is decimal, returns true if it is, false otherwise.
 * @param {decimal.Decimal.Value} value 
 * @returns 
 */
const isDecimal = (value) => {
    return value.comparedTo(value.floor()) !== 0;
};

/**
 * Checks if the provided value is negative, returns true if it is, false otherwise.
 * @param {decimal.Decimal.Value} value 
 * @returns {boolean}
 */
const isNegative = (value) => {
    return value.comparedTo(ZERO) === -1;
};

/**
 * This function helps to check if a base unit value is valid, 
 * like satoshis or weis that are the base/smallest units of BTC and ETH respectively and cannot be negative or have decimals.
 * 
 * Throws an error if the amount in the smallest unit (satoshis or weis) is invalid.
 * @param {decimal.Decimal.Value} baseUnitAmount 
 * @returns {void}
 * @throws {Error} If the amount in the base unit is invalid (negative or decimal)
 */
const checkValidBaseAmount = (baseUnitAmount) => {
    // Return early if the value is 0
    if(baseUnitAmount.comparedTo(ZERO) === 0) {
        return;
    }
    if(isDecimal(baseUnitAmount) || isNegative(baseUnitAmount)) {
        throw new Error('Amount in the smallest unit must be greater or equal than 0 and cannot have decimals.');
    }
};

/**
 * Checks if the value is negative. Throws error if it is.
 * @param {decimal.Decimal.Value} value 
 * @returns {void}
 * @throws {Error} If the value is negative
 * 
 */
const checkIsNegative = (value) => {
    if(isNegative(value)) {
        throw new Error('The value cannot be negative.');
    }
};

/**
 * Checks if the value is smaller than the minimum. Throws error if it is.
 * @param {decimal.Decimal.Value} value 
 * @param {decimal.Decimal.Value} minimum 
 * @param {string} unit 
 * @returns {void}
 * @throws {Error} If the value is less than the minimum
 */
const checkMinimum = (value, minimum, unit = '') => {
    if(isZero(value)) {
        return;
    }
    checkIsNegative(value);
    if(value.comparedTo(minimum) === -1) {
        throw new Error(`The value ${value.toFixed()} ${unit} is less than the minimum valid value for this unit: ${minimum.toFixed()}.`);
    }
};

/* ETH units conversion */

/**
 * 
 * @param {number | string} amountInWeis 
 * @returns {string}
 * @throws {Error} If the amount in weis is invalid, negative or decimal
 */
const weisToGwei = (amountInWeis) => {
    const safeAmountInWeis = new decimal(amountInWeis);
    checkValidBaseAmount(safeAmountInWeis);
    return safeAmountInWeis.dividedBy(WEIS_IN_GWEI).toFixed();
};

/**
 * 
 * @param {number | string} amountInWeis 
 * @returns {string}
 * @throws {Error} If the amount in weis is invalid, negative or decimal
 */
const weisToEth = (amountInWeis) => {
    const saveAmountInWeis = new decimal(amountInWeis);
    checkValidBaseAmount(saveAmountInWeis);
    return saveAmountInWeis.dividedBy(WEIS_IN_ETH).toFixed();
};

/**
 * 
 * @param {number | string} amountInGweis 
 * @returns {string}
 * @throws {Error} If the amount in gweis is invalid, negative or decimal
 */
const gweisToWeis = (amountInGweis) => {
    const safeAmountInGweis = new decimal(amountInGweis);
    checkMinimum(safeAmountInGweis, MINIMUM_GWEI, 'gwei');
    return safeAmountInGweis.times(WEIS_IN_GWEI).toFixed(0);
};

/**
 * 
 * @param {number | string} amountInGweis 
 * @returns {string}
 */
const gweisToEth = (amountInGweis) => {
    const safeAmountInGweis = new decimal(amountInGweis);
    checkMinimum(safeAmountInGweis, MINIMUM_GWEI, 'gwei');
    return safeAmountInGweis.dividedBy(GWEIS_IN_ETH).toFixed();
}

/**
 * 
 * @param {number | string} amountInEth 
 * @returns {string}
 */
const ethToWeis = (amountInEth) => {
    const safeAmountInEth = new decimal(amountInEth);
    checkMinimum(safeAmountInEth, MINIMUM_ETH, 'eth');
    return safeAmountInEth.times(WEIS_IN_ETH).toFixed(0);
};

/**
 * 
 * @param {number | string} amountInEth 
 * @returns {string}
 */
const ethToGweis = (amountInEth) => {
    const safeAmountInEth = new decimal(amountInEth);
    checkMinimum(safeAmountInEth, MINIMUM_ETH, 'eth');
    return safeAmountInEth.times(GWEIS_IN_ETH).toFixed();
};

/* BTC units conversion */

/**
 * 
 * @param {number | string} amountInSatoshis 
 * @returns {string}
 * @throws {Error} If the amount in satoshis is invalid (negative or decimal)
 */
const satoshisToBtc = (amountInSatoshis) => {
    const safeAmountInSatoshis = new decimal(amountInSatoshis);
    checkValidBaseAmount(safeAmountInSatoshis);
    return safeAmountInSatoshis.dividedBy(SATOSHIS_IN_BTC).toFixed();
};

/**
 * 
 * @param {number | string} amountInBtc 
 * @returns {string}
 */
const btcToSatoshis = (amountInBtc) => {
    const safeAmountInBtc = new decimal(amountInBtc);
    checkMinimum(safeAmountInBtc, MINIMUM_BTC, 'btc');
    return safeAmountInBtc.times(SATOSHIS_IN_BTC).toFixed(0);
};

/* ETH to BTC units conversion */

/**
 * 
 * @param {number | string} amountInWeis 
 * @returns {string}
 * @throws {Error} If the amount in satoshis is invalid (negative or decimal)
 */
const weisToSatoshis = (amountInWeis) => {
    const safeAmountInWeis = new decimal(amountInWeis);
    checkValidBaseAmount(safeAmountInWeis);
    checkMinimum(safeAmountInWeis, WEIS_IN_SATOSHI, 'weis');
    return safeAmountInWeis.dividedBy(WEIS_IN_SATOSHI).toFixed(0);
};

/**
 * 
 * @param {number | string} amountInWeis 
 * @returns {string}
 * @throws {Error} If the amount in weis is invalid, negative or decimal
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
    const safeAmountInSatoshis = new decimal(amountInSatoshis);
    checkValidBaseAmount(safeAmountInSatoshis);
    return safeAmountInSatoshis.times(WEIS_IN_SATOSHI).toFixed(0);
};

/**
 * 
 * @param {number | string} amountInSatoshis 
 * @returns {string}
 * @throws {Error} If the amount in satoshis is invalid (negative or decimal)
 */
const satoshisToEth = (amountInSatoshis) => {
    const safeAmountInSatoshis = new decimal(amountInSatoshis);
    checkValidBaseAmount(safeAmountInSatoshis);
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
