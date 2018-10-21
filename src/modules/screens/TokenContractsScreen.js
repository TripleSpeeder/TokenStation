import React from 'react'
import {Grid} from 'semantic-ui-react'
import Sidebar from '../segments/Sidebar'
import TokenContracts from "../segments/TokenContracts"

const TokenContractsScreen = () => {
    return (
            <Grid padded={'vertically'}>
                <Grid.Row>
                    <Grid.Column width={4} /*style={{ backgroundColor: 'rgb(27, 28, 29)' }}*/>
                        <Sidebar/>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <TokenContracts/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
    )
}

export default TokenContractsScreen
