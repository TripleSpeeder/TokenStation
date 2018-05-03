import React from 'react'
import PropTypes from 'prop-types'
import {List, Table} from 'semantic-ui-react'
import AddressContainer from './AddressContainer'

const AddressList = (props) => {
    return (
        <Table>
            <Table.Body>
            {props.addressIds.map((addressId) =>
                <AddressContainer key={addressId} addressId={addressId}/>
            )}
            </Table.Body>
        </Table>
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
