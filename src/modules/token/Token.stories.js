import React from 'react'
import {Item} from 'semantic-ui-react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {BigNumber} from 'bignumber.js'
import Token from "./Token"
import StoryRouter from "storybook-react-router"

export const tokenItemProps = {
    loadedToken: {
        address: '0xaTokenContractAddress',
        name: 'a token name',
        symbol: 'ATN',
        description: 'A random test token. With a description.',
        website: 'https://www.atn.io',
        decimals: new BigNumber(1000000000000000000),
        supply: {
            supply: new BigNumber(100000),
            loading: false,
        },
        loading: false
    },
    loadingToken: {
        address: '0xaTokenContractAddress',
        name: 'a token name',
        symbol: 'ATN',
        description: 'A random test token. With a description.',
        website: 'https://www.atn.io',
        decimals: new BigNumber(1000000000000000000),
        supply: {
            supply: new BigNumber(100000),
            loading: false,
        },
        loading: true
    },
    supplyLoadingToken: {
        address: '0xaTokenContractAddress',
        name: 'a token name',
        symbol: 'ATN',
        description: 'A random test token. With a description.',
        website: 'https://www.atn.io',
        decimals: new BigNumber(1000000000000000000),
        supply: {
            supply: undefined,
            loading: true,
        },
        loading: false,
    },
    tokenEventsLinkOptions: {
        pathname: '/token/123',
    },

}

const actions = {
    handleRefresh: action('handleRefresh'),
}
/*
storiesOf('Modules/TokenListItem', module)
    .addDecorator(StoryRouter())
    .addDecorator(story => (<Item.Group divided>{story()}</Item.Group>))
    .add('default', () => <Token token={tokenItemProps.loadedToken}
                                 etherscanUrl={''}
                                 handleRefresh={actions.handleRefresh}
                                 loadingBalance={false}
                                 tokenEventsLinkOptions={tokenItemProps.tokenEventsLinkOptions}
    />)
    .add('token loading', () => <Token token={tokenItemProps.loadingToken}
                                 etherscanUrl={''}
                                 handleRefresh={actions.handleRefresh}
                                 loadingBalance={false}
                                 tokenEventsLinkOptions={tokenItemProps.tokenEventsLinkOptions}
    />)
    .add('supply loading', () => <Token token={tokenItemProps.supplyLoadingToken}
                                 etherscanUrl={''}
                                 handleRefresh={actions.handleRefresh}
                                 loadingBalance={false}
                                 tokenEventsLinkOptions={tokenItemProps.tokenEventsLinkOptions}
    />)
    .add('balance loading', () => <Token token={tokenItemProps.loadedToken}
                                        etherscanUrl={''}
                                        handleRefresh={actions.handleRefresh}
                                        loadingBalance={true}
                                        tokenEventsLinkOptions={tokenItemProps.tokenEventsLinkOptions}
    />)
*/
