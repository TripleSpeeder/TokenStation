import React from 'react'
import {storiesOf} from '@storybook/react'
import {Provider} from 'react-redux';
import mockStore from '../mocks/MockStore'
import TokenSelector from "./TokenSelector"


export const tokenSelectorProps = {
    tokenName: "District0x Network Token",
    trackedTokens: [
        {
            "title": "District0x Network Token (DNT)",
            "description": "0xaaabbbcccc111222333",
            "image": "https://s3.amazonaws.com/uifaces/faces/twitter/baires/128.jpg",
            "price": undefined
        },
        {
            "title": "Aragon Network Token (ANT)",
            "description": "0x223344556677889900",
            "image": "https://s3.amazonaws.com/uifaces/faces/twitter/gizmeedevil1991/128.jpg",
            "price": undefined
        },
        {
            "title": "EOS",
            "description": "0x223344556677889900",
            "image": "https://s3.amazonaws.com/uifaces/faces/twitter/baliomega/128.jpg",
            "price": undefined
        },
    ]
}

export const tokenSelectorActions = {
    onTokenSelected: action('handleRefresh'),
}

storiesOf('Modules/TokenSelector', module)
    .addDecorator(story => <Provider store={mockStore}>{story()}</Provider>)
    .add('default', () => <TokenSelector
        tokenList={tokenSelectorProps.trackedTokens}
        on
    />)
    .add('preselected', () => <TokenSelector tokenList={tokenSelectorProps.trackedTokens}/>)
