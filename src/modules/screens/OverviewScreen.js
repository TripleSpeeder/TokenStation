import React from 'react'
import PropTypes from 'prop-types'
import {Grid} from 'semantic-ui-react'
import Sidebar from '../segments/Sidebar'
import Overview from '../segments/Overview'

const OverviewScreen = (props) => {
    const {hasAccounts} = props
    return (
            <Grid padded={'vertically'}>
                <Grid.Row>
                    <Grid.Column width={4} /*style={{ backgroundColor: 'rgb(27, 28, 29)' }}*/>
                        <Sidebar/>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Overview hasAccounts={hasAccounts}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
    )
}

OverviewScreen.propTypes = {
    hasAccounts: PropTypes.bool.isRequired,
}

export default OverviewScreen
