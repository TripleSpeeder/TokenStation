import React from 'react'
import {Item, Table} from 'semantic-ui-react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {BigNumber} from 'bignumber.js'
import Token from "./Token"
import StoryRouter from "storybook-react-router"
import SelectableToken from "./SelectableToken"

export const SelectableTokenItemProps = {
    id: 45,
    address: '0xaTokenContractAddress',
    name: 'a token name',
    symbol: 'ATN',
    description: 'A random test token. With a description.',
}

export const SelectableTokenItemActions = {
    toggleToken: action('toggleToken'),
}

storiesOf('Modules/SelectableTokenListItem', module)
    .addDecorator(story => (<Table celled><Table.Body>{story()}</Table.Body></Table>))
    .add('checked', () => <SelectableToken id={SelectableTokenItemProps.id}
                                           address={SelectableTokenItemProps.address}
                                           name={SelectableTokenItemProps.name}
                                           symbol={SelectableTokenItemProps.symbol}
                                           checked={true}
                                           onChange={SelectableTokenItemActions.toggleToken}
    />)
    .add('unchecked', () => <SelectableToken id={SelectableTokenItemProps.id}
                                             address={SelectableTokenItemProps.address}
                                             name={SelectableTokenItemProps.name}
                                             symbol={SelectableTokenItemProps.symbol}
                                             checked={false}
                                             onChange={SelectableTokenItemActions.toggleToken}
    />)
