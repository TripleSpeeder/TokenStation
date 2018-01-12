import React from 'react'
import PropTypes from 'prop-types'
import {Statistic, Table, Icon} from 'semantic-ui-react'
import BalanceItemDetailContainer from './BalanceItemDetailContainer'

const BalanceItem = (props) => {
    const {tokenName, tokenSymbol, tokenBalances, total} = props

    const tableHeader = (
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell width={11}>{tokenName} ({tokenSymbol})</Table.HeaderCell>
                <Table.HeaderCell width={6}>
                    <Statistic size='mini'>
                        <Statistic.Value>{total.toFixed(0)}</Statistic.Value>
                    </Statistic>
                </Table.HeaderCell>
            </Table.Row>
        </Table.Header>
    )

    const tableBody = (
        <Table.Body>
            {props.tokenBalances.map(tokenBalance =>
                <BalanceItemDetailContainer key={tokenBalance.balanceId}
                                            tokenBalanceId={tokenBalance.balanceId}
                                            />
            )}
        </Table.Body>
    )
    /*
    <Table.Body>
        <Table.Row>
            <Table.Cell>
                <Icon name='angle right' /> 0x267be1C1D684F78cb4F6a176C4911b741E4Ffdc0
            </Table.Cell>
            <Table.Cell>3,000</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>
                <Icon name='angle right' /> 0xc44e4c49ffa5db98ca52770dff3e371ecb01f2d9
            </Table.Cell>
            <Table.Cell>500</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>
                <Icon name='angle right' /> 0xa38da4974b594204b73581ac5fbc1ebee54ca4e0
            </Table.Cell>
            <Table.Cell>2,000</Table.Cell>
        </Table.Row>
    </Table.Body>
    */

    const table=<Table compact>
        {tableHeader}
        {tableBody}
    </Table>

    return table
}

BalanceItem.propTypes = {
    tokenName: PropTypes.string.isRequired,
    tokenSymbol: PropTypes.string.isRequired,
    tokenBalances: PropTypes.array.isRequired,
    total: PropTypes.object.isRequired,
}

BalanceItem.defaultProps = {
    //myProp: <defaultValue>
}

export default BalanceItem
