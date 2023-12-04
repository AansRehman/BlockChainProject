// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Reports {
    // Structure to represent a patient report
    struct Report {
        address patientAddress;
        string reportName;
        string reportFilePath; // In a real-world scenario, you might want to use IPFS or another decentralized storage system
        uint256 uploadedAt;
    }

    // Mapping to store patient reports
    mapping(uint256 => Report) public reports;

    // Event emitted when a new report is uploaded
    event ReportUploaded(
        uint256 indexed reportId,
        address indexed patientAddress,
        string reportName,
        string reportFilePath,
        uint256 uploadedAt
    );

    // Function to upload a new patient report
    function uploadReport(
        string memory _reportName,
        string memory _reportFilePath
    ) public {
        uint256 reportId = generateReportId();

        require(
            reports[reportId].patientAddress == address(0),
            "Report with this ID already exists"
        );

        reports[reportId] = Report({
            patientAddress: msg.sender,
            reportName: _reportName,
            reportFilePath: _reportFilePath,
            uploadedAt: block.timestamp
        });

        emit ReportUploaded(
            reportId,
            msg.sender,
            _reportName,
            _reportFilePath,
            block.timestamp
        );
    }

    // Function to get a patient report by ID
    function getReport(
        uint256 _reportId
    ) public view returns (address, string memory, string memory, uint256) {
        Report storage report = reports[_reportId];
        return (
            report.patientAddress,
            report.reportName,
            report.reportFilePath,
            report.uploadedAt
        );
    }

    // Internal function to generate a unique reportId
    function generateReportId() internal view returns (uint256) {
        return
            uint256(
                keccak256(
                    abi.encodePacked(
                        msg.sender,
                        block.number,
                        blockhash(block.number - 1)
                    )
                )
            );
    }
}
