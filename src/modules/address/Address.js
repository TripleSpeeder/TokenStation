import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {ADDRESS_TYPE_EXTERNAL, ADDRESS_TYPE_OWNED, removeAddress} from './addressActions'
import {Button, List, Icon} from 'semantic-ui-react'


class Address extends Component {
    constructor(props, context) {
        super(props, context)
    }

    handleRemove = () => {
        this.props.removeAddress(this.props.addressId)
    }

    render() {
        let removeButton = null
        if (this.props.canRemove) {
            removeButton = <List.Content verticalAlign='middle' floated='right'>
                <Button size='tiny' onClick={this.handleRemove} icon='delete'/>
            </List.Content>
        }
        return (
            <List.Item>
                {removeButton}
                <List.Content verticalAlign='middle'>
                    <Icon name={this.props.iconName}/> {this.props.address}
                </List.Content>
            </List.Item>
        )
    }
}

Address.propTypes = {
    addressId: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    removeAddress: PropTypes.func.isRequired,
    iconName: PropTypes.string.isRequired,
    canRemove: PropTypes.bool.isRequired,
}

Address.defaultProps = {}

const mapStateToProps = (state, ownProps) => {
    const addressEntry = state.addresses.byId[ownProps.addressId]
    return {
        address: addressEntry.address,
        iconName: addressEntry.type === ADDRESS_TYPE_OWNED ? 'unlock' : 'lock',
        canRemove: addressEntry.type === ADDRESS_TYPE_EXTERNAL,
    }
}

const mapDispatchToProps = dispatch => ({
    removeAddress: (addressId) => {
        dispatch(removeAddress(addressId))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Address)
