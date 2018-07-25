import React from 'react'
import {storiesOf, action} from '@storybook/react'
import {Provider} from 'react-redux';
import mockStore from '../mocks/MockStore'
import TokenSelector from "./TokenSelector"


export const tokenSelectorProps = {
    trackedTokens: [
        mockStore.getState().tokens.byId[1],
        mockStore.getState().tokens.byId[2],
        mockStore.getState().tokens.byId[3],
    ]
}

export const tokenSelectorActions = {
    onTokenSelect: action('tokenSelect'),
    onSearchChange: action('onSearchChange'),
}

storiesOf('Modules/TokenSelector', module)
    .addDecorator(story => <Provider store={mockStore}>{story()}</Provider>)
    .add('withResults', () => <TokenSelector onSearchChange={tokenSelectorActions.onSearchChange}
                                             onTokenSelect={tokenSelectorActions.onTokenSelect}
                                             results={tokenSelectorProps.trackedTokens}
                                             value={'matching search string'}
    />)
    .add('preselected', () => <TokenSelector onSearchChange={tokenSelectorActions.onSearchChange}
                                             onTokenSelect={tokenSelectorActions.onTokenSelect}
                                             value={tokenSelectorProps.trackedTokens[1].name}
                                             results={[]}
    />)
