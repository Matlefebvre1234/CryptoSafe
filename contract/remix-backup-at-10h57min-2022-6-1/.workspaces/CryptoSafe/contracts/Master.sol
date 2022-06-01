// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.14;

import "./Owner.sol";
import "./Account.sol";

contract Master is Owner {

    uint fee;
    mapping(address => address) public listAccount;


    function createAccount(address user) external 
    {
           listAccount[user] = address(new Account(user, owner));  
    }


    function setFee(uint price ) external
    {
        fee = price;
    }

}