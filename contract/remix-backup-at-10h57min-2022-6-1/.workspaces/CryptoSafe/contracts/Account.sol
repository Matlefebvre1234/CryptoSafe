// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.14;


import "./Owner.sol";

contract Account {

    address public  owner;
    Password[] public listPassword;
    address public masterContract;
    address public admin;

    struct Password {
        uint256 id;
        string name;
        string password;
    }

    modifier isAdmin {
        require(msg.sender == admin);
        _;
    }

    modifier isOwnByUser
    {
        require(msg.sender == owner);
        _;
    }
    constructor(address _owner,address _admin )
    {
        admin = _admin;
        owner = _owner;
        masterContract = msg.sender;
    }


    function setAdmin(address _admin) public isAdmin
    {
        admin = _admin;
    }

    function setMasterContract(address _address) public isAdmin
    {
        masterContract = _address;
    }

    function addPassword(uint256 id, string memory name, string memory password) public isOwnByUser{    
        listPassword.push(Password(id, name, password));
    }

    function deletePassword(uint256 id) public isOwnByUser
    {
   
       for(uint i = 0 ; i < listPassword.length ; i++ )
        {
            if(listPassword[i].id == id) delete listPassword[i]; 
        }
    }

      function updatePassword(uint256 id, string memory name ,string memory password) public isOwnByUser
    {
   
       for(uint i = 0 ; i < listPassword.length ; i++ )
        {
            if(listPassword[i].id == id)
            {
                listPassword[i].name = name;
                listPassword[i].password = password;
            } 
        }
    }

    function getlistPassword() public view isOwnByUser returns(Password[] memory)
    {
        return listPassword;
    }

    


}