import React, {Component} from 'react'
import {connect} from 'react-redux'
import {BALANCE_STATES, setBalanceByAddressAndToken} from './balanceActions'
import BalancesList from './BalancesList'
import groupBy from 'lodash/groupBy';
import {ADDRESS_BALANCES_STATES} from '../address/addressActions'
import {loadTokenBalance} from '../token/tokenActions'

class BalancesListContainer extends Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            loadingStarted: false
        }
    }

    componentDidMount() {
        this.checkResumeLoading(this.props)
    }

    componentWillReceiveProps(newProps) {
        this.checkResumeLoading(newProps)
    }

    checkResumeLoading(props) {
        // in case address balance was in loading state while hydrating, continue loading
        if (!this.state.loadingStarted && props.web3) {
            this.setState({
                loadingStarted: true
            })
            props.loadingBalances.forEach(balanceEntry => {
                console.log("Continue loading balance for " + balanceEntry.balanceId)
                props.loadTokenBalance(balanceEntry.tokenId, balanceEntry.addressId)
            })
        }
    }

    render() {
        return (
            <BalancesList balancesByToken={this.props.balancesByToken}/>
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

    // all currently watched addressIds
    const addressIds = Object.keys(state.addresses.byId)
    // all positive balance IDs
    const positiveBalanceIds = state.balance.positiveIds
    // all balances that are in state "loading"
    const loadingBalances = Object.values(state.balance.byId).filter(balanceEntry => {
        return balanceEntry.balanceState === BALANCE_STATES.LOADING
    })
    // all tokenIds
    let tokenIds = state.tokens.allIds

    const filterIsActive = (state.tokens.listState.filter.length > 0)
    if (filterIsActive)
        tokenIds = state.tokens.listState.matchedTokenIds

    // all BalanceEntries with positive balance
    const positiveBalances = positiveBalanceIds.map(id => state.balance.byId[id])

    // now search positiveBalances that match the watched addresses and the token filter
    const matchedBalances = Object.values(positiveBalances).filter(balanceEntry => {
        return (
            (addressIds.indexOf(balanceEntry.addressId) > -1) &&
            (tokenIds.indexOf(balanceEntry.tokenId) > -1)
        )
    })

    // now group the balances by token
    const balancesByToken = groupBy(matchedBalances, 'tokenId')

    return {
        web3: state.web3Instance.web3,
        balancesByToken,
        loadingBalances
    }
}

const mapDispatchToProps = dispatch => ({
    setBalanceByAddressAndToken: (addressId, tokenId, balance) => {
        dispatch(setBalanceByAddressAndToken(addressId, tokenId, balance))
    },
    loadTokenBalance: (tokenId, addressId) => {
        dispatch(loadTokenBalance(tokenId, addressId))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(BalancesListContainer)
