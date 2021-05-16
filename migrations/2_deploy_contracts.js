const Token = artifacts.require("Token");
const PungSwap = artifacts.require("PungSwap");

module.exports = async function (deployer) {
  // Deploy Token
  await deployer.deploy(Token);
  const token = await Token.deployed();

  // Deploy Pungswap
  await deployer.deploy(PungSwap);
  const pungSwap = await PungSwap.deployed();

  // transfer all tokens to PungSwap
  await token.transfer(pungSwap.address, "1000000000000000000000000");
};
