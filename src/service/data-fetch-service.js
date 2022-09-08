// import {AlchemyWeb3} from "@alch/alchemy-web3";
import {from} from "rxjs";
//
// const {createAlchemyWeb3} = require("@alch/alchemy-web3");
//
// // Using WebSockets
// export const alchemyWeb3Connection = () => createAlchemyWeb3(
//     "wss://eth-mainnet.g.alchemy.com/v2/q-XcEiXre1I0WRwgny8MxxsJN_Tl-GpV",
// );
//
// export const getFeeDataHistory = (web3Connection: AlchemyWeb3) => {
//     // const alchemyWeb3Connection = createAlchemyWeb3(
//     //     "wss://eth-mainnet.g.alchemy.com/v2/q-XcEiXre1I0WRwgny8MxxsJN_Tl-GpV",
//     // );
//     // from(alchemyWeb3Connection.eth.getFeeHistory(4, "latest", [25, 50, 75])).subscribe(console.log);
//
// }
// ;

import {Network, Alchemy, AlchemyEventType, AssetTransfersCategory} from 'alchemy-sdk';
import {ethers} from 'ethers';
import {initialGraphInitCount} from "../models/constants";
import {GeneralModels, NameValuePair} from "../models/general-models";
import {createAlchemyWeb3} from "@alch/alchemy-web3";

const tx = 'tsdsdfsdf';

const settings = {
    apiKey: 'q-XcEiXre1I0WRwgny8MxxsJN_Tl-GpV', // Replace with your Alchemy API Key.
    network: Network.ETH_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);

// alchemy.ws.on(
//     {
//         method: 'alchemy_pendingTransactions'
//     },
//     res => console.log(res)
// );
export const startService = (transferDataQueue, setData) => {
    // alchemy.ws.on("block", (blockNumber: any, eth_subscribe: any) => {
    //         console.log("Latest block:", blockNumber)
    //         console.log("Latest block:", eth_subscribe)
    //     }
    // );
    // const transferDataQueue = new GeneralModels();
    // const topicSets: AlchemyEventType = [
    //     ethers.utils.id("Transfer(address,address,uint256)"),
    //     null,
    //     ['0x514910771AF9Ca656af840dff83E8264EcF986CA'],
    // ];
    const filter = {
        address: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
        topics: [ethers.utils.id("Transfer(address,address,uint256)")],
    };
    // alchemy.ws.on(filter, (log: any, event: any) => {
    //     console.log("Latest block:", log, event)
    // });

    // const {createAlchemyWeb3} = require("@alch/alchemy-web3");
    const {createAlchemyWeb3} = require("@alch/alchemy-web3");
//
// Using HTTPS
//     const web3Imp = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/q-XcEiXre1I0WRwgny8MxxsJN_Tl-GpV");
//     const ethereum = getEthereumFromWindow();
//     if (!ethereum) return;
    const web3Imp = createAlchemyWeb3(
        "wss://eth-mainnet.g.alchemy.com/v2/q-XcEiXre1I0WRwgny8MxxsJN_Tl-GpV"
    );
    alchemy.ws.removeAllListeners();
    // alchemy.core.getAssetTransfers({
    //     category: [AssetTransfersCategory.ERC20],
    //     withMetadata: true,
    //     maxCount: 10,
    //     contractAddresses: ['0x514910771AF9Ca656af840dff83E8264EcF986CA']
    // }).then(console.log)
    // web3Imp.eth
    //         .getFeeHistory(1, "latest", [25, 50, 75]).then(console.log);
    // from(web3Imp.eth.getBlockNumber())
    //     .subscribe(console.log);
    const initialTransferLogFilter = {
        contractAddresses: ["0xdAC17F958D2ee523a2206206994597C13D831ec7"],
        maxCount: initialGraphInitCount,
        category: [AssetTransfersCategory.ERC20]
    };
    // const recurringTransferLogFilter = {
    //     address: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
    //     topics: [ethers.utils.id("Transfer(address,address,uint256)")],
    // };

    // from(web3Imp.alchemy.getAssetTransfers(initialTransferLogFilter)).subscribe(data => {
    //     if (data?.transfers?.length > 0) {
    //         data.transfers.forEach(transfer => {
    //             // console.log(transfer);
    //             if (transfer) {
    //                 transferDataQueue.addItemToFixedArraySize(new NameValuePair(transfer.blockNum, transfer.value));
    //
    //
    //             }
    //         })
    //         setData(JSON.parse(JSON.stringify(transferDataQueue)))
    //     }
    // });

    // alchemy.ws.on(
    //     filter1, (log) => {
    //         console.log("TEsting Log:", log)
    //     });
    // alchemy.ws.on("block", () =>
    //     from(web3Imp.eth
    //         .getFeeHistory(1, "latest", [25, 50, 75])).subscribe(transfer => {
    //             // console.log(transfer);
    //             if (transfer) {
    //                 transferDataQueue.addItemToFixedArraySize(new NameValuePair(transfer.blockNum, transfer.value));
    //                 setData(JSON.parse(JSON.stringify(transferDataQueue)))
    //             }
    //     })
    // );
    alchemy.ws.on("block", (block) => {
            if (transferDataQueue.fixedLengthValueArrayQueue.length > 0) {
                initialTransferLogFilter.fromBlock = block;
            }
            from(web3Imp.alchemy.getAssetTransfers(initialTransferLogFilter)).subscribe(data => {
                console.log(data);
                if (data?.transfers?.length > 0) {
                    data.transfers.forEach(transfer => {
                        // console.log(transfer);
                        if (transfer) {
                            transferDataQueue.addItemAndVaryArraySize(new NameValuePair(transfer.blockNum, transfer.value));
                        }
                    })
                    setData(JSON.parse(JSON.stringify(transferDataQueue)))
                }
            })
        }
    );

}

