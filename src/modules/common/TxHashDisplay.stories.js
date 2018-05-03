import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import TxHashDisplay from "./TxHashDisplay"

export const transactionHash = '0x4cb4cc06f3cb0fe16ff7c3355de66fe25631b4a6ffd23657ff883837dd8996c4'

storiesOf('TxHashDisplay', module)
    .add('default', () => <TxHashDisplay txHash={transactionHash}/>)

