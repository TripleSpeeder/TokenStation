import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import {setTokenBalance} from "./tokenBalanceActions"
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
        this.ERC20ContractInstance = await this.ERC20Contract.at(this.props.token.address)
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
         /*balance.toFixed(4)*/
        return (
            <span>{this.props.tokenBalance ? this.props.tokenBalance.balance.toFixed(4) : 'loading...'}</span>
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

const mapStateToProps = (state, ownProps) => ({
    web3: state.web3Instance.web3,
    queryAddress: state.queryAddress.address,
    token: state.tokens.byId[ownProps.tokenId],
    tokenBalance: state.balances.byToken[ownProps.tokenId],
})

const mapDispatchToProps = dispatch => ({
    setTokenBalance: (tokenId, balance) => {
        dispatch(setTokenBalance(tokenId, balance))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TokenBalanceContainer)