export const startGasService = (transferDataQueue, setData) => {
    // alchemy.ws.on("block", (blockNumber: any, eth_subscribe: any) => {
    //         console.log("Latest block:", blockNumber)
    //         console.log("Latest block:", eth_subscribe)
    //     }
    // );
    // const transferDataQueue = new GeneralModels();
    // const topicSets: AlchemyEventType = [
    //     ethers.utils.id("Transfer(address,address,uint256)"),
    //     null,
    //     ['0x514910771AF9Ca656af840dff83E8264EcF986CA'],
    // ];

    // alchemy.ws.on(filter, (log: any, event: any) => {
    //     console.log("Latest block:", log, event)
    // });

    // const {createAlchemyWeb3} = require("@alch/alchemy-web3");
    const {createAlchemyWeb3} = require("@alch/alchemy-web3");
//
// Using HTTPS
//     const web3Imp = createAlchemyWeb3("https://eth-mainnet.alchemyapi.io/q-XcEiXre1I0WRwgny8MxxsJN_Tl-GpV");
//     const ethereum = getEthereumFromWindow();
//     if (!ethereum) return;
    const web3Imp = createAlchemyWeb3(
        "wss://eth-mainnet.g.alchemy.com/v2/q-XcEiXre1I0WRwgny8MxxsJN_Tl-GpV"
    );
    // alchemy.ws.removeAllListeners();
    // alchemy.core.getAssetTransfers({
    //     category: [AssetTransfersCategory.ERC20],
    //     withMetadata: true,
    //     maxCount: 10,
    //     contractAddresses: ['0x514910771AF9Ca656af840dff83E8264EcF986CA']
    // }).then(console.log)
    // web3Imp.eth
    //         .getFeeHistory(1, "latest", [25, 50, 75]).then(console.log);
    // from(web3Imp.eth.getBlockNumber())
    //     .subscribe(console.log);

    // const recurringTransferLogFilter = {
    //     address: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
    //     topics: [ethers.utils.id("Transfer(address,address,uint256)")],
    // };

    // from(web3Imp.alchemy.getAssetTransfers(initialTransferLogFilter)).subscribe(data => {
    //     if (data?.transfers?.length > 0) {
    //         data.transfers.forEach(transfer => {
    //             // console.log(transfer);
    //             if (transfer) {
    //                 transferDataQueue.addItemToFixedArraySize(new NameValuePair(transfer.blockNum, transfer.value));
    //
    //
    //             }
    //         })
    //         setData(JSON.parse(JSON.stringify(transferDataQueue)))
    //     }
    // });

    // alchemy.ws.on(
    //     filter1, (log) => {
    //         console.log("TEsting Log:", log)
    //     });
    alchemy.ws.on("block", () =>
        from(web3Imp.eth
            .getFeeHistory(1, "latest", [25, 50, 75])).subscribe(transfer => {
                // console.log(transfer);
                if (transfer) {
                    transferDataQueue.addItemToFixedArraySize(new NameValuePair(transfer.oldestBlock,  parseInt(transfer.baseFeePerGas[0], 16)));
                    setData(JSON.parse(JSON.stringify(transferDataQueue)))
                }
        })
    );

}

export const startGasUsedRatioService = (transferDataQueue, setData) => {

    const {createAlchemyWeb3} = require("@alch/alchemy-web3");
    const web3Imp = createAlchemyWeb3(
        "wss://eth-mainnet.g.alchemy.com/v2/q-XcEiXre1I0WRwgny8MxxsJN_Tl-GpV"
    );

    alchemy.ws.on("block", () =>
        from(web3Imp.eth
            .getFeeHistory(1, "latest", [25, 50, 75])).subscribe(transfer => {
            // console.log(transfer);
            if (transfer) {
                transferDataQueue.addItemToFixedArraySize(new NameValuePair(transfer.oldestBlock,  transfer.gasUsedRatio[0]));
                setData(JSON.parse(JSON.stringify(transferDataQueue)))
            }
        })
    );

}


const getEthereumFromWindow = () => {
    const ethereum = window;
    if (!ethereum) {
        console.error("MetaMask is not installed. Please consider installing it: https://metamask.io/download.html");
    }
    return ethereum;
}

