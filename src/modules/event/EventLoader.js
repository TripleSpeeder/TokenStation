import React from 'react'
import PropTypes from 'prop-types'
import {Button, Grid, Icon, Message, } from 'semantic-ui-react'

const EventLoader = (props) => {
    const {loading, loadingFromBlock, loadingToBlock, resultCount, resultFromBlock, currentChunk, maxChunks,
        resultFromBlockDate, resultToBlock, onLoadMore} = props

    let button = <Button icon onClick={onLoadMore} labelPosition={'left'}><Icon name={'search'}/>Load more</Button>
    if (loading) {
        const range = loadingToBlock - loadingFromBlock
        button = <Message warning icon>
                    <Icon loading name={'circle notched'}/>
            <Message.Content>
                <Message.Header>Loading events</Message.Header>
                Scanning {loadingFromBlock} - {loadingToBlock} - Chunk {currentChunk}/{maxChunks}
            </Message.Content>
        </Message>
    }

    return (
        <Grid verticalAlign='middle' columns={2}>
            <Grid.Row>
                <Grid.Column >
                    <Message info icon>
                        <Icon name={'exchange'}/>
                        <Message.Content>
                            <Message.Header>Showing {resultCount} transfer events</Message.Header>
                             Block {resultFromBlock} to {resultToBlock}
                        </Message.Content>
                    </Message>
                </Grid.Column>
                <Grid.Column>
                    {button}
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
    currentChunk: PropTypes.number.isRequired,
    maxChunks: PropTypes.number.isRequired,
}

EventLoader.defaultProps = {
    //myProp: <defaultValue>
}

export default EventLoader
