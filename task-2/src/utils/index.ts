import CONFIG from "../config";
import { toast } from "react-toastify";
import { utils } from "ethers";

declare global {
    interface Window {
      ethereum?: any;
    }
  }

export const connectWallet = async () => {
  try {
    if (window.ethereum) {
      try {
        const chain = await window.ethereum.request({ method: "eth_chainId" });
        if (chain === CONFIG.CHAINID) {
          const addressArray = await window.ethereum.request({
            method: "eth_requestAccounts",
          });

          console.log("addressArray", addressArray);
          if (addressArray.length > 0) {
            return {
              address: await addressArray[0], // status: " Ethereum Wallet is connected.",
            };
          } else {
            toast.error(`😥 Connect your wallet account to the site.`);
          }
        } else {
          // Case other chain connected so change to chain of config
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: CONFIG.CHAINID }],
          });
          const addressArray = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          if (addressArray.length > 0) {
            return {
              address: await addressArray[0],
            };
          }
        }
      } catch (err) {
        // No exist chain in your wallet
        const networkMap = {
          MUMBAI_TESTNET: {
            chainId: utils.hexValue(80001), // '0x13881'
            chainName: "Matic(Polygon) Mumbai Testnet",
            nativeCurrency: { name: "tMATIC", symbol: "tMATIC", decimals: 18 },
            rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
            blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
          },
        };

        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [networkMap.MUMBAI_TESTNET],
        });

        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (addressArray.length > 0) {
          return {
            address: await addressArray[0],
          };
        }
      }
    } else {
      toast.error(
        `🦊 You must install Metamask, a virtual Ethereum wallet, in your browser.(https://metamask.io/download.html)`
      );
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const UserRejected = (error: any) => {
    if (error instanceof Error && error.message.toLowerCase().includes("user rejected")) {
      toast.error("Please accept the transaction request");
      return true;
    } else {
      return false;
    }
  };