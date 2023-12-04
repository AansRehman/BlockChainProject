// migrations/2_deploy_contracts.js
const Reports = artifacts.require("Reports");

module.exports = function(deployer) {
  deployer.deploy(Reports);
};
