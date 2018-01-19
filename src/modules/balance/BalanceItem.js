import React from 'react'
import PropTypes from 'prop-types'
import {Statistic, Table} from 'semantic-ui-react'
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
            {tokenBalances.map(tokenBalance =>
                <BalanceItemDetailContainer key={tokenBalance.balanceId}
                                            tokenBalanceId={tokenBalance.balanceId}
                                            />
            )}
        </Table.Body>
    )

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
