import { ethers } from "ethers";
import EthCrypto from "eth-crypto";

export async function encryptWithFakeAddress(
  address,
  doublesecurity,
  password
) {
  let hash = ethers.utils.id(address + doublesecurity);

  //const newAdd = new ethers.Wallet(privatekey).wallet;

  const publicKey = EthCrypto.publicKeyByPrivateKey(hash);
  console.log(publicKey);
  const encrypted = await EthCrypto.encryptWithPublicKey(
    publicKey, // publicKey
    password // message
  );

  console.log("encrypted", encrypted);
  const str = EthCrypto.cipher.stringify(encrypted);

  return str;
}

export async function decryptWithFakeAddress(
  address,
  doublesecurity,
  encrypted
) {
  let hash = ethers.utils.id(address + doublesecurity);

  const object = EthCrypto.cipher.parse(encrypted);

  const password = await EthCrypto.decryptWithPrivateKey(
    hash, // privateKey
    object
  );

  return password;
}
