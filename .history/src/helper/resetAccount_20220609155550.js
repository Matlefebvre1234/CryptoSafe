
import { Contract } from "ethers";
import abi from "../abi/Master.json"
import contractAddress from "../abi/contractAddress";

export async function resetAccount(web3)
{
    let signer = web3.ref_provider.current.getSigner();
    let contract = new Contract(contractAddress, abi, signer);
    const tx = await contract.createAccount(web3.ref_address.current,false);
    await tx.wait();
}