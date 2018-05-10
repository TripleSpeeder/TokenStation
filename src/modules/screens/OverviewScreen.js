import React from 'react'
import PropTypes from 'prop-types'
import {Grid} from 'semantic-ui-react'
import Sidebar from '../segments/Sidebar'
import Overview from '../segments/Overview'

const OverviewScreen = (props) => {
    const {activeItem, clickItem, hasAccounts, balancesByToken} = props
    return (
            <Grid padded={'vertically'}>
                <Grid.Row>
                    <Grid.Column width={4} /*style={{ backgroundColor: 'rgb(27, 28, 29)' }}*/>
                        <Sidebar activeItem={activeItem} clickItem={clickItem}/>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Overview hasAccounts={hasAccounts} balancesByToken={balancesByToken}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
    )
}

OverviewScreen.propTypes = {
    activeItem: PropTypes.string.isRequired,
    clickItem: PropTypes.func.isRequired,
    hasAccounts: PropTypes.bool.isRequired,
    balancesByToken: PropTypes.object.isRequired,
}

export default OverviewScreen
