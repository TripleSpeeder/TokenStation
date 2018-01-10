import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {removeAddress} from './addressActions'
import {Button, List} from 'semantic-ui-react'

class Address extends Component {
    constructor(props, context) {
        super(props, context)
    }

    handleRemove = () => {
        this.props.removeAddress(this.props.addressId)
    }

    render() {
        return (
            <List.Item>
                <List.Content verticalAlign='middle' floated='right'>
                    <Button size='mini' onClick={this.handleRemove} icon='delete'/>
                </List.Content>
                <List.Content verticalAlign='middle'>
                    {this.props.address}
                </List.Content>
            </List.Item>
        )
    }
}

Address.propTypes = {
    addressId: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    removeAddress: PropTypes.func.isRequired,
}

Address.defaultProps = {
}

const mapStateToProps = (state, ownProps) => (
    {
        address: state.addresses.byId[ownProps.addressId]
    }
)

const mapDispatchToProps = dispatch => ({
    removeAddress: (addressId) => {
        dispatch(removeAddress(addressId))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Address)
