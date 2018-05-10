import React from 'react'
import PropTypes from 'prop-types'
import {Grid} from 'semantic-ui-react'
import Sidebar from '../segments/Sidebar'
import Accounts from '../segments/Accounts'

const AccountsScreen = (props) => {
    const {activeItem, clickItem} = props
    return (
            <Grid padded={'vertically'}>
                <Grid.Row>
                    <Grid.Column width={4} /*style={{ backgroundColor: 'rgb(27, 28, 29)' }}*/>
                        <Sidebar activeItem={activeItem} clickItem={clickItem}/>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Accounts/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
    )
}

AccountsScreen.propTypes = {
    activeItem: PropTypes.string.isRequired,
    clickItem: PropTypes.func.isRequired,
}

export default AccountsScreen
