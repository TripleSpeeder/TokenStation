import React from 'react'
import AddressListContainer from '../address/AddressListContainer'
import ScreenHeader from '../layout/ScreenHeader'

const Accounts = () => {
    return (
        <React.Fragment>
            <ScreenHeader title={'Manage Accounts'}/>
            <AddressListContainer />
        </React.Fragment>
    )
}

export default Accounts
