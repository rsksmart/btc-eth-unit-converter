const converter = require('../index');
const chai = require('chai');
const expect = chai.expect;

describe('Convert between units', () => {
    it('Should convert from weis to satoshis', async () => {
        let result = converter.weisToSatoshis(0);
        expect(result).to.equal(0);
        
        result = converter.weisToSatoshis(1);
        expect(result).to.equal(0);
        
        result = converter.weisToSatoshis(1000000000);
        expect(result).to.equal(0);

        result = converter.weisToSatoshis(10000000000);
        expect(result).to.equal(1);
    });

    it('Should convert from weis to gweis', async () => {
        let result = converter.weisToGwei(0);
        expect(result).to.equal(0);
        
        result = converter.weisToGwei(1);
        expect(result).to.equal(0.000000001);
        
        result = converter.weisToGwei(100000000);
        expect(result).to.equal(0.1);

        result = converter.weisToGwei(1000000000);
        expect(result).to.equal(1);

        result = converter.weisToGwei(1000000000000000000000);
        expect(result).to.equal(1000000000000);
    });

    it('Should convert from weis to eth', async () => {
        let result = converter.weisToEth(0);
        expect(result).to.equal(0);
        
        result = converter.weisToEth(1);
        expect(result).to.equal(0.000000000000000001);

        result = converter.weisToEth(1000000000000000000);
        expect(result).to.equal(1);

        result = converter.weisToEth(100000000000000000000);
        expect(result).to.equal(100);
    });

    it('Should convert from satoshis to weis', async () => {
        let result = converter.satoshisToWeis(0);
        expect(result).to.equal(0);
        
        result = converter.satoshisToWeis(1);
        expect(result).to.equal(10000000000);

        result = converter.satoshisToWeis(100000000);
        expect(result).to.equal(1000000000000000000);
    });

    it('Should convert from satoshis to eth', async () => {
        let result = converter.satoshisToEth(0);
        expect(result).to.equal(0);
        
        result = converter.satoshisToEth(1);
        expect(result).to.equal(0.00000001);

        result = converter.satoshisToEth(100000000);
        expect(result).to.equal(1);
    });

    it('Should convert from satoshis to btc', async () => {
        let result = converter.satoshisToBtc(0);
        expect(result).to.equal(0);
        
        result = converter.satoshisToBtc(1);
        expect(result).to.equal(0.00000001);

        result = converter.satoshisToBtc(100000000);
        expect(result).to.equal(1);
    });

    it('Should convert from weis to btc', async () => {
        let result = converter.weisToBtc(0);
        expect(result).to.equal(0);
        
        result = converter.weisToBtc(1);
        expect(result).to.equal(0);

        result = converter.weisToBtc(1000000000000000000);
        expect(result).to.equal(1);

        result = converter.weisToBtc(100000000000000000000);
        expect(result).to.equal(100);
    });
});
