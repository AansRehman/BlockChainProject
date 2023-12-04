// // SPDX-License-Identifier: MIT
// const Reports = artifacts.require("Reports");

// contract("Reports", (accounts) => {
//     let reportsInstance;

//     before(async () => {
//         reportsInstance = await Reports.deployed();
//     });

//     it("should upload a new report and retrieve it", async () => {
//         // Upload a new report
//         const reportName = "Test Report";
//         const reportFilePath = "/path/to/report";
//         await reportsInstance.uploadReport(reportName, reportFilePath);

//         // Get the report ID
//         const reportId = await reportsInstance.generateReportId();

//         // Retrieve the report
//         const [patientAddress, retrievedReportName, retrievedReportFilePath, uploadedAt] = await reportsInstance.getReport(reportId);

//         // Assertions
//         assert.equal(patientAddress, accounts[0], "Patient address should match");
//         assert.equal(retrievedReportName, reportName, "Report names should match");
//         assert.equal(retrievedReportFilePath, reportFilePath, "Report file paths should match");
//         assert.isAbove(uploadedAt, 0, "Uploaded timestamp should be greater than 0");
//     });
// });


// SPDX-License-Identifier: MIT
const Reports = artifacts.require("Reports");
const truffleAssert = require("truffle-assertions");

contract("Reports", (accounts) => {
    let reportsInstance;

    before(async () => {
        reportsInstance = await Reports.deployed();
    });

    it("should upload a new report and retrieve it", async () => {
        // Upload a new report
        const reportName = "Test Report";
        const reportFilePath = "server/uploads/1701521819534_Mid eval presentation.pdf";
        
        // Upload report and get the transaction receipt
        const receipt = await reportsInstance.uploadReport(reportName, reportFilePath);

        // Extract the reportId from the event in the transaction receipt
        const reportId = receipt.logs[0].args.reportId.toNumber();

        // Retrieve the report
        const [patientAddress, retrievedReportName, retrievedReportFilePath, uploadedAt] = await reportsInstance.getReport(reportId);

        // Assertions
        assert.equal(patientAddress, accounts[0], "Patient address should match");
        assert.equal(retrievedReportName, reportName, "Report names should match");
        assert.equal(retrievedReportFilePath, reportFilePath, "Report file paths should match");
        assert.isAbove(uploadedAt, 0, "Uploaded timestamp should be greater than 0");
    });
});
