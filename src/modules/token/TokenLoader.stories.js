import React from 'react'
import {storiesOf} from '@storybook/react'
import {Provider} from 'react-redux';
import mockStore from '../mocks/MockStore'
import TokenLoader from "./TokenLoader"


export const tokenLoaderProps = {
    tokenName: "District0x Network Token",
    emptyName: ""
}

storiesOf('Modules/TokenLoader', module)
    .addDecorator(story => <Provider store={mockStore}>{story()}</Provider>)
    .add('initial', () => <TokenLoader currentlyLoadingToken={tokenLoaderProps.emptyName}
                                       progressCurrent={0}
                                       progressTotal={900}
    />)
    .add('thirtyPercent', () => <TokenLoader currentlyLoadingToken={tokenLoaderProps.tokenName}
                                             progressCurrent={300}
                                             progressTotal={900}
    />)
    .add('almost', () => <TokenLoader currentlyLoadingToken={tokenLoaderProps.tokenName}
                                             progressCurrent={899}
                                             progressTotal={900}
    />)
    .add('complete', () => <TokenLoader currentlyLoadingToken={tokenLoaderProps.emptyName}
                                             progressCurrent={900}
                                             progressTotal={900}
    />)
