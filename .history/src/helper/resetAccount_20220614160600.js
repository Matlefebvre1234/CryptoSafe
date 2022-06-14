
import { Contract , ethers} from "ethers";
import abi from "../abi/Account.json"

export async function resetAccount(web3,passwordContext,doublesecurity)
{
    let contract = new Contract(passwordContext.ref_account.current,abi,web3.ref_provider.current.getSigner());
    let tx = await contract.resetAccount();
    await tx.wait();

    if(doublesecurity)
    {
        let hash = ethers.utils.id(web3.ref_address.current+ doublesecurity);
        const wallet = new ethers.Wallet(hash);
        console.log(wallet.address);
        let tx2 = await contract.setHashDoubleSecurity(wallet.address);
        await tx2;
    }
}