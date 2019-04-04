import React from 'react'
import PropTypes from 'prop-types'
import {Checkbox, Dropdown, Grid} from 'semantic-ui-react'
import TokenListFilterContainer from "../token/TokenListFilterContainer"

function OverviewOptions(props) {
    const {showEmpty, toggleShowEmpty, groupBy, setGroupBy} = props
    const groupOptions = [
        {
            key: 'tokenId',
            text: 'token',
            value: 'tokenId',
        },
        {
            key: 'addressId',
            text: 'account',
            value: 'addressId',
        },
    ]

    return (
        <Grid verticalAlign='middle' columns={2} divided>
            <Grid.Row>
                <Grid.Column width={3}>
                    Group by{' '}
                    <Dropdown
                        inline
                        options={groupOptions}
                        value={groupBy}
                        onChange={setGroupBy}
                    />
                </Grid.Column>
                <Grid.Column width={4}>
                    <Checkbox toggle label='Show null balances' checked={showEmpty} onChange={toggleShowEmpty}/>
                </Grid.Column>
                <Grid.Column width={9}>
                    <TokenListFilterContainer target={'balancelist'}/>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

OverviewOptions.propTypes = {
    showEmpty: PropTypes.bool.isRequired,
    toggleShowEmpty: PropTypes.func.isRequired,
    groupBy: PropTypes.string.isRequired,
    setGroupBy: PropTypes.func.isRequired,
}

OverviewOptions.defaultProps = {
    //myProp: <defaultValue>
}

export default OverviewOptions
