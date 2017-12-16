import React, {Component} from 'react'
import {
    Card, Container, Divider, Header, Icon, Image, Input, Item, Label, List, Segment,
    Table, Grid
} from 'semantic-ui-react'
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import getWeb3 from './utils/getWeb3'

import './App.css'
import TokenDescription from "./TokenDescription"

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            storageValue: 0,
            web3: null
        }
    }

    componentWillMount() {
        // Get network provider and web3 instance.
        // See utils/getWeb3 for more info.

        getWeb3
            .then(results => {
                this.setState({
                    web3: results.web3
                })

                // Instantiate contract once web3 provided.
                this.instantiateContract()
            })
            .catch(() => {
                console.log('Error finding web3.')
            })
    }

    instantiateContract() {
        /*
         * SMART CONTRACT EXAMPLE
         *
         * Normally these functions would be called in the context of a
         * state management library, but for convenience I've placed them here.
         */

        const contract = require('truffle-contract')
        const simpleStorage = contract(SimpleStorageContract)
        simpleStorage.setProvider(this.state.web3.currentProvider)

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
    }

    render() {
        const dummies = [
            {
                name: 'OmiseGo',
                symbol: 'OMG',
                description: 'OmiseGO (OMG) is a public Ethereum-based financial technology for use in mainstream digital wallets',
                website: 'https://omisego.network/',
                imageUrl: 'https://eidoo.io/wp-content/uploads/tokens/omisego.png',
                decimals: 18,
                supply: 25000000,
                contract: '0xAef38fBFBF932D1AeF3B808Bc8fBd8Cd8E1f8BC5',
            },
            {
                name: 'EOS',
                symbol: 'EOS',
                description: 'Infrastructure for Decentralized Applications',
                website: 'https://omisego.network/',
                imageUrl: 'https://eidoo.io/wp-content/uploads/tokens/omisego.png',
                decimals: 18,
                supply: 12345679,
                contract: '0xAef38fBFBF932D1AeF3B808Bc8fBd8Cd8E1f8BC5',
            }
        ]

        let items = []
        dummies.forEach((token) => {
            items.push(<TokenDescription token={token}/>)
        })

        return <div className="App">
            <Container>
                <Header as='h1' block>
                    TokenStation
                </Header>
                <Input fluid icon='diamond' iconPosition='left' placeholder='Address or ENS name'/>
                <Item.Group>
                    {items}
                </Item.Group>
            </Container>
        </div>

    }
}

export default App
