import { ethers } from "ethers";
import EthCrypto from "eth-crypto";

export async function encryptWithFakeAddress(
  address,
  doublesecurity,
  password
) {
  let hash = ethers.utils.id(address + doublesecurity);

  //const newAdd = new ethers.Wallet(privatekey).wallet;
  let wallet = new ethers.Wallet(hash);
  console.log(wallet.address);
  console.log("hash", hash);
  console.log(wallet.privateKey);
  console.log(wallet.publicKey);
  const publicKey = EthCrypto.publicKeyByPrivateKey(hash);

  const encrypted = await EthCrypto.encryptWithPublicKey(
    publicKey, // publicKey
    password // message
  );
  const str = EthCrypto.cipher.stringify(encrypted);

  return str;
}

export async function decryptWithFakeAddress(
  address,
  doublesecurity,
  encrypted
) {
  let hash = ethers.utils.id(doublesecurity);

  let result = parseInt(hash, 16) + parseInt(address);

  let privatekey = ethers.utils.formatBytes32String(result.toString());

  const object = EthCrypto.cipher.parse(encrypted);

  const password = await EthCrypto.decryptWithPrivateKey(
    privatekey, // privateKey
    object
  );

  return password;
}
