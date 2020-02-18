import React, {Component} from 'react';
import Web3 from 'web3';
import './App.css';
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from './config.js'


class App extends Component {

    componentDidMount(){
      this.loadBlockchainData();
    }


    async loadBlockchainData(){
      //const ethereum = window.ethereum;
      //const enabledWeb3 = await ethereum.enable();

      const web3 = new Web3(Web3.givenProvider)
      const accounts = await web3.eth.getAccounts()
      console.log(accounts[0])

      this.setState({
        account:accounts[0],
      });
      const todoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS)
      this.setState({
        todoList
      })
      const taskCount = await todoList.methods.taskCount().call()
      this.setState({
        taskCount
      })
      console.log('taskCount',todoList)

    }

    constructor(props){
        super(props);
        this.state = {
          account: '',
          taskCount: 0,
        }
    }

    render(){
        return (
          <div className="container">
            <h1>Hello Boss</h1>
            <p>Task Count {this.state.taskCount}</p>
          </div>
        );
      }
    }

export default App;
