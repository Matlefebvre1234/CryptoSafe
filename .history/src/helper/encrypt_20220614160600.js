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
  const encrypted = await EthCrypto.encryptWithPublicKey(
    wallet.publicKey, // publicKey
    password // message
  );

  console.log('encrypted', encrypted);
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
