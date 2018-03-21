import React, {Component} from 'react'
import PropTypes from 'prop-types'
import TransferForm from './TransferForm'
import {connect} from 'react-redux'

class TransferFormContainer extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            toAddress: '',
            fromAddress: '',
            amount: window.web3.toBigNumber('0'),
            toAddressValid: false,
            amountValid: false,
            rateValid: false
        }

        //this.handleToAddressChange = this.handleToAddressChange.bind(this)
        //this.handleAmountChange = this.handleAmountChange.bind(this)
        this.onValidSubmit = this.onValidSubmit.bind(this)
    }

    onValidSubmit = (formData) => alert(JSON.stringify(formData));   // eslint-disable-line

    render() {
        return <TransferForm onValidSubmit={this.onValidSubmit}
                             toAddress={this.state.toAddress}
                             fromAddress={this.state.fromAddress}
                             addressIds={this.props.addressIDs}
                             web3={this.props.web3}
        />
    }
}

TransferFormContainer.propTypes = {
    //myProp: PropTypes.object.isRequired
}

TransferFormContainer.defaultProps = {
    //myProp: <defaultValue>
}

const mapStateToProps = (state, ownProps) => {
    return {
        addressIDs: state.addresses.allIds,
        web3: state.web3Instance.web3
    }
}
export default connect(mapStateToProps)(TransferFormContainer)
