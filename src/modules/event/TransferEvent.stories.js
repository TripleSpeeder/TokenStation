import React from 'react'
import {storiesOf} from '@storybook/react'
import BN from 'bn.js'
import TransferEvent, {TRANSFER_EVENT_TYPES} from './TransferEvent'
import {Table} from 'semantic-ui-react'

export const transferEventProps = {
    txHash: '0x9e1534c78ecb15c10a65c0456a26e03ac92f2be5390df3ae4cec6ddc14f7716c',
    blockNumber: 5969172,
    from: '0x290907c4d97db09f8c9c69a60120855597187afe',
    fromENS: 'super.duper.eth',
    to: '0x963cffd781053dc6351a325e4fcf4f3a228da3d1',
    quantity: new BN(150),
}

storiesOf('Modules/TransferEvent', module)
    .addDecorator(story => <Table><Table.Body>{story()}</Table.Body></Table>)
    .add('neutral', () => <TransferEvent
        txHash={transferEventProps.txHash}
        blockNumber={transferEventProps.blockNumber}
        from={transferEventProps.from}
        fromENS={transferEventProps.fromENS}
        quantity={transferEventProps.quantity}
        to={transferEventProps.to}
        type={TRANSFER_EVENT_TYPES.NEUTRAL}
    />)
    .add('positive', () => <TransferEvent
        txHash={transferEventProps.txHash}
        blockNumber={transferEventProps.blockNumber}
        from={transferEventProps.from}
        fromENS={transferEventProps.fromENS}
        quantity={transferEventProps.quantity}
        to={transferEventProps.to}
        type={TRANSFER_EVENT_TYPES.POSITIVE}
    />)
    .add('negative', () => <TransferEvent
        txHash={transferEventProps.txHash}
        blockNumber={transferEventProps.blockNumber}
        from={transferEventProps.from}
        fromENS={transferEventProps.fromENS}
        quantity={transferEventProps.quantity}
        to={transferEventProps.to}
        type={TRANSFER_EVENT_TYPES.NEGATIVE}
    />)
