import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Token from "./Token"
import erc20ABI from "human-standard-token-abi"
import contract from "truffle-contract"
import {connect} from "react-redux"
import {setTokenSupply} from "./tokenActions"


class TokenContainer extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            loading: false,
        }
        // prepare ERC20 contract abstraction
        this.ERC20Contract = contract({abi: erc20ABI})
        this.ERC20Contract.setProvider(this.props.web3.currentProvider)
        this.ERC20ContractInstance = null

        this.getTokenSupply = this.getTokenSupply.bind(this)
    }

    async componentDidMount() {
        // get contract instance for token
        this.setState({loading: true})
        this.ERC20ContractInstance = await this.ERC20Contract.at(this.props.token.address)
        this.getTokenSupply()
    }

    async getTokenSupply() {
        this.setState({ loading: true })
        let supply = await this.ERC20ContractInstance.totalSupply()
        this.props.setTokenSupply(this.props.token.id, supply)

        /*
        this.setState({ supply: supply })
        if (this.props.address) {
            let balance = await this.ERC20ContractInstance.balanceOf(this.props.token.address)
            this.setState({balance: balance})
        }
        this.setState({ loading: false})*/
    }
    /*
    async getBalance(address) {
        if (address) {
            this.setState({ loading: true })
            let balance = await this.ERC20ContractInstance.balanceOf(address)
            this.setState({balance: balance})
            this.setState({ loading: false })
        }
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.address !== this.props.address){
            this.getBalance(nextProps.address)
        }
    }
    */

    render() {
        if (this.props.showEmpty) {
            return <Token token={this.props.token}
                          handleRefresh={this.getTokenSupply}/>
        } else {
            if (!this.state.balance.isZero()){
                return <Token token={this.props.token}
                              handleRefresh={this.getTokenSupply}
                />
            }
            else
                return null
        }
        /*
        const {name} = this.props.token
        return (
            <div>
                Token: {name}
            </div>
        )
         */
    }
}

TokenContainer.propTypes = {
    //myProp: PropTypes.object.isRequired
    tokenId: PropTypes.number.isRequired,
}

TokenContainer.defaultProps = {
    //myProp: <defaultValue>
}

const mapStateToProps = (state, ownProps) => ({
    web3: state.web3Instance.web3,
    address: state.queryAddress.address,
    token: state.tokens.byId[ownProps.tokenId]
})

const mapDispatchToProps = dispatch => ({
    setTokenSupply: (tokenID, supply) => {
        dispatch(setTokenSupply(tokenID, supply))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TokenContainer)