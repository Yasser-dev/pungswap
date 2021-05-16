const { assert } = require("chai");

const Token = artifacts.require("Token");
const PungSwap = artifacts.require("PungSwap");

require("chai").use(require("chai-as-promised")).should();

// helper function to convert normal number of tokens to wei
function tokens(n) {
  return web3.utils.toWei(n, "ether");
}

contract("PungSwap", () => {
  let token, pungSwap;
  before(async () => {
    token = await Token.new();
    pungSwap = await PungSwap.new();

    // transfer all tokens to PungSwap
    await token.transfer(pungSwap.address, tokens("1000000"));
  });

  describe("Token Deployment", async () => {
    it("contract has a name", async () => {
      const name = await token.name();
      assert.equal(name, "Pungcoin");
    });
  });

  describe("PungSwap Deployment", async () => {
    it("contract has a name", async () => {
      const name = await pungSwap.name();
      assert.equal(name, "PungSwap instant exchange");
    });

    it("contract has tokens", async () => {
      let balance = await token.balanceOf(pungSwap.address);
      assert.equal(balance.toString(), tokens("1000000"));
    });
  });
});
