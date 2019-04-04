import React from 'react'
import PropTypes from 'prop-types'
import {Checkbox, Grid} from "semantic-ui-react"
import TokenListFilterContainer from "../token/TokenListFilterContainer"

function OverviewOptions(props) {
    const {showEmpty, toggleShowEmpty} = props

    return (
        <Grid verticalAlign='middle' columns={2} divided>
            <Grid.Row>
                <Grid.Column width={6}>
                    <Checkbox toggle label='Show zero balances' checked={showEmpty} onChange={toggleShowEmpty}/>
                </Grid.Column>
                <Grid.Column width={10}>
                    <TokenListFilterContainer target={'balancelist'}/>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

OverviewOptions.propTypes = {
    showEmpty: PropTypes.bool.isRequired,
    toggleShowEmpty: PropTypes.func.isRequired,
}

OverviewOptions.defaultProps = {
    //myProp: <defaultValue>
}

export default OverviewOptions
