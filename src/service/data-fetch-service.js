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
// 0xdAC17F958D2ee523a2206206994597C13D831ec7
export const startTransferListenerService = (contractAddress, transferDataQueue, setData) => {
    const {createAlchemyWeb3} = require("@alch/alchemy-web3");
    const web3Imp = createAlchemyWeb3(
        "wss://eth-mainnet.g.alchemy.com/v2/q-XcEiXre1I0WRwgny8MxxsJN_Tl-GpV"
    );
    alchemy.ws.removeAllListeners();
    const initialTransferLogFilter = {
        contractAddresses: [contractAddress],
        maxCount: initialGraphInitCount,
        category: [AssetTransfersCategory.ERC20]
    };
    if (contractAddress) {
        alchemy.ws.on("block", (block) => {
                if (transferDataQueue.fixedLengthValueArrayQueue.length > 0) {
                    initialTransferLogFilter.fromBlock = block;
                }
                from(web3Imp.alchemy.getAssetTransfers(initialTransferLogFilter)).subscribe(data => {
                    console.log(data);
                    if (data?.transfers?.length > 0) {
                        data.transfers.forEach(transfer => {
                            if (transfer) {
                                transferDataQueue.addDataToArray(new NameValuePair(transfer.blockNum, transfer.value));
                            }
                        })
                        setData(JSON.parse(JSON.stringify(transferDataQueue)))
                    }
                })
            }
        );
    }

}

export const startBaseFeeService = (transferDataQueue, setData) => {
    const {createAlchemyWeb3} = require("@alch/alchemy-web3");
    const web3Imp = createAlchemyWeb3(
        "wss://eth-mainnet.g.alchemy.com/v2/q-XcEiXre1I0WRwgny8MxxsJN_Tl-GpV"
    );
    from(web3Imp.eth
        .getFeeHistory(initialGraphInitCount, "latest", [90])).subscribe(baseFeeData => {
        if (baseFeeData?.baseFeePerGas) {
            baseFeeData.baseFeePerGas.forEach((baseFee,index) => {
                console.log(baseFee)
                if (index === initialGraphInitCount-1) {
                    transferDataQueue.addDataToArray(new NameValuePair(baseFeeData.oldestBlock,  parseInt(baseFee, 16)));
                } else {
                    transferDataQueue.addDataToArray(new NameValuePair(index,  parseInt(baseFee, 16)));
                }
            })


            setData(JSON.parse(JSON.stringify(transferDataQueue)))
        }
    })
    alchemy.ws.on("block", () =>
        from(web3Imp.eth
            .getFeeHistory(1, "latest", [90])).subscribe(baseFeeData => {
            if (baseFeeData) {
                transferDataQueue.addDataToArray(new NameValuePair(baseFeeData.oldestBlock, parseInt(baseFeeData.baseFeePerGas[0], 16)));
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
    from(web3Imp.eth
        .getFeeHistory(initialGraphInitCount, "latest", [90])).subscribe(gasFeeData => {
        // console.log(transfer);
        if (gasFeeData?.gasUsedRatio) {
            gasFeeData.gasUsedRatio.forEach((ratio,index) => {
                if (index === initialGraphInitCount-1) {
                    transferDataQueue.addDataToArray(new NameValuePair(gasFeeData.oldestBlock,  ratio));
                } else {
                    transferDataQueue.addDataToArray(new NameValuePair(index,  ratio));
                }
            })


            setData(JSON.parse(JSON.stringify(transferDataQueue)))
        }
    })
    alchemy.ws.on("block", () =>
        from(web3Imp.eth
            .getFeeHistory(1, "latest", [90])).subscribe(gasFeeData => {
            if (gasFeeData) {
                transferDataQueue.addDataToArray(new NameValuePair(gasFeeData.oldestBlock,  gasFeeData.gasUsedRatio[0]));
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

