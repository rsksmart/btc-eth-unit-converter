/* ETH units conversion */
const weisToGwei = (amountInWeis) => {
    return amountInWeis / 1e9;
}

const weisToEth = (amountInWeis) => {
    return amountInWeis / 1e18;
}

/* BTC units conversion */
const satoshisToBtc = (amountInSatoshis) => {
    return amountInSatoshis / 1e8;
}

/* ETH to BTC units conversion */
const weisToSatoshis = (amountInWeis) => {
    return Math.floor(amountInWeis / 1e10);
}

const weisToBtc = (amountInWeis) => {
    const satoshis = weisToSatoshis(amountInWeis);
    return satoshisToBtc(satoshis);
}

/* BTC to ETH units conversion */
const satoshisToWeis = (amountInSatoshis) => {
    return amountInSatoshis * 1e10;
}

const satoshisToEth = (amountInSatoshis) => {
    const weis = satoshisToWeis(amountInSatoshis);
    return weisToEth(weis);
}

module.exports = {
    weisToGwei,
    weisToEth,
    satoshisToBtc,
    weisToSatoshis,
    weisToBtc,
    satoshisToWeis,
    satoshisToEth
}
