import React from "react";
import Web3 from "web3";
import Navbar from "./components/Navbar";

import PungSwap from "./abis/PungSwap.json";
import Token from "./abis/Token.json";
import Loader from "./components/Loader";
import Main from "./components/Main";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: {},
      pungSwap: {},
      account: "",
      ethBalance: "0",
      pungBalance: "0",
      loading: false,
    };
  }

  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non ethereum browser detected, you should consider using MetaMask!"
      );
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;

    //load account
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    //load account ether balance
    const ethBalance = await web3.eth.getBalance(this.state.account);
    this.setState({ ethBalance });

    const networkId = await web3.eth.net.getId();

    //load token
    const tokenNetwork = Token.networks[networkId];
    if (tokenNetwork) {
      const token = new web3.eth.Contract(Token.abi, tokenNetwork.address);
      this.setState({ token });

      // load account's pungcoin balance
      let pungBalance = await token.methods
        .balanceOf(this.state.account)
        .call();
      this.setState({ pungBalance: pungBalance.toString() });
    } else {
      window.alert("Contract is not deployed to detected network.");
    }

    //load PungSwap
    const pungSwapNetwork = PungSwap.networks[networkId];
    if (pungSwapNetwork) {
      const pungSwap = new web3.eth.Contract(
        Token.abi,
        pungSwapNetwork.address
      );
      this.setState({ pungSwap });
    } else {
      window.alert("PungSwap Contract is not deployed to detected network.");
    }
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="flex justify-center p-10 ">
          {this.state.loading ? (
            <Loader />
          ) : (
            <Main
              ethBalance={this.state.ethBalance}
              pungBalance={this.state.pungBalance}
            />
          )}
        </div>
      </div>
    );
  }
}
export default App;
