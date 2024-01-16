import { ethers } from "ethers";
import { toast } from "react-toastify";
import CONFIG from "../config";
import { UserRejected } from "../utils";
export const CallSupply = async () => {
    try {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            const signer = provider.getSigner(accounts[0]);

            // Create an instance of the ERC-20 contract
            const erc20Contract = new ethers.Contract(
                CONFIG.ERC20Token.address,
                CONFIG.ERC20Token.ABI,
                signer
            );

            // Create an instance of the Pool.sol contract
            const poolContract = new ethers.Contract(
                CONFIG.Pool.address,
                CONFIG.Pool.ABI,
                signer
            );

            const decimals = await erc20Contract.decimals();

            const approvalAmount = ethers.utils.parseUnits('10', decimals);

            // Check if the balance is sufficient
            const balance = await erc20Contract.balanceOf(accounts[0]);
            if (balance.lt(approvalAmount)) {
                toast.error("Insufficient balance.");
                return;
            }

            // Check if the pool contract is already approved
            const allowance = await erc20Contract.allowance(accounts[0], CONFIG.Pool.address);
            if (allowance.lt(approvalAmount)) {
                // Call the `approve` function if not approved
                const approveTx = await erc20Contract.approve(
                    CONFIG.Pool.address,
                    approvalAmount
                );
                await approveTx.wait();
            }

            // Call the `supply` function
            const tx = await poolContract.supply(
                CONFIG.ERC20Token.address,
                approvalAmount,
                accounts[0],
                0
            );
            await tx.wait();
            if(tx){
                toast.success("Sucessfully called Supply")
            }

        } else {
            toast.error("Connect wallet !");
        }
    } catch (error: any) {
        if(!UserRejected(error)){
            toast.error("Please try again later...");
            console.error(`CallSupply : ${error}`);
        }
        
    }
};
