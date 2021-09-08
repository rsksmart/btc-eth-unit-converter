let weisToSatoshis = (amountInWeis) => {
    return Math.floor(amountInWeis / 1e10);
}

let weisToGwei = (amountInWeis) => {
    return amountInWeis / 1e9;
}

let weisToEth = (amountInWeis) => {
    return amountInWeis / 1e18;
}

let satoshisToWeis = (amountInSatoshis) => {
    return amountInSatoshis * 1e10;
}

let satoshisToEth = (amountInSatoshis) => {
    let weis = satoshisToWeis(amountInSatoshis);
    return weisToEth(weis);
}

let satoshisToBtc = (amountInSatoshis) => {
    return amountInSatoshis / 1e8;
}

let weisToBtc = (amountInWeis) => {
    let satoshis = weisToSatoshis(amountInWeis);
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
