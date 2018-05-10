import React from 'react'
import {storiesOf} from '@storybook/react'
import {Provider} from 'react-redux';
import {action} from '@storybook/addon-actions'
import mockStore from '../mocks/MockStore'
import TokenListFilter from './TokenListFilter'

export const tokenListFilterActions = {
    handleChange: action('handleChange'),
    clearFilter: action('clearFilter')
}


storiesOf('Modules/TokenListFilter', module)
    .addDecorator(story => <Provider store={mockStore}>{story()}</Provider>)
    .add('empty', () => <TokenListFilter total={789}
                                         displayed={789}
                                         filterIsActive={false}
                                         filterString={''}
                                         clearFilter={tokenListFilterActions.clearFilter}
                                         handleChange={tokenListFilterActions.handleChange}
    />)
    .add('withFilterString', () => <TokenListFilter total={789}
                                                    displayed={15}
                                                    filterIsActive={true}
                                                    filterString={'someSearchString'}
                                                    clearFilter={tokenListFilterActions.clearFilter}
                                                    handleChange={tokenListFilterActions.handleChange}

    />)
