import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {ADDRESS_TYPE_EXTERNAL, ADDRESS_TYPE_OWNED, changeOwnAddresses} from './addressActions'
import AddressList from './AddressList'
import {ETH_ENABLE_STATES, requestEthEnable} from '../web3/web3Actions'

class AddressListContainer extends Component {
    constructor(props, context) {
        super(props, context)
        this.requestEthEnable = this.requestEthEnable.bind(this)
    }

    render() {
        const ethEnableState = this.props.web3Instance ? this.props.web3Instance.ethEnableState : ETH_ENABLE_STATES.REJECTED
        return <AddressList watchAddressIds={this.props.watchAddressIds}
                            ownAddressIds={this.props.ownAddressIds}
                            ethEnableState={ethEnableState}
                            ethEnable={this.requestEthEnable}
        />
    }

    componentDidMount() {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', this.props.changeOwnAddresses)
        }
        if (this.props.web3) {
            this.props.web3.eth.getAccounts((error, accounts) => {
                if (accounts) {
                    this.props.changeOwnAddresses(accounts)
                }
            })
        }
    }

    componentWillUnmount() {
        // Unsubscribe from accountsChanged event
        window.ethereum.removeListener('accountsChanged', this.props.changeOwnAddresses);
    }

    requestEthEnable() {
        this.props.ethEnable()
    }
}

AddressListContainer.propTypes = {
    web3: PropTypes.object,
    ownAddressIds: PropTypes.array.isRequired,
    watchAddressIds: PropTypes.array.isRequired,
}

AddressListContainer.defaultProps = {
    //myProp: <defaultValue>
}

const mapStateToProps = state => {
    const ownAddressIds = state.addresses.allIds.filter(id => (state.addresses.byId[id].type === ADDRESS_TYPE_OWNED))
    const watchAddressIds = state.addresses.allIds.filter(id => (state.addresses.byId[id].type === ADDRESS_TYPE_EXTERNAL))
    return {
        ownAddressIds,
        watchAddressIds,
        web3Instance: state.web3Instance ? state.web3Instance : null,
        web3: state.web3Instance ? state.web3Instance.web3 : null,
    }
}

const mapDispatchToProps = dispatch => ({
    changeOwnAddresses: (accounts) => {
        dispatch(changeOwnAddresses(accounts))
    },
    ethEnable: () => {
        dispatch(requestEthEnable())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddressListContainer)
