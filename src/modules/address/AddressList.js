import React from 'react'
import PropTypes from 'prop-types'
import {Header, Message, Segment, Table} from 'semantic-ui-react'
import AddressContainer from './AddressContainer'

const AddressList = (props) => {
    let ownTable, watchTable

    if (props.ownAddressIds.length) {
        ownTable = <Table basic='very' selectable>
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
        watchTable = <Table basic='very' selectable>
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
        <React.Fragment>
            <Segment>
                <Header dividing as='h2'>Personal Accounts</Header>
                {ownTable}
            </Segment>
            <Segment>
                <Header dividing as='h2'>Watched Accounts</Header>
                {watchTable}
            </Segment>
        </React.Fragment>
    )
}

AddressList.propTypes = {
    ownAddressIds: PropTypes.array.isRequired,
    watchAddressIds: PropTypes.array.isRequired,
}

export default AddressList
