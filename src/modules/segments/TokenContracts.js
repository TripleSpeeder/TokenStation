import React from 'react'
import {Header, Icon, Message} from 'semantic-ui-react'
import SelectableTokenListContainer from "../token/SelectableTokenListContainer"

const TokenContracts = (props) => {
    return (
        <React.Fragment>
            <Header as={'h1'} block inverted color={'green'} textAlign={'center'}>Manage Token Contracts</Header>
            <Message info icon>
                <Icon name={'info'}/>
                <Message.Header>Select which tokens to track</Message.Header>
                <Message.Content>
                    In the list below, check the tokens you want to keep track of. Use the filter to
                    quickly find specific tokens. You can filter by token name, symbol or contract address.
                </Message.Content>
            </Message>
            <SelectableTokenListContainer/>
        </React.Fragment>
    )
}

export default TokenContracts
