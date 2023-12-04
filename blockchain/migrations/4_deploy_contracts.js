// migrations/2_deploy_contracts.js
const TestsContract = artifacts.require("TestsContract");

module.exports = function(deployer) {
  deployer.deploy(TestsContract);
};
