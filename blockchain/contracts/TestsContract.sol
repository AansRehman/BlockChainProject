// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract TestsContract {
    struct Test {
        string name;
        uint256 age;
        uint256 date;
        string[] tests;
        string prescription;
    }

    mapping(address => Test[]) public patientTests;

    event TestsAdded(
        address indexed patientAddress,
        string name,
        uint256 age,
        uint256 date,
        string[] tests,
        string prescription
    );

    function addTests(
        string memory _name,
        uint256 _age,
        string[] memory _tests,
        string memory _prescription
    ) public {
        require(bytes(_name).length > 0, "Name is required");
        require(_age > 0, "Age must be greater than 0");
        require(_tests.length > 0, "At least one test must be provided");

        Test memory newTest = Test({
            name: _name,
            age: _age,
            date: block.timestamp,
            tests: _tests,
            prescription: _prescription
        });

        patientTests[msg.sender].push(newTest);

        emit TestsAdded(
            msg.sender,
            _name,
            _age,
            block.timestamp,
            _tests,
            _prescription
        );
    }

    function getTestsCount(
        address patientAddress
    ) public view returns (uint256) {
        return patientTests[patientAddress].length;
    }

    function getTestInfo(
        address patientAddress,
        uint256 index
    )
        public
        view
        returns (
            string memory name,
            uint256 age,
            uint256 date,
            string[] memory tests,
            string memory prescription
        )
    {
        Test storage patientTest = patientTests[patientAddress][index];
        return (
            patientTest.name,
            patientTest.age,
            patientTest.date,
            patientTest.tests,
            patientTest.prescription
        );
    }
}
