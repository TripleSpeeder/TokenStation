import React from 'react'
import PropTypes from 'prop-types'
import {Button, Divider, Header, Message, Segment, Table} from 'semantic-ui-react'
import AddressContainer from './AddressContainer'
import QueryAddressFormContainer from "./QueryAddressFormContainer"
import {ETH_ENABLE_STATES} from '../web3/web3Actions'

const AddressList = (props) => {
    let ownTable, watchTable
    const {ethEnableState, ethEnable} = props
    let waitingGrant = (ethEnableState === ETH_ENABLE_STATES.WAITING)

    if (props.ownAddressIds.length) {
        ownTable = <Table basic='very' selectable>
            <Table.Body>
                {props.ownAddressIds.map((addressId) =>
                    <AddressContainer key={addressId} addressId={addressId}/>
                )}
            </Table.Body>
        </Table>
    } else if (ethEnableState === ETH_ENABLE_STATES.GRANTED) {
        // Access granted, but no accounts? Must be either Mist with no accounts shared or locked Metamask.
        ownTable = <Message>
            <Message.Header>
                No personal accounts
            </Message.Header>
            <p>You need to share your accounts so they are visible here. Log in to Metamask or share accounts in Mist .</p>
        </Message>
    } else {
        // No accounts and no access. Ask for it.
        ownTable = <Message>
            <Message.Header>
                No access to personal accounts
            </Message.Header>
            <p>You can grant access to your personal accounts. This will automatically put the accounts to the watch
                list.</p>
            <p><Button primary disabled={waitingGrant} loading={waitingGrant} onClick={ethEnable}>Grant access</Button></p>
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
            <p>You don't have any watched accounts.</p>
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
                <Divider/>
                <QueryAddressFormContainer />
            </Segment>
        </React.Fragment>
    )
}

AddressList.propTypes = {
    ownAddressIds: PropTypes.array.isRequired,
    watchAddressIds: PropTypes.array.isRequired,
    ethEnableState: PropTypes.oneOf(Object.values(ETH_ENABLE_STATES)),
    ethEnable: PropTypes.func.isRequired,
}

export default AddressList
