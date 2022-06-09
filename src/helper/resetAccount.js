
import { Contract , ethers} from "ethers";
import abi from "../abi/Master.json"
import contractAddress from "../abi/contractAddress";

export async function resetAccount(web3,doublesecurity)
{
    let signer = web3.ref_provider.current.getSigner();
    let contract = new Contract(contractAddress, abi, signer);
    const tx = await contract.createAccount(web3.ref_address.current,false);
    await tx.wait();

    if(doublesecurity)
    {
        web3.ref_account.current = await contract.getAccount(web3.ref_address.current);
        let hash = ethers.utils.id(doublesecurity);
        let contractAccount = new Contract(contractAddress,abi,signer);
        await contractAccount.setHashDoubleSecurity(hash);
    }
}