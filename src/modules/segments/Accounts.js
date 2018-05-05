import React from 'react'
import PropTypes from 'prop-types'
import {Header} from 'semantic-ui-react'
import AddressList from '../address/AddressList'
import AddressListContainer from '../address/AddressListContainer'

const Accounts = (props) => {
    const {ownAddressIds, watchAddressIds} = props
    return (
        <div>
            <Header as={'h1'}>Accounts</Header>
            <AddressListContainer />
        </div>
    )
}

Accounts.propTypes = {
    //myProp: PropTypes.object.isRequired
}

Accounts.defaultProps = {
    //myProp: <defaultValue>
}

export default Accounts
