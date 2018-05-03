import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {BigNumber} from 'bignumber.js';

import Balance from "./Balance"

export const zeroBalance = BigNumber(0)
export const longBalance = BigNumber('234.12345678901')
export const integerBalance = BigNumber(200)
export const negLongBalance = BigNumber('-234.12345678901')
export const negIntegerBalance = BigNumber(-200)

storiesOf('Common/Balance', module)
    .add('zeroBalance', () => <Balance balance={zeroBalance}/>)
    .add('withDecimals', () => <Balance balance={longBalance} />)
    .add('noDecimals', () => <Balance balance={integerBalance}/>)
    .add('negativeWithDecimals', () => <Balance balance={negLongBalance} />)
    .add('negativeNoDecimals', () => <Balance balance={negIntegerBalance}/>)

