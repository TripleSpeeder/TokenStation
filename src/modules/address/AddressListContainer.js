import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {ADDRESS_TYPE_EXTERNAL, ADDRESS_TYPE_OWNED, changeOwnAddresses} from './addressActions'
import AddressList from './AddressList'
import {ETH_ENABLE_STATES, requestEthEnable} from '../web3/web3Actions'

class AddressListContainer extends Component {
    constructor(props, context) {
        super(props, context)
        this.updateWeb3Accounts = this.updateWeb3Accounts.bind(this)
        this.requestEthEnable = this.requestEthEnable.bind(this)
        this.checkAccountTimer = 0
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
        this.initAccounts()
    }

    componentWillReceiveProps(newProps) {
        if (newProps.web3 && (newProps.web3 !== this.props.web3)) {
            this.initAccounts(newProps.web3)
        }
    }

    componentWillUnmount() {
        if (this.checkAccountTimer) {
            clearInterval(this.checkAccountTimer)
            this.checkAccountTimer = 0
        }
    }

    initAccounts(web3 = this.props.web3) {
        if (web3) {
            if (this.checkAccountTimer) {
                clearInterval(this.checkAccountTimer)
                this.checkAccountTimer = 0
            }
            this.updateWeb3Accounts(this.props.web3)
            if (this.props.web3.currentProvider.isMetaMask === true) {
                console.log("Metamask detected. Watching for account changes")
                this.checkAccountTimer = setInterval(this.updateWeb3Accounts, 100)
            }
        }
    }

    updateWeb3Accounts(web3 = this.props.web3) {
        web3.eth.getAccounts((error, accounts) => {
            if (accounts) {
                this.props.changeOwnAddresses(accounts)
            }
        })
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
