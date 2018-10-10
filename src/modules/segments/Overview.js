import React from 'react'
import PropTypes from 'prop-types'
import {Divider, Message} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import BalancesList from '../balance/BalancesList'
import TokenListFilterContainer from '../token/TokenListFilterContainer'
import ScreenHeader from '../screens/ScreenHeader'

const Overview = (props) => {
    const {hasAccounts, balancesByToken} = props

    let body
    if (hasAccounts) {
        if (Object.keys(balancesByToken).length) {
            body = <BalancesList balancesByToken={balancesByToken}/>
        }
        else {
            body = <Message>
                <Message.Header>
                    No balances
                </Message.Header>
                <Message.Content>
                    There are no token balances to display. Things you can try:
                </Message.Content>
                <Message.List>
                    <Message.Item>Change the filterstring</Message.Item>
                    <Message.Item>Open the <Link to={ {pathname: '/accounts/',} }>Account Manager</Link> to add additional accounts</Message.Item>
                    <Message.Item>Open the <Link to={ {pathname: '/tokenContracts/'} }>Token Manager</Link> to tracked additional tokens</Message.Item>
                </Message.List>
            </Message>
        }
    } else {
        body = <Message>
            <Message.Header>
                No accounts
            </Message.Header>
            <p>You have no watched or unlocked accounts. Open the <Link to={ {pathname: '/accounts/',} }>Account Manager</Link> to setup accounts.</p>
        </Message>
    }

    return (
        <React.Fragment>
            <ScreenHeader title={'Overview'}/>
            {hasAccounts && <TokenListFilterContainer target={'balancelist'} />}
            <Divider/>
            {body}
        </React.Fragment>
    )
}

Overview.propTypes = {
    hasAccounts: PropTypes.bool.isRequired,
    balancesByToken: PropTypes.object.isRequired,
}

Overview.defaultProps = {
    //myProp: <defaultValue>
}

export default Overview
