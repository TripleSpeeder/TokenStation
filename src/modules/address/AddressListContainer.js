import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {showMoreItems} from '../token/tokenActions'
import {removeAddress} from './addressActions'
import {Button} from 'semantic-ui-react'

class AddressListContainer extends Component {
    constructor(props, context) {
        super(props, context)
    }

    handleRemove = (event, data) => {
        const addressId = data['data-addressId']
        console.log("Clicked: " + addressId)
        this.props.removeAddress(addressId)
    }

    render() {
        return (
            <list>
                {this.props.addressIds.map((addressId) =>
                    <li key={addressId}>{addressId} <Button data-addressId={addressId} onClick={this.handleRemove}>X</Button> </li>
                )}
            </list>
        )
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
    removeAddress: (addressId) => {
        dispatch(removeAddress(addressId))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddressListContainer)
