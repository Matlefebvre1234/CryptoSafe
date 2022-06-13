import { ethers } from "ethers";
import EthCrypto from 'eth-crypto';

export async function encryptWithFakeAddress(address,doublesecurity,password)
{    
    let hash = ethers.utils.id(doublesecurity);
    let result = parseInt(hash,16)  + parseInt(address);

   let privatekey = ethers.utils.formatBytes32String(result.toString());
   console.log('hash',hash);
   console.log('result',result);
  console.log(privatekey);
    //const newAdd = new ethers.Wallet(privatekey).wallet;

    const publicKey = EthCrypto.publicKeyByPrivateKey(privatekey);

    const encrypted = await EthCrypto.encryptWithPublicKey(
        publicKey, // publicKey
        password// message
    );
    console.log('encrypt', encrypted);
    const str = EthCrypto.cipher.stringify(encrypted);

    return str;

}


export async function decryptWithFakeAddress(address,doublesecurity,encrypted)
{
    let hash = ethers.utils.id(doublesecurity);
    let result = parseInt(hash,16)  + parseInt(address);
    console.log('hash',hash);
    console.log('result',result);
   let privatekey = ethers.utils.formatBytes32String(result.toString());
   console.log(privatekey);
   const object = EthCrypto.cipher.parse(encrypted);
   console.log('decrypt', object);
    const password = await EthCrypto.decryptWithPrivateKey(
        privatekey, // privateKey
        object
    );

    return password;
}