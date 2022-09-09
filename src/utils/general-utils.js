import {ethers} from "ethers";

export const checkIfAddressValid = (address) => {
    return ethers.utils.isAddress(address)
}
