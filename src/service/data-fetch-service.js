import {from} from "rxjs";


import {Network, Alchemy, AssetTransfersCategory} from 'alchemy-sdk';
import {alchemyAPIKey, initialGraphInitCount} from "../models/constants";
import { NameValuePair} from "../models/general-models";
import {createAlchemyWeb3} from "@alch/alchemy-web3";


const settings = {
    apiKey: alchemyAPIKey,
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);
export const startTransferListenerService = (contractAddress, transferDataQueue, setData) => {
    const {createAlchemyWeb3} = require("@alch/alchemy-web3");
    const web3Imp = createAlchemyWeb3(
        "wss://eth-mainnet.g.alchemy.com/v2/" +alchemyAPIKey
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
        "wss://eth-mainnet.g.alchemy.com/v2/" + alchemyAPIKey
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
        "wss://eth-mainnet.g.alchemy.com/v2/" + alchemyAPIKey
    );
    from(web3Imp.eth
        .getFeeHistory(initialGraphInitCount, "latest", [90])).subscribe(gasFeeData => {
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

