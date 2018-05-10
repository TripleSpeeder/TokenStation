import React from 'react'
import {Header} from 'semantic-ui-react'
import AddressListContainer from '../address/AddressListContainer'

const Accounts = (props) => {
    return (
        <React.Fragment>
            <Header as={'h1'} block inverted color={'green'} textAlign={'center'}>Manage Accounts</Header>
            <AddressListContainer />
        </React.Fragment>
    )
}

export default Accounts
