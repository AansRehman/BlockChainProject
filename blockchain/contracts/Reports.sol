// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HealthCare {
    // Structure to represent a patient report
    struct Report {
        address patientAddress;
        string patientName;
        string reportFileHash; // In a real-world scenario, you might want to use IPFS or another decentralized storage system
        uint256 uploadedAt;
    }

    // Mapping to store patient reports
    mapping(uint256 => Report) public reports;

    // Event emitted when a new report is uploaded
    event ReportUploaded(
        uint256 indexed reportId,
        address indexed patientAddress,
        string patientName,
        string reportFileHash,
        uint256 uploadedAt
    );

    // Function to upload a new patient report
    function uploadReport(
        string memory _patientName,
        string memory _reportFileHash
    ) public {
        uint256 reportId = uint256(
            keccak256(abi.encodePacked(msg.sender, block.timestamp))
        );

        reports[reportId] = Report({
            patientAddress: msg.sender,
            patientName: _patientName,
            reportFileHash: _reportFileHash,
            uploadedAt: block.timestamp
        });

        emit ReportUploaded(
            reportId,
            msg.sender,
            _patientName,
            _reportFileHash,
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
            report.patientName,
            report.reportFileHash,
            report.uploadedAt
        );
    }
}
