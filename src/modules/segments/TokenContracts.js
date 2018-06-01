import React from 'react'
import {Header} from 'semantic-ui-react'
import SelectableTokenListContainer from "../token/SelectableTokenListContainer"

const TokenContracts = (props) => {
    return (
        <React.Fragment>
            <Header as={'h1'} block inverted color={'green'} textAlign={'center'}>Manage Token Contracts</Header>
            <SelectableTokenListContainer/>
        </React.Fragment>
    )
}

export default TokenContracts
