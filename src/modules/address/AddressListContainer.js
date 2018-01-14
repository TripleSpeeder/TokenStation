import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {showMoreItems} from '../token/tokenActions'
import {removeAddress} from './addressActions'
import {Button} from 'semantic-ui-react'
import Address from './Address'
import AddressList from './AddressList'

class AddressListContainer extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return <AddressList addressIds={this.props.addressIds}/>
    }
}

AddressListContainer.propTypes = {
    //myProp: PropTypes.object.isRequired
}

AddressListContainer.defaultProps = {
    //myProp: <defaultValue>
}

const mapStateToProps = state => (
    {
        addressIds: state.addresses.allIds
    }
)

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(AddressListContainer)
