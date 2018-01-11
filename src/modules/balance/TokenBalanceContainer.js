import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import {setBalance} from "./balanceActions"
import erc20ABI from "human-standard-token-abi"
import contract from "truffle-contract"

class TokenBalanceContainer extends Component {
    constructor(props, context) {
        super(props, context)

        // prepare ERC20 contract abstraction
        this.ERC20Contract = contract({abi: erc20ABI})
        this.ERC20Contract.setProvider(this.props.web3.currentProvider)
        this.ERC20ContractInstance = null
    }

    async componentDidMount() {
        // get contract instance for token
        this.ERC20ContractInstance = await this.ERC20Contract.at(this.props.tokenAddress)
        this.getTokenBalance(this.props.queryAddress)
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.queryAddress !== this.props.queryAddress){
            this.getTokenBalance(nextProps.queryAddress)
        }
    }

    async getTokenBalance(address) {
        if (address){
            let balance = await this.ERC20ContractInstance.balanceOf(address)
            this.props.setTokenBalance(this.props.tokenId, balance)
        }
    }

    render() {
        return (
            <span>{this.props.tokenBalance ? this.props.tokenBalance.toFixed(4) : ''}</span>
        )
    }
}

TokenBalanceContainer.propTypes = {
    //myProp: PropTypes.object.isRequired
    tokenId: PropTypes.number.isRequired,
}

TokenBalanceContainer.defaultProps = {
    //myProp: <defaultValue>
}

const mapStateToProps = (state, ownProps) => {
    let tokenBalances = state.balances.byToken[ownProps.tokenId]
    let tokenBalance = tokenBalances ? tokenBalances.balance : null
    return {
        web3: state.web3Instance.web3,
        queryAddress: state.queryAddress.address,
        tokenAddress: state.tokens.byId[ownProps.tokenId].address,
        tokenBalance: tokenBalance,
    }
}

const mapDispatchToProps = dispatch => ({
    setTokenBalance: (addressId, tokenId, balance) => {
        dispatch(setBalance(addressId, tokenId, balance))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TokenBalanceContainer)
