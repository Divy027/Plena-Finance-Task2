import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CONNECT } from "../actions";
import { connectWallet } from "../utils";
import CONFIG from "../config";
import 'react-toastify/dist/ReactToastify.css';
 const Header = ()=> {
    const dispatch = useDispatch();
    const storeData = useSelector((status: any) => status);
    const handleConnect = async () => {
        try {
          const wallet: any = await connectWallet();
          dispatch(
            CONNECT({
              wallet: `connected`,
              address: wallet.address,
            })
          );
    
          localStorage.setItem(CONFIG.WALLET_STATUS_LOCALSTORAGE, "connected");
          localStorage.setItem(CONFIG.WALLET_ADRESS_LOCALSTORAGE, wallet.address);
        } catch (error) {
          console.log("error", error);
        }
      };
    
      const handleDisConnect = () => {
        dispatch(
          CONNECT({
            wallet: `disconnect`,
            address: ``,
          })
        );
        localStorage.setItem(CONFIG.WALLET_STATUS_LOCALSTORAGE, "disconnect");
        localStorage.setItem(CONFIG.WALLET_ADRESS_LOCALSTORAGE, "");
      };

      async function isConnected() {
        const accounts = await window.ethereum.request({method: 'eth_accounts'});       
        if (accounts.length) {
           console.log(`You're connected to: ${accounts[0]}`);
           dispatch(
            CONNECT({
              wallet: `connected`,
              address: accounts[0],
            })
          );
          localStorage.setItem(CONFIG.WALLET_STATUS_LOCALSTORAGE, "connected");
          localStorage.setItem(CONFIG.WALLET_ADRESS_LOCALSTORAGE, accounts[0]);
        } else {
           console.log("Metamask is not connected");
           dispatch(
            CONNECT({
              wallet: `disconnect`,
              address: ``,
            })
          );
          localStorage.setItem(CONFIG.WALLET_STATUS_LOCALSTORAGE, "disconnect");
          localStorage.setItem(CONFIG.WALLET_ADRESS_LOCALSTORAGE, "");
        }
     }
    
     useEffect(()=> {
      try{
        if(!window.ethereum.isConnected() || !window.ethereum._metamask.isUnlocked()){
          dispatch(
            CONNECT({
              wallet: `disconnect`,
              address: ``,
            })
          );
          localStorage.setItem(CONFIG.WALLET_STATUS_LOCALSTORAGE, "disconnect");
          localStorage.setItem(CONFIG.WALLET_ADRESS_LOCALSTORAGE, "");
        }
      }catch{
  
      }
    }, [])
    
      useEffect(() => {
        try {
          window.ethereum.on("accountsChanged", async () => {
            const wallet: any = await connectWallet();
            localStorage.setItem(CONFIG.WALLET_STATUS_LOCALSTORAGE, "connected");
            localStorage.setItem(CONFIG.WALLET_ADRESS_LOCALSTORAGE, wallet.address);
            dispatch(
              CONNECT({
                wallet: "connected",
                address: wallet.address,
              })
            );
    
          });
        } catch (e) {
          console.log(e);
        }
      }, []);
    
      useEffect(() => {
        const fetchData = async () => {
          try {
            await isConnected();
          } catch (error) {
            console.error("Error fetching metamask:", error);
          }
        };
    
        fetchData();
      }, []);
    return(
      <div className="mx-auto flex items-center justify-between py-4 px-4 bg-opacity-80 backdrop-filter backdrop-blur-lg bg-white">
        <button className="bg-black font-bold py-2 px-6 mx-auto rounded-full border border-white hover:border-blue-500 hover:text-blue-500">
          {storeData.wallet === "connected" ? (
            <span onClick={handleDisConnect}>
              {storeData?.address
                ? `${storeData?.address.substr(0, 6)}...${storeData?.address.substr(storeData?.address.length - 4, 4)}`
                : "Connect Wallet"}
            </span>
          ) : (
            <span onClick={handleConnect}>Connect Wallet</span>
          )}
        </button>
      </div>

    )
}
export default Header;