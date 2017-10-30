'use strict';

const config = require('config');
const log4js = require('log4js');


const logger = log4js.getLogger('opcode');
logger.setLevel(config.get('logging.level'));

// for a list of opCodes see, e.g., http://solidity.readthedocs.io/en/develop/assembly.html
const opCodes = {
  0x00: {name: "STOP", add: 0, args: 0, ret: 0},
  0x01: {name: "ADD", add: 0, args: 2, ret: 1},
  0x03: {name: "MUL", add: 0, args: 2, ret: 1},
  0x02: {name: "SUB", add: 0, args: 2, ret: 1},
  0x04: {name: "DIV", add: 0, args: 2, ret: 1},
  0x05: {name: "SDIV", add: 0, args: 2, ret: 1},
  0x06: {name: "MOD", add: 0, args: 2, ret: 1},
  0x07: {name: "SMOD", add: 0, args: 2, ret: 1},
  0x08: {name: "ADDMOD", add: 0, args: 3, ret: 1},
  0x09: {name: "MULMOD", add: 0, args: 3, ret: 1},
  0x0a: {name: "EXP", add: 0, args: 2, ret: 1},
  0x0b: {name: "SIGNEXTEND", add: 0, args: 2, ret: 1},

  0x10: {name: "LT", add: 0, args: 2, ret: 1},
  0x11: {name: "GT", add: 0, args: 2, ret: 1},
  0x12: {name: "SLT", add: 0, args: 2, ret: 1},
  0x13: {name: "SGT", add: 0, args: 2, ret: 1},
  0x14: {name: "EQ", add: 0, args: 2, ret: 1},
  0x15: {name: "ISZERO", add: 0, args: 1, ret: 1},
  0x16: {name: "AND", add: 0, args: 2, ret: 1},
  0x17: {name: "OR", add: 0, args: 2, ret: 1},
  0x18: {name: "XOR", add: 0, args: 2, ret: 1},
  0x19: {name: "NOT", add: 0, args: 1, ret: 1},
  0x1a: {name: "BYTE", add: 0, args: 2, ret: 1},

  0x20: {name: "SHA3", add: 0, args: 2, ret: 1},

  0x30: {name: "ADDRESS", add: 0, args: 0, ret: 1},
  0x31: {name: "BALANCE", add: 0, args: 1, ret: 1},
  0x32: {name: "ORIGIN", add: 0, args: 0, ret: 1},
  0x33: {name: "CALLER", add: 0, args: 0, ret: 1},
  0x34: {name: "CALLVALUE", add: 0, args: 0, ret: 1},
  0x35: {name: "CALLDATALOAD", add: 0, args: 1, ret: 1},
  0x36: {name: "CALLDATASIZE", add: 0, args: 0, ret: 1},
  0x37: {name: "CALLDATACOPY", add: 0, args: 3, ret: 0},
  0x38: {name: "CODESIZE", add: 0, args: 0, ret: 1},
  0x39: {name: "CODECOPY", add: 0, args: 3, ret: 0},
  0x3a: {name: "GASPRICE", add: 0, args: 0, ret: 1},
  0x3b: {name: "EXTCODESIZE", add: 0, args: 1, ret: 1},
  0x3c: {name: "EXTCODECOPY", add: 0, args: 4, ret: 0},
  0x3d: {name: "RETURNDATASIZE", add: 0, args: 0, ret: 1},
  0x3e: {name: "RETURNDATACOPY", add: 0, args: 3, ret: 0},
  0x40: {name: "BLOCKHASH", add: 0, args: 1, ret: 1},
  0x41: {name: "COINBASE", add: 0, args: 0, ret: 1},
  0x42: {name: "TIMESTAMP", add: 0, args: 0, ret: 1},
  0x43: {name: "NUMBER", add: 0, args: 0, ret: 1},
  0x44: {name: "DIFFICULTY", add: 0, args: 0, ret: 1},
  0x45: {name: "GASLIMIT", add: 0, args: 0, ret: 1},
  0x50: {name: "POP", add: 0, args: 1, ret: 0},
  0x51: {name: "MLOAD", add: 0, args: 1, ret: 1},
  0x52: {name: "MSTORE", add: 0, args: 2, ret: 0},
  0x53: {name: "MSTORE8", add: 0, args: 2, ret: 0},
  0x54: {name: "SLOAD", add: 0, args: 1, ret: 1},
  0x55: {name: "SSTORE", add: 0, args: 2, ret: 0},
  0x56: {name: "JUMP", add: 0, args: 1, ret: 0},
  0x57: {name: "JUMPI", add: 0, args: 2, ret: 0},
  0x58: {name: "PC", add: 0, args: 0, ret: 1},
  0x59: {name: "MSIZE", add: 0, args: 0, ret: 1},
  0x5a: {name: "GAS", add: 0, args: 0, ret: 1},
  0x5b: {name: "JUMPDEST", add: 0, args: 0, ret: 0},
  0x60: {name: "PUSH1", add: 1, args: 0, ret: 1},
  0x61: {name: "PUSH2", add: 2, args: 0, ret: 1},
  0x62: {name: "PUSH3", add: 3, args: 0, ret: 1},
  0x63: {name: "PUSH4", add: 4, args: 0, ret: 1},
  0x64: {name: "PUSH5", add: 5, args: 0, ret: 1},
  0x65: {name: "PUSH6", add: 6, args: 0, ret: 1},
  0x66: {name: "PUSH7", add: 7, args: 0, ret: 1},
  0x67: {name: "PUSH8", add: 8, args: 0, ret: 1},
  0x68: {name: "PUSH9", add: 9, args: 0, ret: 1},
  0x69: {name: "PUSH10", add: 10, args: 0, ret: 1},
  0x6a: {name: "PUSH11", add: 11, args: 0, ret: 1},
  0x6b: {name: "PUSH12", add: 12, args: 0, ret: 1},
  0x6c: {name: "PUSH13", add: 13, args: 0, ret: 1},
  0x6d: {name: "PUSH14", add: 14, args: 0, ret: 1},
  0x6e: {name: "PUSH15", add: 15, args: 0, ret: 1},
  0x6f: {name: "PUSH16", add: 16, args: 0, ret: 1},
  0x70: {name: "PUSH17", add: 17, args: 0, ret: 1},
  0x71: {name: "PUSH18", add: 18, args: 0, ret: 1},
  0x72: {name: "PUSH19", add: 19, args: 0, ret: 1},
  0x73: {name: "PUSH20", add: 20, args: 0, ret: 1},
  0x74: {name: "PUSH21", add: 21, args: 0, ret: 1},
  0x75: {name: "PUSH22", add: 22, args: 0, ret: 1},
  0x76: {name: "PUSH23", add: 23, args: 0, ret: 1},
  0x77: {name: "PUSH24", add: 24, args: 0, ret: 1},
  0x78: {name: "PUSH25", add: 25, args: 0, ret: 1},
  0x79: {name: "PUSH26", add: 26, args: 0, ret: 1},
  0x7a: {name: "PUSH27", add: 27, args: 0, ret: 1},
  0x7b: {name: "PUSH28", add: 28, args: 0, ret: 1},
  0x7c: {name: "PUSH29", add: 29, args: 0, ret: 1},
  0x7d: {name: "PUSH30", add: 30, args: 0, ret: 1},
  0x7e: {name: "PUSH31", add: 31, args: 0, ret: 1},
  0x7f: {name: "PUSH32", add: 32, args: 0, ret: 1},
  0x80: {name: "DUP1", add: 0, args: 1, ret: 2},
  0x81: {name: "DUP2", add: 0, args: 2, ret: 3},
  0x82: {name: "DUP3", add: 0, args: 3, ret: 4},
  0x83: {name: "DUP4", add: 0, args: 4, ret: 5},
  0x84: {name: "DUP5", add: 0, args: 5, ret: 6},
  0x85: {name: "DUP6", add: 0, args: 6, ret: 7},
  0x86: {name: "DUP7", add: 0, args: 7, ret: 8},
  0x87: {name: "DUP8", add: 0, args: 8, ret: 9},
  0x88: {name: "DUP9", add: 0, args: 9, ret: 10},
  0x89: {name: "DUP10", add: 0, args: 10, ret: 11},
  0x8a: {name: "DUP11", add: 0, args: 11, ret: 12},
  0x8b: {name: "DUP12", add: 0, args: 12, ret: 13},
  0x8c: {name: "DUP13", add: 0, args: 13, ret: 14},
  0x8d: {name: "DUP14", add: 0, args: 14, ret: 15},
  0x8e: {name: "DUP15", add: 0, args: 15, ret: 16},
  0x8f: {name: "DUP16", add: 0, args: 16, ret: 17},
  0x90: {name: "SWAP1", add: 0, args: 2, ret: 2},
  0x91: {name: "SWAP2", add: 0, args: 3, ret: 3},
  0x92: {name: "SWAP3", add: 0, args: 4, ret: 4},
  0x93: {name: "SWAP4", add: 0, args: 5, ret: 5},
  0x94: {name: "SWAP5", add: 0, args: 6, ret: 6},
  0x95: {name: "SWAP6", add: 0, args: 7, ret: 7},
  0x96: {name: "SWAP7", add: 0, args: 8, ret: 8},
  0x97: {name: "SWAP8", add: 0, args: 9, ret: 9},
  0x98: {name: "SWAP9", add: 0, args: 10, ret: 10},
  0x99: {name: "SWAP10", add: 0, args: 11, ret: 11},
  0x9a: {name: "SWAP11", add: 0, args: 12, ret: 12},
  0x9b: {name: "SWAP12", add: 0, args: 13, ret: 13},
  0x9c: {name: "SWAP13", add: 0, args: 14, ret: 14},
  0x9d: {name: "SWAP14", add: 0, args: 15, ret: 15},
  0x9e: {name: "SWAP15", add: 0, args: 16, ret: 16},
  0x9f: {name: "SWAP16", add: 0, args: 17, ret: 17},
  0xa0: {name: "LOG0", add: 0, args: 2, ret: 0},
  0xa1: {name: "LOG1", add: 0, args: 3, ret: 0},
  0xa2: {name: "LOG2", add: 0, args: 4, ret: 0},
  0xa3: {name: "LOG3", add: 0, args: 5, ret: 0},
  0xa4: {name: "LOG4", add: 0, args: 6, ret: 0},

// these are generated by the interpreter - should never be in user code
  0xac: {name: "PUSHC", add: 3, args: 0, ret: 1},
  0xad: {name: "JUMPC", add: 0, args: 1, ret: 0},
  0xae: {name: "JUMPCI", add: 0, args: 2, ret: 0},

  0xb0: {name: "JUMPTO", add: 2, args: 1, ret: 0},
  0xb1: {name: "JUMPIF", add: 2, args: 2, ret: 0},
  0xb2: {name: "JUMPV", add: 2, args: 1, ret: 0},
  0xb3: {name: "JUMPSUB", add: 2, args: 1, ret: 0},
  0xb4: {name: "JUMPSUBV", add: 2, args: 1, ret: 0},
  0xb5: {name: "BEGINDATA", add: 0, args: 0, ret: 0},
  0xb6: {name: "BEGINSUB", add: 0, args: 0, ret: 0},
  0xb7: {name: "RETURNSUB", add: 0, args: 1, ret: 0},
  0xb8: {name: "PUTLOCAL", add: 2, args: 1, ret: 0},
  0xb9: {name: "GETLOCAL", add: 2, args: 0, ret: 1},

  0xf0: {name: "CREATE", add: 0, args: 3, ret: 1},
  0xf1: {name: "CALL", add: 0, args: 7, ret: 1},
  0xf2: {name: "CALLCODE", add: 0, args: 7, ret: 1},
  0xf3: {name: "RETURN", add: 0, args: 2, ret: 0},
  0xfa: {name: "STATICCALL", add: 0, args: 6, ret: 1},
  0xfb: {name: "CREATE2", add: 0, args: 4, ret: 1},
  0xfc: {name: "DELEGATECALL", add: 0, args: 6, ret: 1},
  0xfd: {name: "REVERT", add: 0, args: 2, ret: 0},
  0xfe: {name: "INVALID", add: 0, args: 0, ret: 0},
  0xff: {name: "SUICIDE", add: 0, args: 1, ret: 0}
};


