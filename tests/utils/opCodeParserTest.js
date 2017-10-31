"use strict";

var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;
var opCodeParser = require('./../../utils/opCodeParser');

describe('opCodeParser', function () {
  before(function () {
    console.log('starting');
  });

  after(function () {
    console.log('finished');
  });


  it('parse() handles long input correctly', function () {
    // those are some opcodes from the contract at 0xa327075af2a223a1c83a36ada1126afe7430f955

    var opCodes = '0x6060604052361561001f5760e060020a600035046372ea4b8c811461010c575b61011b3460008080678ac7230489e8000084106101d557600180548101908190556003805433929081101561000257906000526020600020900160006101000a815481600160a060020a0302191690830217905550678ac7230489e80000840393508350678ac7230489e800006000600082828250540192505081905550600260016000505411151561011d576003';
    var parsedOpCodes = "0x0000:\tPUSH1\t0x60\n0x0002:\tPUSH1\t0x40\n0x0004:\tMSTORE\n0x0005:\tCALLDATASIZE\n0x0006:\tISZERO\n0x0007:\tPUSH2\t0x001f\n0x000a:\tJUMPI\n0x000b:\tPUSH1\t0xe0\n0x000d:\tPUSH1\t0x02\n0x000f:\tEXP\n0x0010:\tPUSH1\t0x00\n0x0012:\tCALLDATALOAD\n0x0013:\tDIV\n0x0014:\tPUSH4\t0x72ea4b8c\n0x0019:\tDUP2\n0x001a:\tEQ\n0x001b:\tPUSH2\t0x010c\n0x001e:\tJUMPI\n0x001f:\tJUMPDEST\n0x0020:\tPUSH2\t0x011b\n0x0023:\tCALLVALUE\n0x0024:\tPUSH1\t0x00\n0x0026:\tDUP1\n0x0027:\tDUP1\n0x0028:\tPUSH8\t0x8ac7230489e80000\n0x0031:\tDUP5\n0x0032:\tLT\n0x0033:\tPUSH2\t0x01d5\n0x0036:\tJUMPI\n0x0037:\tPUSH1\t0x01\n0x0039:\tDUP1\n0x003a:\tSLOAD\n0x003b:\tDUP2\n0x003c:\tADD\n0x003d:\tSWAP1\n0x003e:\tDUP2\n0x003f:\tSWAP1\n0x0040:\tSSTORE\n0x0041:\tPUSH1\t0x03\n0x0043:\tDUP1\n0x0044:\tSLOAD\n0x0045:\tCALLER\n0x0046:\tSWAP3\n0x0047:\tSWAP1\n0x0048:\tDUP2\n0x0049:\tLT\n0x004a:\tISZERO\n0x004b:\tPUSH2\t0x0002\n0x004e:\tJUMPI\n0x004f:\tSWAP1\n0x0050:\tPUSH1\t0x00\n0x0052:\tMSTORE\n0x0053:\tPUSH1\t0x20\n0x0055:\tPUSH1\t0x00\n0x0057:\tSHA3\n0x0058:\tSWAP1\n0x0059:\tADD\n0x005a:\tPUSH1\t0x00\n0x005c:\tPUSH2\t0x0100\n0x005f:\tEXP\n0x0060:\tDUP2\n0x0061:\tSLOAD\n0x0062:\tDUP2\n0x0063:\tPUSH1\t0x01\n0x0065:\tPUSH1\t0xa0\n0x0067:\tPUSH1\t0x02\n0x0069:\tEXP\n0x006a:\tMUL\n0x006b:\tSUB\n0x006c:\tNOT\n0x006d:\tAND\n0x006e:\tSWAP1\n0x006f:\tDUP4\n0x0070:\tSUB\n0x0071:\tOR\n0x0072:\tSWAP1\n0x0073:\tSSTORE\n0x0074:\tPOP\n0x0075:\tPUSH8\t0x8ac7230489e80000\n0x007e:\tDUP5\n0x007f:\tMUL\n0x0080:\tSWAP4\n0x0081:\tPOP\n0x0082:\tDUP4\n0x0083:\tPOP\n0x0084:\tPUSH8\t0x8ac7230489e80000\n0x008d:\tPUSH1\t0x00\n0x008f:\tPUSH1\t0x00\n0x0091:\tDUP3\n0x0092:\tDUP3\n0x0093:\tDUP3\n0x0094:\tPOP\n0x0095:\tSLOAD\n0x0096:\tADD\n0x0097:\tSWAP3\n0x0098:\tPOP\n0x0099:\tPOP\n0x009a:\tDUP2\n0x009b:\tSWAP1\n0x009c:\tSSTORE\n0x009d:\tPOP\n0x009e:\tPUSH1\t0x02\n0x00a0:\tPUSH1\t0x01\n0x00a2:\tPUSH1\t0x00\n0x00a4:\tPOP\n0x00a5:\tSLOAD\n0x00a6:\tGT\n0x00a7:\tISZERO\n0x00a8:\tISZERO\n0x00a9:\tPUSH2\t0x011d\n0x00ac:\tJUMPI\n0x00ad:\tPUSH1\t0x03\n";

    var parsed = opCodeParser.parse(opCodes);

    expect(parsed).to.eql(parsedOpCodes);
  });

  it('parses the demo file', function () {
    var opCodes = '7f4e616d65526567000000000000000000000000000000000000000000000000003055307f4e616d6552656700000000000000000000000000000000000000000000000000557f436f6e666967000000000000000000000000000000000000000000000000000073661005d2720d855f1d9976f88bb10c1a3398c77f5573661005d2720d855f1d9976f88bb10c1a3398c77f7f436f6e6669670000000000000000000000000000000000000000000000000000553360455560df806100c56000396000f3007f726567697374657200000000000000000000000000000000000000000000000060003514156053576020355415603257005b335415603e5760003354555b6020353360006000a233602035556020353355005b60007f756e72656769737465720000000000000000000000000000000000000000000060003514156082575033545b1560995733335460006000a2600033545560003355005b60007f6b696c6c00000000000000000000000000000000000000000000000000000000600035141560cb575060455433145b1560d25733ff5b6000355460005260206000f3';
    opCodes = '7f726567697374657200000000000000000000000000000000000000000000000060003514156053576020355415603257005b335415603e5760003354555b6020353360006000a233602035556020353355005b60007f756e72656769737465720000000000000000000000000000000000000000000060003514156082575033545b1560995733335460006000a2600033545560003355005b60007f6b696c6c00000000000000000000000000000000000000000000000000000000600035141560cb575060455433145b1560d25733ff5b6000355460005260206000f3';

    console.log(opCodeParser.parse(opCodes));
  })
});