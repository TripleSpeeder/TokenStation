import React, {Component} from 'react'
import {Checkbox, Container, Header} from 'semantic-ui-react'

import TokenListContainer from "./modules/token/TokenListContainer"
import QueryAddressFormContainer from "./modules/queryAddress/QueryAddressForm"
import Web3Container from "./modules/web3/web3Container"

import './App.css'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showEmpty: true,
        }
    }

    onCheckboxChange = (event, data) => {
        this.setState({showEmpty: data.checked})
    }

    render() {

        return <div className="App">
            <Container>
                <Header as='h1' block>
                    TokenStation
                </Header>
                <QueryAddressFormContainer/>
                <Checkbox label='show tokens with 0 balance'
                          onChange={this.onCheckboxChange}
                />
                <TokenListContainer
                                            showEmpty={this.state.showEmpty}
                                            address={this.state.address}
                /> :
                <Web3Container />
            </Container>
        </div>

    }
}

export default App
