// SPDX-License-Identifier: MIT
const UserContract = artifacts.require("UserContract");

contract("UserContract", (accounts) => {
    let userContractInstance;

    before(async () => {
        userContractInstance = await UserContract.deployed();
    });

    it("should register a new user and retrieve user information", async () => {
        // Register a new user
        const userName = "John Doe";
        const userEmail = "john@example.com";
        const userGender = "Male";
        const userAge = 25;
        const userRole = "Patient";

        await userContractInstance.registerUser(userName, userEmail, userGender, userAge, userRole);

        // Retrieve user information
        const userAddress = accounts[0];
        const userInfo = await userContractInstance.getUserInfo(userAddress);

        // Assertions
        assert.equal(userInfo.name, userName, "User names should match");
        assert.equal(userInfo.email, userEmail, "User emails should match");
        assert.equal(userInfo.gender, userGender, "User genders should match");
        assert.equal(userInfo.age, userAge, "User ages should match");
        assert.equal(userInfo.role, userRole, "User roles should match");
        assert.isAbove(userInfo.createdAt, 1701703854, "Created timestamp should be greater than 0");
    });
});
