import React from 'react';
import { storiesOf } from '@storybook/react';
import BN from 'bn.js'

import Balance from "./Balance"

export const zeroBalance = new BN(0)
export const longBalance = new BN('234123456789010000000') // 18 decimals
export const mediumBalance = new BN(234123456) // 6 decimals
export const integerBalance = new BN(200)
export const negLongBalance = new BN('-234123456789010000000') // 18 decimals
export const negMediumBalance = new BN(-234123456) // 6 decimals
export const negIntegerBalance = new BN(-200)
export const roundingBalance = new BN('99999999999999999999999')
export const negRoundingBalance = new BN('-99999999999999999999999')
export const longDecimals = new BN(18)
export const mediumDecimals = new BN(6)
export const noDecimals = new BN(0)

storiesOf('Common/Balance', module)
    .add('zeroBalance', () => <Balance amount={zeroBalance} numDecimals={longDecimals}/>)
    .add('longBalance', () => <Balance amount={longBalance} numDecimals={longDecimals} />)
    .add('mediumBalance', () => <Balance amount={mediumBalance} numDecimals={mediumDecimals} />)
    .add('zeroDecimals', () => <Balance amount={integerBalance} numDecimals={noDecimals}/>)
    .add('negativeLongBalance', () => <Balance amount={negLongBalance} numDecimals={longDecimals}/>)
    .add('negativeMediumBalance', () => <Balance amount={negMediumBalance} numDecimals={mediumDecimals}/>)
    .add('negativeZeroDecimals', () => <Balance amount={negIntegerBalance} numDecimals={noDecimals}/>)
    .add('roundingBalance', () => <Balance amount={roundingBalance} numDecimals={longDecimals}/>)
    .add('negRoundingBalance', () => <Balance amount={negRoundingBalance} numDecimals={longDecimals}/>)
