const Voting = artifacts.require("VotingSystem");

module.exports = function (deployer) {
  deployer.deploy(Voting);
};
