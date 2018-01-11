import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {setBalanceByAddressAndToken} from './balanceActions'
import {Button} from 'semantic-ui-react'

class BalancesListContainer extends Component {
    constructor(props, context) {
        super(props, context)
    }

    handleClick = () => {
        let addressId=2
        let tokenId=0
        let balance=window.web3.toBigNumber(340)
        this.props.setBalanceByAddressAndToken(addressId, tokenId, balance)
    }

    render() {
        return (
            <list>
                <Button onClick={this.handleClick} label='test'/>
                {this.props.balanceIds.map((balanceId) => <li
                    key={balanceId}>{balanceId}
                    </li>)}
            </list>
        )
    }
}

BalancesListContainer.propTypes = {
    //myProp: PropTypes.object.isRequired
}

BalancesListContainer.defaultProps = {
    //myProp: <defaultValue>
}

const mapStateToProps = state => {

    let addressId=0
    let tokenId=0
    let testBalanceId=0

    return {
        balanceIds: state.balance.allBalances,
        testBalanceId
    }
}
    /*
    // create array of tokens that have a balance > 0 for current queryaddress
    const filteredTokens = Object.values(state.tokens.byId).filter(token => {
        // get all tokens that have a valid balance
        return (token.balance && (!token.balance.isZero() ))
    })
    // map tokens back to their tokenIDs
    const tokenIdsWithBalance = filteredTokens.map(token => (token.id))

    return {
        tokenIdsWithBalance
    }
    */


const mapDispatchToProps = dispatch => ({
    setBalanceByAddressAndToken: (addressId, tokenId, balance) => {
        dispatch(setBalanceByAddressAndToken(addressId, tokenId, balance))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(BalancesListContainer)
