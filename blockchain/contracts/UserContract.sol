// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract UserContract {
    struct User {
        string name;
        string email;
        string gender;
        uint256 age;
        string role;
        uint256 createdAt;
    }

    mapping(address => User) public users;

    event UserRegistered(
        address indexed userAddress,
        string name,
        string email,
        string gender,
        uint256 age,
        string role,
        uint256 createdAt
    );

    function registerUser(
        string memory _name,
        string memory _email,
        string memory _gender,
        uint256 _age,
        string memory _role
    ) public {
        require(bytes(_name).length > 0, "Name is required");
        require(bytes(_email).length > 0, "Email is required");

        // You might want to add more validation for other fields

        User storage newUser = users[msg.sender];
        newUser.name = _name;
        newUser.email = _email;
        newUser.gender = _gender;
        newUser.age = _age;
        newUser.role = _role;
        newUser.createdAt = block.timestamp;

        emit UserRegistered(
            msg.sender,
            _name,
            _email,
            _gender,
            _age,
            _role,
            block.timestamp
        );
    }

    function getUserInfo(
        address userAddress
    )
        public
        view
        returns (
            string memory name,
            string memory email,
            string memory gender,
            uint256 age,
            string memory role,
            uint256 createdAt
        )
    {
        User storage user = users[userAddress];
        return (
            user.name,
            user.email,
            user.gender,
            user.age,
            user.role,
            user.createdAt
        );
    }
}
