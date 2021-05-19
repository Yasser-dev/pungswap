# PungSwap

<!-- PROJECT LOGO -->
<br />
<p align="center">
        <img src="src/assets/pungswap.png" alt="Logo"  height="300">
</p>

## Description

PungSwap is an ethereum exchange platform that is used to swap a ERC20 token called Pungcoin. Pungcoin is a cryptocurrency named after pungsan dog breed. Pungswap is used to swap ether for pungcoin or vice versa.

<p align="center">
        <img src="src/assets/pungcoin.png" alt="pungcoin"  height="200">
</p>

## Built With

- [React](https://reactjs.org/)
- [Tailwindcss](https://tailwindcss.com/)
- [Solidity](https://docs.soliditylang.org/en/v0.8.4)
- [Truffle](https://www.trufflesuite.com/truffle)
- [Web3.js](https://web3js.readthedocs.io/en/v1.3.4/)

## Screenshots

![swap process](./screenshots/swap.gif)
![swap process](./screenshots/idle.png)
![swap process](./screenshots/idle-1.jpeg)
![swap process](./screenshots/idle-2.jpeg)
![swap process](./screenshots/idle-3.jpeg)
![swap process](./screenshots/idle-4.jpeg)
![swap process](./screenshots/buypung.png)
![swap process](./screenshots/sellpung-approve.png)
![swap process](./screenshots/sellpung-confirm.png)

## Prerequisites

- [Node](https://nodejs.org/en/) (and npm)
- [Ganache](https://www.trufflesuite.com/ganache)
- [MetaMask](https://metamask.io/)

## Development server

navigate into the root folder and run:

- install dependencies
  ```sh
  npm i
  ```
- install truffle
  ```sh
  npm i truffle
  ```
- open ganache

- run truffle migrations
  ```sh
  truffle migrate --reset
  ```
- run react development server
  ```sh
  npm start
  ```
