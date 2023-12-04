// migrations/2_deploy_contracts.js
const UserContract = artifacts.require("UserContract");

module.exports = function(deployer) {
  deployer.deploy(UserContract);
};
