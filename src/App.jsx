import "./App.css";
import React from "react";
import Web3 from "web3";
import Navbar from "./components/Navbar";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      ethBalance: "0",
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

    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    const ethBalance = await web3.eth.getBalance(this.state.account);
    this.setState({ ethBalance });
  }
  render() {
    console.log(this.state.ethBalance);
    return (
      <div>
        <Navbar account={this.state.account} />
      </div>
    );
  }
}
export default App;
