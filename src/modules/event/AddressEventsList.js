import React from 'react'
import PropTypes from 'prop-types'
import {Table, Menu, Icon} from 'semantic-ui-react'
import TransferEventContainer from './TransferEventContainer'

const AddressEventsList = (props) => {
    return (
        <Table striped compact>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>TxHash</Table.HeaderCell>
                    <Table.HeaderCell>Block</Table.HeaderCell>
                    <Table.HeaderCell>From</Table.HeaderCell>
                    <Table.HeaderCell>To</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell textAlign={'right'}>Quantity</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {props.transferEventIds.map(transferEventId =>
                    <TransferEventContainer key={transferEventId}
                                            transferEventId={transferEventId}
                                            address={props.address}
                    />
                )}
            </Table.Body>
        </Table>
    )
}

AddressEventsList.propTypes = {
    //myProp: PropTypes.object.isRequired
    transferEventIds: PropTypes.array.isRequired,
    address: PropTypes.string.isRequired,
}

AddressEventsList.defaultProps = {
    //myProp: <defaultValue>
}

export default AddressEventsList
