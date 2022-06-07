// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.14;

import "./Owner.sol";
import "./Account.sol";
import "./Master.sol";
contract ListAccount is Owner{

    mapping(address => address) public listAccount;
    Master public masterContract;

    modifier isMasterContract
    {
        require(msg.sender == address(masterContract));
        _;
    }

    function setMasterContract(address payable user) public isOwner{
        masterContract = Master(user);
    }

    function get(address user) external view isMasterContract returns(address) {
        return listAccount[user];
    }

       function set(address user, address account) external isMasterContract {
        listAccount[user] = account;
    }
}