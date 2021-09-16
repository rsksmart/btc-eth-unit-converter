const weisToSatoshis = (amountInWeis) => {
    return Math.floor(amountInWeis / 1e10);
}

const weisToGwei = (amountInWeis) => {
    return amountInWeis / 1e9;
}

const weisToEth = (amountInWeis) => {
    return amountInWeis / 1e18;
}

const satoshisToWeis = (amountInSatoshis) => {
    return amountInSatoshis * 1e10;
}

const satoshisToEth = (amountInSatoshis) => {
    const weis = satoshisToWeis(amountInSatoshis);
    return weisToEth(weis);
}

const satoshisToBtc = (amountInSatoshis) => {
    return amountInSatoshis / 1e8;
}

const weisToBtc = (amountInWeis) => {
    const satoshis = weisToSatoshis(amountInWeis);
    return satoshisToBtc(satoshis);
}

module.exports = {
    weisToSatoshis,
    weisToGwei,
    weisToEth,
    satoshisToWeis,
    satoshisToEth,
    satoshisToBtc,
    weisToBtc
}
