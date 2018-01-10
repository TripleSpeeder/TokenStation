import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {initialize} from '../token/tokenActions'

class BalancesListContainer extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <list>
                {this.props.balanceIds.map((balanceId) => <li key={balanceId}>{balanceId}</li>)}
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

const mapStateToProps = state => (
    {
        balanceIds: state.balance.allBalances
    }
)
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
})

export default connect(mapStateToProps, mapDispatchToProps)(BalancesListContainer)
