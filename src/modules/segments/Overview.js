import React from 'react'
import PropTypes from 'prop-types'
import {Header, Message} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import BalancesList from '../balance/BalancesList'

const Overview = (props) => {
    const {hasAccounts, balancesByToken} = props

    let body
    if (hasAccounts) {
        body = <BalancesList balancesByToken={balancesByToken}/>
    } else {
        body = <Message>
            <Message.Header>
                No accounts
            </Message.Header>
            <p>You have no watched or unlocked accounts. Open the <Link to={'/todo'}>Account Manager</Link> to setup accounts.</p>
        </Message>
    }

    return (
        <div>
            <Header as={'h1'}>Overview</Header>
            {body}
        </div>
    )
}

Overview.propTypes = {
    hasAccounts: PropTypes.bool.isRequired,
    balancesByToken: PropTypes.object.isRequired
}

Overview.defaultProps = {
    //myProp: <defaultValue>
}

export default Overview
