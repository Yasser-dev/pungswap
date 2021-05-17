pragma solidity >=0.4.22 <0.9.0;

import "./Token.sol";

contract PungSwap {
    string public name = "PungSwap instant exchange";
    Token public token;

    // Redemption rate -> 1 ether = 10000 pungcoin
    uint public rate = 10000;

    event TokensPurchased(
        address account,
        address token,
        uint amount,
        uint rate
    );

    event TokensSold(
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
        emit TokensPurchased(msg.sender, address(token), tokenAmount, rate);

    }

    function sellTokens(uint _amount) public{

        // user can's sell more tokens than they have
        require(token.balanceOf(msg.sender)>=_amount, "You do not have the amount you want to sell");
        // calculate the amount of ether to redeem
        uint etherAmount = _amount / rate;
         // assure there is enough ether balance in pungswap before transaction
        require(address(this).balance>=etherAmount, "There is no enough ether to complete the transaction");
        // perform sale
        token.transferFrom(msg.sender, address(this), _amount);
        msg.sender.transfer(etherAmount);     
        // Emit an event
        emit TokensSold(msg.sender, address(token), _amount, rate);
    }

}