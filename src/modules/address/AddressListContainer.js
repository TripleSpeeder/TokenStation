import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {changeOwnAddresses} from './addressActions'
import AddressList from './AddressList'

class AddressListContainer extends Component {
    constructor(props, context) {
        super(props, context)
        this.updateWeb3Accounts = this.updateWeb3Accounts.bind(this)
    }

    render() {
        return <AddressList addressIds={this.props.addressIds}/>
    }

    componentWillReceiveProps(newProps) {
        if (newProps.web3 && (newProps.web3 !== this.props.web3)) {
            this.updateWeb3Accounts(newProps.web3)
            if (newProps.web3.currentProvider.isMetaMask === true) {
                console.log("Metamask detected. Watching for account changes")
                setInterval(this.updateWeb3Accounts, 100)
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
}

AddressListContainer.propTypes = {
    web3: PropTypes.object,
    addressIds: PropTypes.array.isRequired
}

AddressListContainer.defaultProps = {
    //myProp: <defaultValue>
}

const mapStateToProps = state => (
    {
        addressIds: state.addresses.allIds,
        web3: state.web3Instance.web3,
    }
)

const mapDispatchToProps = dispatch => ({
    changeOwnAddresses: (accounts) => {
        dispatch(changeOwnAddresses(accounts))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddressListContainer)
