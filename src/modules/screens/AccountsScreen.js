import React from 'react'
import PropTypes from 'prop-types'
import {Grid} from 'semantic-ui-react'
import Sidebar from '../segments/Sidebar'
import Accounts from '../segments/Accounts'

const AccountsScreen = () => {
    return (
            <Grid padded={'vertically'}>
                <Grid.Row>
                    <Grid.Column width={4} /*style={{ backgroundColor: 'rgb(27, 28, 29)' }}*/>
                        <Sidebar/>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Accounts/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
    )
}

export default AccountsScreen
