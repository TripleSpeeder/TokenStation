import React from 'react'
import {storiesOf} from '@storybook/react'
import {Provider} from 'react-redux';
import SelectableTokenList from "./SelectableTokenList"
import mockStore from "../mocks/MockStore"

export const SelectableTokenListProps = {
    tokenIds: mockStore.getState().tokens.allIds,
}

storiesOf('Modules/SelectableTokenList', module)
    .addDecorator(story => <Provider store={mockStore}>{story()}</Provider>)
    .add('default', () => <SelectableTokenList tokenList={SelectableTokenListProps.tokenIds}/>)
