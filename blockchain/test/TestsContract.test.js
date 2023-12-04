// SPDX-License-Identifier: MIT
const TestsContract = artifacts.require("TestsContract");

contract("TestsContract", (accounts) => {
    let testsContractInstance;

    before(async () => {
        testsContractInstance = await TestsContract.deployed();
    });

    it("should add tests and retrieve test information", async () => {
        // Add tests
        const testName = "Blood Test";
        const testAge = 30;
        const testDate = await testsContractInstance.addTests(
            testName,
            testAge,
            ["Test1", "Test2"],
            "Prescription Details"
        );

        // Retrieve test count
        const testCount = await testsContractInstance.getTestsCount(accounts[0]);

        // Retrieve test information
        const [retrievedName, retrievedAge, retrievedDate, retrievedTests, retrievedPrescription] = await testsContractInstance.getTestInfo(
            accounts[0],
            testCount - 1 // Assuming the most recent test is at index testCount - 1
        );

        // Assertions
        assert.equal(retrievedName, testName, "Test names should match");
        assert.equal(retrievedAge, testAge, "Test ages should match");
        assert.isAbove(retrievedDate, 0, "Test date should be greater than 0");
        assert.deepEqual(retrievedTests, ["Test1", "Test2"], "Test names should match");
        assert.equal(retrievedPrescription, "Prescription Details", "Prescription details should match");
    });
});
