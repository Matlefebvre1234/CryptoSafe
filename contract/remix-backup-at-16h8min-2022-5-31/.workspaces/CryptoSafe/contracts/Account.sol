// SPDX-License-Identifier: UNLICENDED
pragma solidity 0.8.14;

import "./Owner.sol";
contract Account is Owner {


    Password[] public listPassword;
    address masterContract;
    address admin;

    struct Password {
        uint256 id;
        string name;
        string password;
    }

    modifier isAdmin {
        require(msg.sender == admin);
        _;
    }


    constructor(address _admin)
    {
        admin = _admin;
    }


    function setAdmin(address _admin) public isAdmin
    {
        admin = _admin;
    }

    function setMasterContract(address _address) public isAdmin
    {
        masterContract = _address;
    }

    function addPassword(uint256 id, string memory name, string memory password) public isOwner{    
        listPassword.push(Password(id, name, password));
    }

    function deletePassword(uint256 id) public isOwner
    {
        delete listPassword[id] ;
    }

    function getlistPassword() public view isOwner returns(Password[] memory)
    {
        return listPassword;
    }

    


}