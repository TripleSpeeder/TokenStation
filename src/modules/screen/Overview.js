import React from 'react'
import PropTypes from 'prop-types'
import {Header, Message} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const Overview = (props) => {
    const {hasAccounts} = props

    let body
    if (hasAccounts) {
        body = <p>Token overview goes here...</p>
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
    hasAccounts: PropTypes.bool.isRequired
}

Overview.defaultProps = {
    //myProp: <defaultValue>
}

export default Overview
