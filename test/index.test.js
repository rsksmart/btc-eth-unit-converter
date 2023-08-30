const converter = require('../index');
const chai = require('chai');
const expect = chai.expect;

const errorMessageForNegativeValue = 'The value cannot be negative.';
const errorMessageForNegativeOrDecimalBaseUnitValue = 'Amount in the smallest unit must be greater or equal than 0 and cannot have decimals.';

describe('Convert between units', () => {

    it('Should convert from weis to gweis', async () => {
        let result = converter.weisToGwei(0);
        expect(result).to.equal('0');

        result = converter.weisToGwei(1);
        expect(result).to.equal('0.000000001');
        
        result = converter.weisToGwei(100000000);
        expect(result).to.equal('0.1');

        result = converter.weisToGwei(1000000000);
        expect(result).to.equal('1');

        result = converter.weisToGwei('1000000000000000000000');
        expect(result).to.equal('1000000000000');
    });

    it('Should throw an error while trying to convert from weis to gweis with invalid values', async () => {
        expect(() => converter.weisToGwei(-1)).to.throw(errorMessageForNegativeOrDecimalBaseUnitValue);
        expect(() => converter.weisToGwei(0.9)).to.throw(errorMessageForNegativeOrDecimalBaseUnitValue);
        expect(() => converter.weisToGwei(-0.9)).to.throw(errorMessageForNegativeOrDecimalBaseUnitValue);
    });

    it('Should convert from weis to eth', async () => {
        let result = converter.weisToEth(0);
        expect(result).to.equal('0');
        
        result = converter.weisToEth(1);
        expect(result).to.equal('0.000000000000000001');

        result = converter.weisToEth(1000000000000000000);
        expect(result).to.equal('1');

        result = converter.weisToEth('100000000000000000000');
        expect(result).to.equal('100');
    });

    it('Should throw an error while trying to convert from weis to eth with invalid values', async () => {
        expect(() => converter.weisToEth(-1)).to.throw(errorMessageForNegativeOrDecimalBaseUnitValue);
        expect(() => converter.weisToEth(0.9)).to.throw(errorMessageForNegativeOrDecimalBaseUnitValue);
        expect(() => converter.weisToEth(-0.9)).to.throw(errorMessageForNegativeOrDecimalBaseUnitValue);
    });

    it('Should convert from gweis to weis', async () => {
        let result = converter.gweisToWeis(0);
        expect(result).to.equal('0');
        
        result = converter.gweisToWeis(1);
        expect(result).to.equal('1000000000');

        result = converter.gweisToWeis('0.000000001');
        expect(result).to.equal('1');

        result = converter.gweisToWeis('0.0000001');
        expect(result).to.equal('100');
    });

    it('Should fail trying to convert from gweis to weis with invalid gweis values', async () => {
        expect(() => converter.gweisToWeis('0.0000000001')).to.throw('The value 0.0000000001 gwei is less than the minimum valid value for this unit: 0.000000001');
        expect(() => converter.gweisToWeis('-0.0000000001')).to.throw(errorMessageForNegativeValue);
        expect(() => converter.gweisToWeis('-1')).to.throw(errorMessageForNegativeValue);
    });

    it('Should convert from gweis to eth', async () => {
        let result = converter.gweisToEth(0);
        expect(result).to.equal('0');
        
        result = converter.gweisToEth(1);
        expect(result).to.equal('0.000000001');

        result = converter.gweisToEth(1000000000);
        expect(result).to.equal('1');

        result = converter.gweisToEth(100000000000);
        expect(result).to.equal('100');
    });

    it('Should fail trying to convert from gweis to eth with invalid gweis values', async () => {
        expect(() => converter.gweisToEth('0.0000000001')).to.throw('The value 0.0000000001 gwei is less than the minimum valid value for this unit: 0.000000001');
        expect(() => converter.gweisToEth('-0.0000000001')).to.throw(errorMessageForNegativeValue);
        expect(() => converter.gweisToEth('-1')).to.throw(errorMessageForNegativeValue);
    });

    it('Should convert from eth to weis', async () => {
        let result = converter.ethToWeis(0);
        expect(result).to.equal('0');
        
        result = converter.ethToWeis(1);
        expect(result).to.equal('1000000000000000000');

        result = converter.ethToWeis(1000000000);
        expect(result).to.equal('1000000000000000000000000000');

        result = converter.ethToWeis('0.000000000000000001');
        expect(result).to.equal('1');

        result = converter.ethToWeis('0.0000000000000001');
        expect(result).to.equal('100');
    });

    it('Should fail trying to convert from eth to weis with invalid eth values', async () => {
        expect(() => converter.ethToWeis('0.0000000000000000001')).to.throw('The value 0.0000000000000000001 eth is less than the minimum valid value for this unit: 0.000000000000000001.');
        expect(() => converter.ethToWeis('-0.0000000000000000001')).to.throw(errorMessageForNegativeValue);
        expect(() => converter.ethToWeis('-1')).to.throw(errorMessageForNegativeValue);
    });

    it('Should convert from eth to gweis', async () => {
        let result = converter.ethToGweis(0);
        expect(result).to.equal('0');
        
        result = converter.ethToGweis(1);
        expect(result).to.equal('1000000000');

        result = converter.ethToGweis(1000000000);
        expect(result).to.equal('1000000000000000000');

        result = converter.ethToGweis('0.000000001');
        expect(result).to.equal('1');

        result = converter.ethToGweis('0.0000001');
        expect(result).to.equal('100');
    });

    it('Should fail trying to convert from eth to gweis with invalid eth values', async () => {
        expect(() => converter.ethToGweis('0.0000000000000000001')).to.throw('The value 0.0000000000000000001 eth is less than the minimum valid value for this unit: 0.000000000000000001');
        expect(() => converter.ethToGweis('-0.0000000000000000001')).to.throw(errorMessageForNegativeValue);
        expect(() => converter.ethToGweis('-1')).to.throw(errorMessageForNegativeValue);
    });

    it('Should convert from satoshis to btc', async () => {
        let result = converter.satoshisToBtc(0);
        expect(result).to.equal('0');
        
        result = converter.satoshisToBtc(1);
        expect(result).to.equal('0.00000001');

        result = converter.satoshisToBtc(100000000);
        expect(result).to.equal('1');

        result = converter.satoshisToBtc(2100000000000000);
        expect(result).to.equal('21000000');
    });

    it('Should throw an error trying to convert from satoshis to btc with invalid values', async () => {
        expect(() => converter.satoshisToBtc(-1)).to.throw(errorMessageForNegativeOrDecimalBaseUnitValue);
        expect(() => converter.satoshisToBtc(0.9)).to.throw(errorMessageForNegativeOrDecimalBaseUnitValue);
        expect(() => converter.satoshisToBtc(-0.9)).to.throw(errorMessageForNegativeOrDecimalBaseUnitValue);
    });

    it('Should convert from btc to satoshis', async () => {
        let result = converter.btcToSatoshis(0);
        expect(result).to.equal('0');
        
        result = converter.btcToSatoshis(1);
        expect(result).to.equal('100000000');

        result = converter.btcToSatoshis('0.00000001');
        expect(result).to.equal('1');

        result = converter.btcToSatoshis(21000000);
        expect(result).to.equal('2100000000000000');
    });

    it('Should fail trying to convert from btc to satoshis with invalid btc values', async () => {
        expect(() => converter.btcToSatoshis('0.000000001')).to.throw('The value 0.000000001 btc is less than the minimum valid value for this unit: 0.00000001');
        expect(() => converter.btcToSatoshis('-0.000000001')).to.throw(errorMessageForNegativeValue);
        expect(() => converter.btcToSatoshis('-1')).to.throw(errorMessageForNegativeValue);
    });

    it('Should convert from weis to satoshis', async () => {
        let result = converter.weisToSatoshis(0);
        expect(result).to.equal('0');

        result = converter.weisToSatoshis(10000000000);
        expect(result).to.equal('1');

        result = converter.weisToSatoshis('1000000000000000000');
        expect(result).to.equal('100000000');

        result = converter.weisToSatoshis(10000000001);

        expect(result).to. equal('1');
    });

    it('Should throw an error trying to convert from weis to satoshis with invalid values', async () => {
        expect(() => converter.weisToSatoshis(1)).to.throw('The value 1 weis is less than the minimum valid value for this unit: 10000000000');
        expect(() => converter.weisToSatoshis(1000000000)).to.throw('The value 1000000000 weis is less than the minimum valid value for this unit: 10000000000');

        expect(() => converter.weisToSatoshis(-1)).to.throw(errorMessageForNegativeOrDecimalBaseUnitValue);
        expect(() => converter.weisToSatoshis(0.9)).to.throw(errorMessageForNegativeOrDecimalBaseUnitValue);
        expect(() => converter.weisToSatoshis(-0.9)).to.throw(errorMessageForNegativeOrDecimalBaseUnitValue);
    });

    it('Should convert from weis to btc', async () => {
        let result = converter.weisToBtc(0);
        expect(result).to.equal('0');

        result = converter.weisToBtc('100000000000000000');
        expect(result).to.equal('0.1');

        result = converter.weisToBtc('1000000000000000000');
        expect(result).to.equal('1');

        result = converter.weisToBtc('100000000000000000000');
        expect(result).to.equal('100');

        result = converter.weisToBtc('21000000000000000000000000');
        expect(result).to.equal('21000000');
    });

    it('Should throw an error trying to convert from weis to btc with invalid values', async () => {
        expect(() => converter.weisToBtc(-1)).to.throw(errorMessageForNegativeOrDecimalBaseUnitValue);
        expect(() => converter.weisToBtc(0.9)).to.throw(errorMessageForNegativeOrDecimalBaseUnitValue);
        expect(() => converter.weisToBtc(-0.9)).to.throw(errorMessageForNegativeOrDecimalBaseUnitValue);
    });

    it('Should convert from eth to satoshis', async () => {
        let result = converter.ethToSatoshis(0);
        expect(result).to.equal('0');
        
        result = converter.ethToSatoshis(1);
        expect(result).to.equal('100000000');

        result = converter.ethToSatoshis(1000000000);
        expect(result).to.equal('100000000000000000');

        result = converter.ethToSatoshis('0.00000001');
        expect(result).to.equal('1');

        result = converter.ethToSatoshis('0.000001');
        expect(result).to.equal('100');
    });

    it('Should throw an error trying to convert from eth to satoshis with invalid values', async () => {
        expect(() => converter.ethToSatoshis(-1)).to.throw(errorMessageForNegativeValue);
        expect(() => converter.ethToSatoshis(-0.9)).to.throw(errorMessageForNegativeValue);
        expect(() => converter.ethToSatoshis('0.000000000000000001')).to.throw('The value 1 weis is less than the minimum valid value for this unit: 10000000000');
    });

    it('Should convert from satoshis to weis', async () => {
        let result = converter.satoshisToWeis(0);
        expect(result).to.equal('0');
        
        result = converter.satoshisToWeis(1);
        expect(result).to.equal('10000000000');

        result = converter.satoshisToWeis(100000000);
        expect(result).to.equal('1000000000000000000');
        
        result = converter.satoshisToWeis(2100000000000000);
        expect(result).to.equal('21000000000000000000000000');
    });

    it('Should fail trying to convert from satoshis to weis with invalid values', async () => {
        expect(() => converter.satoshisToWeis(-1)).to.throw(errorMessageForNegativeOrDecimalBaseUnitValue);
        expect(() => converter.satoshisToWeis(0.9)).to.throw(errorMessageForNegativeOrDecimalBaseUnitValue);
        expect(() => converter.satoshisToWeis(-0.9)).to.throw(errorMessageForNegativeOrDecimalBaseUnitValue);
    });

    it('Should convert from satoshis to eth', async () => {
        let result = converter.satoshisToEth(0);
        expect(result).to.equal('0');
        
        result = converter.satoshisToEth(1);
        expect(result).to.equal('0.00000001');

        result = converter.satoshisToEth(100000000);
        expect(result).to.equal('1');

        result = converter.satoshisToEth(2100000000000000);
        expect(result).to.equal('21000000');
    });

    it('Should throw an error trying to convert from satoshis to eth with invalid values', async () => {
        expect(() => converter.satoshisToEth(-1)).to.throw(errorMessageForNegativeOrDecimalBaseUnitValue);
        expect(() => converter.satoshisToEth(0.9)).to.throw(errorMessageForNegativeOrDecimalBaseUnitValue);
        expect(() => converter.satoshisToEth(-0.9)).to.throw(errorMessageForNegativeOrDecimalBaseUnitValue);
    });

    it('Should convert from btc to weis', async () => {
        let result = converter.btcToWeis(0);
        expect(result).to.equal('0');
        
        result = converter.btcToWeis(0.1);
        expect(result).to.equal('100000000000000000');

        result = converter.btcToWeis(1);
        expect(result).to.equal('1000000000000000000');

        result = converter.btcToWeis(21000000);
        expect(result).to.equal('21000000000000000000000000');

        result = converter.btcToWeis('0.00000001');
        expect(result).to.equal('10000000000');

        result = converter.btcToWeis('0.000001');
        expect(result).to.equal('1000000000000');
    });
});
