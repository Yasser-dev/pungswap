const { assert } = require("chai");

const Token = artifacts.require("Token");
const PungSwap = artifacts.require("PungSwap");

require("chai").use(require("chai-as-promised")).should();

// helper function to convert normal number of tokens to wei
function tokens(n) {
  return web3.utils.toWei(n, "ether");
}

contract("PungSwap", ([deployer, investor]) => {
  let token, pungSwap;

  before(async () => {
    token = await Token.new();
    pungSwap = await PungSwap.new(token.address);

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

  describe("buy tokens", async () => {
    let result;
    before(async () => {
      // purchase tokens
      result = await pungSwap.buyTokens({
        from: investor,
        value: web3.utils.toWei("1", "ether"),
      });
    });

    it("Allows user to buy tokens from PungSwap for a fixed price", async () => {
      //check if the investor recieves tokens
      let investorBalance = await token.balanceOf(investor);
      assert.equal(investorBalance.toString(), tokens("10000"));

      // check pungSwap pungcoin balance after purchase
      let pungSwapBalance = await token.balanceOf(pungSwap.address);
      assert.equal(pungSwapBalance.toString(), tokens("990000"));

      // check pungSwap ether balance after purchase
      pungSwapBalance = await web3.eth.getBalance(pungSwap.address);
      assert.equal(pungSwapBalance.toString(), web3.utils.toWei("1", "ether"));

      // check logs to ensure event was emitted correctly
      const event = result.logs[0].args;
      assert.equal(event.account, investor);
      assert.equal(event.token, token.address);
      assert.equal(event.amount.toString(), tokens("10000").toString());
      assert.equal(event.rate, "10000");
    });
  });

  describe("sell tokens", async () => {
    let result;
    before(async () => {
      // sell tokens
      await token.approve(pungSwap.address, tokens("10000"), {
        from: investor,
      });
      result = await pungSwap.sellTokens(tokens("10000"), { from: investor });
    });

    it("Allows user to sell tokens from PungSwap for a fixed price", async () => {
      // check investor balance after purchase
      let investorBalance = await token.balanceOf(investor);
      assert.equal(investorBalance.toString(), tokens("0"));

      // check pungSwap pungcoin balance after purchase
      let pungSwapBalance = await token.balanceOf(pungSwap.address);
      assert.equal(pungSwapBalance.toString(), tokens("1000000"));

      // check pungSwap ether balance after purchase
      pungSwapBalance = await web3.eth.getBalance(pungSwap.address);
      assert.equal(pungSwapBalance.toString(), web3.utils.toWei("0", "ether"));

      // check logs to ensure event was emitted correctly
      const event = result.logs[0].args;
      assert.equal(event.account, investor);
      assert.equal(event.token, token.address);
      assert.equal(event.amount.toString(), tokens("10000").toString());
      assert.equal(event.rate, "10000");

      // Fail if investor tries to sell more tokens than they have
      await pungSwap.sellTokens(tokens("50000"), { from: investor }).should.be
        .rejected;
    });
  });
});
