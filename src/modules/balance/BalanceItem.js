import React from 'react'
import PropTypes from 'prop-types'
import {Button, Statistic, Table} from 'semantic-ui-react'
import BalanceItemDetailContainer from './BalanceItemDetailContainer'

const BalanceItem = (props) => {
    const {tokenName, tokenSymbol, tokenBalances, total, reloadBalance, loading} = props

    const tableHeader = (
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell width={9}>{tokenName} ({tokenSymbol})</Table.HeaderCell>
                <Table.HeaderCell width={6}>
                    <Statistic size='mini'>
                        <Statistic.Value>{total.toFixed(3)}</Statistic.Value>
                    </Statistic>
                </Table.HeaderCell>
                <Table.HeaderCell width={1}>
                    <Button circular
                            icon='refresh'
                            onClick={reloadBalance}
                            loading={loading}/>
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
    reloadBalance: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
}

BalanceItem.defaultProps = {
    //myProp: <defaultValue>
}

export default BalanceItem
