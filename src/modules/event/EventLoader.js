import React from 'react'
import PropTypes from 'prop-types'
import {Button, Grid, Progress, Segment} from 'semantic-ui-react'

const EventLoader = (props) => {
    const {loading, loadingCurrentBlock, loadingFromBlock,
        loadingToBlock, resultCount, resultFromBlock,
        resultFromBlockDate, resultToBlock, onLoadMore} = props

    const button = <Button loading={loading} onClick={onLoadMore}>Load more</Button>

    let progressRow = null
    if (loading) {
        const range = loadingToBlock - loadingFromBlock
        const current = loadingCurrentBlock - loadingFromBlock
        progressRow = <Grid.Row>
            <Segment>
                <Progress total={range} value={current} progress='percent' active>
                Scanning block {loadingFromBlock} to {loadingToBlock}
                </Progress>
            </Segment>
        </Grid.Row>
    }

    return (
        <Grid verticalAlign='middle' columns={2} centered>
            <Grid.Row stretched>
                <Grid.Column width={12}>
                    <Segment>
                        {resultCount} transfer events since {resultFromBlockDate} (Block {resultFromBlock} to {resultToBlock}).
                    </Segment>
                </Grid.Column>
                <Grid.Column width={4}>
                    {button}
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={16}>
                    {progressRow}
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

EventLoader.propTypes = {
    loading: PropTypes.bool.isRequired,
    loadingFromBlock: PropTypes.number,
    loadingToBlock: PropTypes.number,
    loadingCurrentBlock: PropTypes.number,
    resultCount: PropTypes.number.isRequired,
    resultFromBlock: PropTypes.number.isRequired,
    resultFromBlockDate: PropTypes.string.isRequired,
    resultToBlock: PropTypes.number.isRequired,
    onLoadMore: PropTypes.func.isRequired,
}

EventLoader.defaultProps = {
    //myProp: <defaultValue>
}

export default EventLoader
