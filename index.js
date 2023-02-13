const WEIS_IN_ETH = 1e18;
const WEIS_IN_GWEI = 1e9;
const GWEIS_IN_ETH = 1e9;

const SATOSHIS_IN_BTC = 1e8;

const WEIS_IN_SATOSHI = WEIS_IN_ETH / SATOSHIS_IN_BTC;

/* ETH units conversion */
const weisToGwei = (amountInWeis) => {
    return amountInWeis / WEIS_IN_GWEI;
}

const weisToEth = (amountInWeis) => {
    return amountInWeis / WEIS_IN_ETH;
}

const gweisToWeis = (amountInGweis) => {
    return amountInGweis * WEIS_IN_GWEI;
}

const gweisToEth = (amountInGweis) => {
    return amountInGweis / GWEIS_IN_ETH;
}

const ethToWeis = (amountInEth) => {
    return amountInEth * WEIS_IN_ETH;
}

const ethToGweis = (amountInEth) => {
    return amountInEth * GWEIS_IN_ETH;
}

/* BTC units conversion */
const satoshisToBtc = (amountInSatoshis) => {
    return amountInSatoshis / SATOSHIS_IN_BTC;
}

const btcToSatoshis = (amountInBtc) => {
    return amountInBtc * SATOSHIS_IN_BTC;
}

/* ETH to BTC units conversion */
const weisToSatoshis = (amountInWeis) => {
    return Math.floor(amountInWeis / WEIS_IN_SATOSHI);
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
    return amountInSatoshis * WEIS_IN_SATOSHI;
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
