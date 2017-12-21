import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {Checkbox, Container, Header, Input, Item} from 'semantic-ui-react'

import getWeb3 from './utils/getWeb3'

import ERC20ContractListContainer from "./ERC20ContractListContainer"
import QueryAddressFormContainer from "./QueryAddressForm"

import './App.css'
import {connect} from "react-redux"
import {setWeb3Instance} from "./actions"

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showEmpty: true,
        }
    }

    componentDidMount() {
        // Get network provider and web3 instance.
        // See utils/getWeb3 for more info.

        // Todo: Make getWeb3 a proper redux component
        getWeb3
            .then(results => {
                this.props.web3Initialized(results.web3)
            })
            .catch((e) => {
                console.log('Error finding web3:' + e)
            })
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
                {
                    this.props.web3 != null ?
                        <ERC20ContractListContainer web3={this.props.web3}
                                                    showEmpty={this.state.showEmpty}
                                                    address={this.state.address}
                        /> :
                        <div>No web3!</div>
                }
            </Container>
        </div>

    }
}

const mapStateToProps = state => ({
    web3: state.web3Instance.web3
})

const mapDispatchToProps = dispatch => ({
    web3Initialized: (web3) => {
        dispatch(setWeb3Instance(web3))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
