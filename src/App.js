import React, {Component} from 'react'
import {Container, Header, Input, Item} from 'semantic-ui-react'
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import getWeb3 from './utils/getWeb3'
import contract from 'truffle-contract'
import erc20ABI from 'human-standard-token-abi'

import './App.css'
import TokenDescription from "./TokenDescription"
import ERC20ContractListContainer from "./ERC20ContractListContainer"

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            storageValue: 0,
            web3: null,
        }
    }

    componentDidMount() {
        // Get network provider and web3 instance.
        // See utils/getWeb3 for more info.

        getWeb3
            .then(results => {
                this.setState({
                    web3: results.web3
                })
            })
            .catch((e) => {
                console.log('Error finding web3:' + e)
            })
    }

    async instantiateERCContracts() {
        /*
            const ERC20Contract = contract({
                abi: erc20ABI
            })
            ERC20Contract.setProvider(this.state.web3.currentProvider)

            this.state.erc20Contracts.forEach(async (erc20Item) => {
                console.log("Getting contract instance for " + erc20Item.name)
                try {
                    let erc20Instance = await ERC20Contract.at(erc20Item.contract)
                    let name = await erc20Instance.name.call()
                    if (name) {
                        console.log("Got name: " + name)
                        erc20Item.dynamicData.name = name
                    } else {
                        console.log("Empty name :-(")
                    }
                    let symbol = await erc20Instance.symbol.call()
                    if (symbol) {
                        console.log("Got symbol: " + symbol)
                        erc20Item.dynamicData.symbol = symbol
                    } else {
                        console.log("Empty symbol :-(")
                    }
                    let totalSupply = await erc20Instance.totalSupply.call()
                    if (totalSupply) {
                        console.log("Got totalSupply: " + totalSupply)
                        erc20Item.dynamicData.totalSupply = totalSupply
                    } else {
                        console.log("Empty totalSupply :-(")
                    }
                }
                catch (e) {
                    console.log("Error!")
                    console.log(e)
                }
            })
            */
        /*
        //const simpleStorage = contract(SimpleStorageContract)
        //simpleStorage.setProvider(this.state.web3.currentProvider)

        // Declaring this for later so we can chain functions on SimpleStorage.
        var simpleStorageInstance

        // Get accounts.
        this.state.web3.eth.getAccounts((error, accounts) => {
            simpleStorage.deployed().then((instance) => {
                simpleStorageInstance = instance

                // Stores a given value, 5 by default.
                return simpleStorageInstance.set(5, {from: accounts[0]})
            }).then((result) => {
                // Get the value from the contract to prove it worked.
                return simpleStorageInstance.get.call(accounts[0])
            }).then((result) => {
                // Update state with the result.
                return this.setState({storageValue: result.c[0]})
            })
        })
        */
    }

    render() {

        return <div className="App">
            <Container>
                <Header as='h1' block>
                    TokenStation
                </Header>
                <Input fluid icon='diamond' iconPosition='left' placeholder='Address or ENS name'/>
                {this.state.web3 != null ? <ERC20ContractListContainer web3={this.state.web3}/> : <div>No web3!</div>}
            </Container>
        </div>

    }
}

export default App
