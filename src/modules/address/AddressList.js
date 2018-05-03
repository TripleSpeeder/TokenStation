import React from 'react'
import PropTypes from 'prop-types'
import {Header, List, Message, Table} from 'semantic-ui-react'
import AddressContainer from './AddressContainer'

const AddressList = (props) => {
    let ownTable, watchTable

    if (props.ownAddressIds.length) {
        ownTable = <Table>
            <Table.Body>
                {props.ownAddressIds.map((addressId) =>
                    <AddressContainer key={addressId} addressId={addressId}/>
                )}
            </Table.Body>
        </Table>
    } else {
        ownTable = <Message>
            <Message.Header>
                No personal accounts
            </Message.Header>
            <p>You need to share your accounts so they are visible here. Log in to Metamask or share accounts in Mist .</p>
        </Message>
    }

    if (props.watchAddressIds.length) {
        watchTable = <Table>
            <Table.Body>
                {props.watchAddressIds.map((addressId) =>
                    <AddressContainer key={addressId} addressId={addressId}/>
                )}
            </Table.Body>
        </Table>
    } else {
        watchTable = <Message>
            <Message.Header>
                No watched accounts
            </Message.Header>
            <p>You don't have any watched accounts. Open the Account Manager to setup watch-only accounts.</p>
        </Message>
    }

    return (
        <div>
            <Header as='h2'>Personal Accounts</Header>
            {ownTable}
            <Header as='h2'>Watched Accounts</Header>
            {watchTable}
        </div>
    )
}

AddressList.propTypes = {
    //myProp: PropTypes.object.isRequired
    ownAddressIds: PropTypes.array.isRequired,
    watchAddressIds: PropTypes.array.isRequired,
}

AddressList.defaultProps = {
    //myProp: <defaultValue>
}

export default AddressList
