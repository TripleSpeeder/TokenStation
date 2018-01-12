import React from 'react'
import PropTypes from 'prop-types'
import {Table, Icon} from 'semantic-ui-react'

const BalanceItemDetail = (props) => {
    return (
        <Table.Row>
            <Table.Cell>
                <Icon name='angle right' /> {props.address}
            </Table.Cell>
            <Table.Cell>{props.balance.toFixed()}</Table.Cell>
        </Table.Row>
    )
}

BalanceItemDetail.propTypes = {
    address: PropTypes.string.isRequired,
    balance: PropTypes.object.isRequired
}

BalanceItemDetail.defaultProps = {
    //myProp: <defaultValue>
}

export default BalanceItemDetail
