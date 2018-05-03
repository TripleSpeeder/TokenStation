import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {
    ADDRESS_BALANCES_STATES, removeAddress, resumeGetBalances
} from './addressActions'
import {BALANCE_STATES} from '../balance/balanceActions'
import AddressRow from './AddressRow'


class AddressContainer extends PureComponent {

    constructor(props, context) {
        super(props, context)
        this.state = {
            resumedAfterRehydrate: false
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
        if ((props.balancesState === ADDRESS_BALANCES_STATES.HYDRATED_WHILE_LOADING) &&
            (!this.state.resumedAfterRehydrate)) {
            this.setState({
                resumedAfterRehydrate: true
            })
            console.log("Continue loading balances for " + props.address)
            props.resumeGetBalances(props.addressId, props.progressCurrent)
        }
    }

    handleRemove = () => {
        this.props.removeAddress(this.props.addressId)
    }

    render() {
        return <AddressRow address={this.props.address}
                           addressType={this.props.addressType}
        />
    }
}

AddressContainer.propTypes = {
    addressId: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    removeAddress: PropTypes.func.isRequired,
    iconName: PropTypes.string.isRequired,
    canRemove: PropTypes.bool.isRequired,
    progressTotal: PropTypes.number.isRequired,
    progressCurrent: PropTypes.number.isRequired
}

AddressContainer.defaultProps = {}

const mapStateToProps = (state, ownProps) => {
    const addressEntry = state.addresses.byId[ownProps.addressId]
    const progressTotal = state.tokens.listState.total
    // count all balance entries that include addressId
    const matchedBalanceEntries = Object.values(state.balance.byId).filter(entry => {
        return ((entry.addressId === ownProps.addressId) &&
            (entry.balanceState === BALANCE_STATES.INITIALIZED))
    })
    const progressCurrent = matchedBalanceEntries.length

    return {
        address: addressEntry.address,
        addressType: addressEntry.type,
        balancesState: addressEntry.balancesState,
        progressTotal,
        progressCurrent
    }
}

const mapDispatchToProps = dispatch => ({
    removeAddress: (addressId) => {
        dispatch(removeAddress(addressId))
    },
    resumeGetBalances: (addressId, startIndex) => {
        dispatch(resumeGetBalances(addressId, startIndex))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddressContainer)
