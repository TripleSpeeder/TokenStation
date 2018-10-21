import React from 'react'
import PropTypes from 'prop-types'
import {Button, Statistic, Table} from 'semantic-ui-react'
import BalanceItemDetailContainer from './BalanceItemDetailContainer'
import {Link} from 'react-router-dom'
import Balance from './Balance'

const BalanceItem = (props) => {
    const {expanded, tokenName, tokenSymbol, tokenBalances, total, reloadBalance, loading, tokenEventsLinkOptions, toggleCollapse} = props
    let eventLink = <Link to={tokenEventsLinkOptions}>{tokenName} ({tokenSymbol})</Link>

    const icon = expanded ? 'chevron up' : 'chevron down'

    const tableHeader = (
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell width={1}>
                    <Button onClick={toggleCollapse}
                            circular
                            icon={icon}
                            size={'large'}
                    />
                </Table.HeaderCell>
                <Table.HeaderCell width={8}>{eventLink}</Table.HeaderCell>
                <Table.HeaderCell width={5}>
                    <Statistic size='mini'>
                        <Statistic.Value><Balance balance={total}/></Statistic.Value>
                    </Statistic>
                </Table.HeaderCell>
                <Table.HeaderCell width={2}>
                    <Button circular
                            icon='refresh'
                            onClick={reloadBalance}
                            loading={loading}/>
                </Table.HeaderCell>
            </Table.Row>
        </Table.Header>
    )

    let tableBody
    if (expanded) {
        tableBody = (
            <Table.Body>
                {tokenBalances.map(tokenBalance =>
                    <BalanceItemDetailContainer key={tokenBalance.balanceId}
                                                tokenBalanceId={tokenBalance.balanceId}
                    />
                )}
            </Table.Body>
        )
    } else {
        tableBody = null
    }

    return <Table compact>
        {tableHeader}
        {tableBody}
    </Table>
}

BalanceItem.propTypes = {
    tokenName: PropTypes.string.isRequired,
    tokenSymbol: PropTypes.string.isRequired,
    tokenBalances: PropTypes.array.isRequired,
    total: PropTypes.object.isRequired,
    reloadBalance: PropTypes.func.isRequired,
    toggleCollapse: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    tokenEventsLinkOptions: PropTypes.object.isRequired,
    expanded: PropTypes.bool.isRequired,
}

BalanceItem.defaultProps = {
    //myProp: <defaultValue>
}

export default BalanceItem