var opCodeParser = {

  // expects a hex encoded string of opcodes
  parse: function (opcodes) {
    if (opcodes.substr(0,2) === '0x') {
      opcodes = opcodes.substr(2);
    }
    for (var i=0; i < opcodes.length; i += 2) {
      var opCode = parseInt(opcodes.substr(i,2),16);
      if (opCodes[opCode] === undefined) {
        console.warn('Unknown opcode %s', opCode.toString(16));
        break;
      }
      var output = opCodes[opCode].name;
      if (opCodes[opCode].add) {
        output += '\t0x';
        output += opcodes.substr(i+2, 2 * opCodes[opCode].add);
        i += 2 * opCodes[opCode].add;
      }
      console.log(output);
    }

  }
};

module.exports = opCodeParser;


opCodeParser.parse('0x6060604052361561001f5760e060020a600035046372ea4b8c811461010c575b61011b3460008080678ac7230489e8000084106101d557600180548101908190556003805433929081101561000257906000526020600020900160006101000a815481600160a060020a0302191690830217905550678ac7230489e80000840393508350678ac7230489e800006000600082828250540192505081905550600260016000505411151561011d5760038054829081101561000257906000526020600020900160009054906101000a9004600160a060020a0316600160a060020a03166000600060005054604051809050600060405180830381858888f150505080555060016002556101d5565b60018054016060908152602090f35b005b60018054600354910114156101d55760038054600254600101909102900392505b6003546002549003600119018310156101e357600380548490811015610002579082526040517fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b9190910154600160a060020a0316908290674563918244f400009082818181858883f150509054674563918244f3ffff1901835550506001929092019161013e565b505060028054600101905550505b600080548501905550505050565b506002548154919250600190810190910460001901905b60035460025490036001190183101561029a576003805484908110156100025760009182526040517fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b9190910154600160a060020a03169190838504600019019082818181858883f1505081548486049003600190810190925550600290830183020460001901841415905061028e576001015b600192909201916101fa565b60038054600254810182018083559190829080158290116101c75760008390526101c7907fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b9081019083015b808211156102fa57600081556001016102e6565b509056');