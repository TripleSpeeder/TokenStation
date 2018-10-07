import React from 'react'
import {storiesOf} from '@storybook/react'
import TokenCredits from './TokenCredits'


export const tokenCreditsProps = {
    srcUrl: "https://github.com/ethereum-lists/tokens",
}

storiesOf('Modules/TokenCredits', module)
    .add('default', () => <TokenCredits srcUrl={tokenCreditsProps.srcUrl}/>)
