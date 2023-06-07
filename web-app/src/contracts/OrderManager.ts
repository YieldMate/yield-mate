export const OrderManager = {
  address: "0xe59911e5b5B37a8983A6F6B7528eE0b79dE814A1",
  addressTestnet: "0x0",
  abi: [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [],
      name: "InvalidOrderId",
      type: "error",
    },
    {
      inputs: [],
      name: "OrderAlreadyExecuted",
      type: "error",
    },
    {
      inputs: [],
      name: "OrderNotExecuted",
      type: "error",
    },
    {
      inputs: [],
      name: "OrderNotFound",
      type: "error",
    },
    {
      inputs: [],
      name: "TransferFailed",
      type: "error",
    },
    {
      inputs: [],
      name: "UserHasNoOrders",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "orderId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "assetIn",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amountIn",
          type: "uint256",
        },
      ],
      name: "DepositToVault",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "enum Modules",
          name: "module",
          type: "uint8",
        },
        {
          indexed: false,
          internalType: "address",
          name: "moduleAddress",
          type: "address",
        },
      ],
      name: "ModuleSetUp",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "orderId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "assetIn",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "assetOut",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amountIn",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "targetPrice",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "enum OrderType",
          name: "orderType",
          type: "uint8",
        },
      ],
      name: "OrderAdded",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "orderId",
          type: "uint256",
        },
      ],
      name: "OrderCanceled",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "orderId",
          type: "uint256",
        },
      ],
      name: "OrderExecuted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "orderId",
          type: "uint256",
        },
      ],
      name: "OrderWithdrawn",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "orderId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "assetIn",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "WithdrawFromVault",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_tokenIn",
          type: "address",
        },
        {
          internalType: "address",
          name: "_tokenOut",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_amountIn",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_price",
          type: "uint256",
        },
        {
          internalType: "enum OrderType",
          name: "_orderType",
          type: "uint8",
        },
      ],
      name: "addOrder",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_orderId",
          type: "uint256",
        },
      ],
      name: "cancelOrder",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256[]",
          name: "_offersIds",
          type: "uint256[]",
        },
      ],
      name: "executeOrders",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getEligbleOrders",
      outputs: [
        {
          internalType: "uint256[]",
          name: "eligbleOrdersIds",
          type: "uint256[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_user",
          type: "address",
        },
      ],
      name: "getOrdersInfo",
      outputs: [
        {
          internalType: "uint256[]",
          name: "_orderIds",
          type: "uint256[]",
        },
        {
          components: [
            {
              internalType: "address",
              name: "assetIn",
              type: "address",
            },
            {
              internalType: "address",
              name: "assetOut",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amountIn",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "targetPrice",
              type: "uint256",
            },
            {
              components: [
                {
                  internalType: "bool",
                  name: "executed",
                  type: "bool",
                },
                {
                  internalType: "uint256",
                  name: "amountOut",
                  type: "uint256",
                },
              ],
              internalType: "struct OrderStatus",
              name: "status",
              type: "tuple",
            },
            {
              internalType: "enum OrderType",
              name: "orderType",
              type: "uint8",
            },
          ],
          internalType: "struct OrderInfo[]",
          name: "_orders",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "ordersMapping",
      outputs: [
        {
          internalType: "address",
          name: "assetIn",
          type: "address",
        },
        {
          internalType: "address",
          name: "assetOut",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amountIn",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "targetPrice",
          type: "uint256",
        },
        {
          components: [
            {
              internalType: "bool",
              name: "executed",
              type: "bool",
            },
            {
              internalType: "uint256",
              name: "amountOut",
              type: "uint256",
            },
          ],
          internalType: "struct OrderStatus",
          name: "status",
          type: "tuple",
        },
        {
          internalType: "enum OrderType",
          name: "orderType",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "enum Modules",
          name: "_moduleType",
          type: "uint8",
        },
        {
          internalType: "address",
          name: "_moduleAddress",
          type: "address",
        },
      ],
      name: "setUpModule",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "userToOrderCountMapping",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "userToOrderMapping",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_orderId",
          type: "uint256",
        },
      ],
      name: "withdraw",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
} as const;
