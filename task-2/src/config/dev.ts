import PoolAbi from "../constants/pool.json";
import ERC20Abi from "../constants/ERC20.json";

export const RPC = "https://rpc-mumbai.maticvigil.com"
export const DECIMAL = 1000000000000000000;

export const CHAINID = "0x13881"; // HEX Mumbai testnet

export const Pool = {
    address : "0xcC6114B983E4Ed2737E9BD3961c9924e6216c704",
    ABI : PoolAbi
}
export const ERC20Token = {
    address: "0xc8c0Cf9436F4862a8F60Ce680Ca5a9f0f99b5ded", // dai token used 
    ABI : ERC20Abi
}



export const WALLET_STATUS_LOCALSTORAGE = "wallet";
export const WALLET_ADRESS_LOCALSTORAGE = "wallet_address";
export const SIGN_KEY = "VERIFY WALLET";