// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.14;

import "./Owner.sol";
import "./Account.sol";
import "./ListAccount.sol";
contract Master is Owner {

    uint fee = 50000000000000000;
    address payable ownerPayable;
    ListAccount listAccount;


    receive() external payable {

    }

    constructor()
    {
        ownerPayable = payable(msg.sender);
    }

    function createAccount(address user) external 
    {
           listAccount.set(user,address(new Account(user, owner)));
    }

    function getAccount(address user) external view returns(address)
    {
        return listAccount.get(user);
    }
    function setListAccount(address _address) external isOwner
    {
        listAccount = ListAccount(_address);
    }


    function setFee(uint price ) external isOwner
    {
        fee = price;
    }

    function getFee() external view returns(uint) {
        return fee;
    }

    function withdraw() external isOwner {

        ownerPayable.transfer(address(this).balance);
    }

      function withdraw(uint amount) external isOwner {
          ownerPayable.transfer(amount);
    }

    function balance() external view returns(uint)
    {
        return address(this).balance;
    }

}