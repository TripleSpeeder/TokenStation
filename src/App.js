import React, {Component} from 'react'
import {Checkbox, Container, Header, Input, Item} from 'semantic-ui-react'
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import getWeb3 from './utils/getWeb3'
import contract from 'truffle-contract'
import erc20ABI from 'human-standard-token-abi'

import './App.css'
import ERC20ContractListContainer from "./ERC20ContractListContainer"
import QueryAddressFormContainer from "./QueryAddressForm"

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            storageValue: 0,
            web3: null,
            showEmpty: true,
            address: '',
        }

        // this.onCheckboxChange = this.onCheckboxChange.bind(this)
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

    onCheckboxChange = (event, data) => {
        this.setState({showEmpty: data.checked})
    }

    onAddressSelected = (address) => {
        this.setState({address: address})
    }

    render() {

        return <div className="App">
            <Container>
                <Header as='h1' block>
                    TokenStation
                </Header>
                <QueryAddressFormContainer onAddressSelected={this.onAddressSelected}/>
                <Checkbox label='show tokens with 0 balance'
                          onChange={this.onCheckboxChange}
                />
                {
                    this.state.web3 != null ?
                        <ERC20ContractListContainer web3={this.state.web3}
                                                    showEmpty={this.state.showEmpty}
                                                    address={this.state.address}
                        /> :
                        <div>No web3!</div>
                }
            </Container>
        </div>

    }
}

export default App
