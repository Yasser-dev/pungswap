pragma solidity >=0.4.22 <0.9.0;

import "./Token.sol";

contract PungSwap {
    string public name = "PungSwap instant exchange";
    Token public token;

    // Redemption rate -> 1 ether = 10000 pungcoin
    uint public rate = 10000;

    event TokenPurchased(
        address account,
        address token,
        uint amount,
        uint rate
    );

    constructor(Token _token) public{
        token = _token;
    }

    function buyTokens() public payable{
        // eth amount × redemption rate
        uint tokenAmount = msg.value * rate; // # of tokens to buy
        // assure there is enough balance in pungswap before transaction
        require(token.balanceOf(address(this))>=tokenAmount, "There are no enough tokens to buy");
        // transfer tokens to user
        token.transfer(msg.sender, tokenAmount);
        // Emit an event
        emit TokenPurchased(msg.sender, address(token), tokenAmount, rate);

    }

}