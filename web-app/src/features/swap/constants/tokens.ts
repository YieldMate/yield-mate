import { type Token } from "../types/tokens";

export const SUPPORTED_TOKENS: readonly Token[] = [
  {
    address: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
    addressTestnet: "0x0000000000000000000000000000000000001010",
    symbol: "WMATIC",
    icon: "/matic.svg",
    decimals: 18,
  },
  {
    address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
    addressTestnet: "0x0000000000000000000000000000000000000000",
    symbol: "WETH",
    icon: "/eth.svg",
    decimals: 18,
  },
  {
    address: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6",
    addressTestnet: "0x0",
    symbol: "WBTC",
    icon: "/wbtc.svg",
    decimals: 8,
  },
  {
    address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    addressTestnet: "0xD34B802f2f08650f8692Ee019D6A5e9CD927257D",
    symbol: "USDC",
    icon: "/usdc.svg",
    decimals: 6,
  },
  {
    address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    addressTestnet: "0x79bb3c5fa652faf3388b3e3828e4820a10c5b543",
    symbol: "USDT",
    icon: "/usdt.svg",
    decimals: 6,
  },
  {
    address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    addressTestnet: "0xeb03b068ee09fae768219cafb9173bb92ae18e12",
    symbol: "DAI",
    icon: "/dai.svg",
    decimals: 18,
  },
  {
    address: "0x9a71012B13CA4d3D0Cdc72A177DF3ef03b0E76A3",
    addressTestnet: "0xce1b90bea946c75d4a6dfb595bf1eda48f0bb41b",
    symbol: "BAL",
    icon: "/bal.svg",
    decimals: 18,
  },
  {
    address: "0x172370d5Cd63279eFa6d502DAB29171933a610AF",
    addressTestnet: "0x10bcc65dcff0aa796f477d2498daa3c506dae99d",
    symbol: "CRV",
    icon: "/crv.svg",
    decimals: 18,
  },
  {
    address: "0x0b3F868E0BE5597D5DB7fEB59E1CADBb0fdDa50a",
    addressTestnet: "0x0000000000000000000000000000000000000000",
    symbol: "SUSHI",
    icon: "/sushi.svg",
    decimals: 18,
  },
  {
    address: "0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39",
    addressTestnet: "0x0000000000000000000000000000000000000000",
    symbol: "LINK",
    icon: "/link.svg",
    decimals: 18,
  },
] as const;
