import React from 'react'
import PropTypes from 'prop-types'
import {List} from 'semantic-ui-react'
import Address from './Address'

const AddressList = (props) => {
    return (
        <List celled divided>
            {props.addressIds.map((addressId) =>
                <Address key={addressId} addressId={addressId}/>
            )}
        </List>
    )
}

AddressList.propTypes = {
    //myProp: PropTypes.object.isRequired
    addressIds: PropTypes.array.isRequired
}

AddressList.defaultProps = {
    //myProp: <defaultValue>
}

export default AddressList
