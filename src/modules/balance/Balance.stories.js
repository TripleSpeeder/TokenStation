import React from 'react';
import { storiesOf } from '@storybook/react';
import BigNumber from 'bignumber.js';

import Balance from "./Balance"

export const zeroBalance = new BigNumber(0)
export const longBalance = new BigNumber('234.12345678901')
export const integerBalance = new BigNumber(200)
export const negLongBalance = new BigNumber('-234.12345678901')
export const negIntegerBalance = new BigNumber(-200)

storiesOf('Common/Balance', module)
    .add('zeroBalance', () => <Balance balance={zeroBalance}/>)
    .add('withDecimals', () => <Balance balance={longBalance} />)
    .add('noDecimals', () => <Balance balance={integerBalance}/>)
    .add('negativeWithDecimals', () => <Balance balance={negLongBalance} />)
    .add('negativeNoDecimals', () => <Balance balance={negIntegerBalance}/>)

