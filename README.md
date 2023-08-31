<img src="./rootstock_logo.png" alt="Rootstock" />

# btc-eth-unit-converter

Tool to provide safe conversion between units in BTC and ETH

## Installation

> npm install @rsksmart/btc-eth-unit-converter

## Usage

The following conversion functions are available

- weisToGwei
- weisToEth
- gweisToWeis
- gweisToEth
- ethToWeis
- ethToGweis
- satoshisToBtc
- btcToSatoshis
- weisToSatoshis 
- weisToBtc
- ethToSatoshis
- satoshisToWeis
- satoshisToEth
- btcToWeis

For any invalid value (below minimum, negative or base unit decimals) an error will be thrown. Below minimum refers to values that represent an amount lower than the smallest base unit, for example `weisToSatoshis(1)` will throw an error because the result is less than 1 satoshi which is the smallest base unit.

## Sample

A sample file showing how to use the library is included under `sample/` directory. To run the sample file:

> node run sample/sample.js

## Test

To run test with coverage, run:

> npm run test

## Contributing

Any comments or suggestions feel free to contribute or reach out at our [discord server](https://discord.gg/rootstock-842021106956238848).
