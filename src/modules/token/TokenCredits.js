import React from 'react'
import PropTypes from 'prop-types'
import {Segment} from 'semantic-ui-react'

const TokenCredits = (props) => {
    const {srcUrl} = props

    return (
        <Segment size={'mini'} textAlign={'center'}>
            <div>
                ERC20 contract data origin: <strong><a href={srcUrl} target='_blank'>{srcUrl}</a></strong>
            </div>
        </Segment>
    )
}

TokenCredits.propTypes = {
    srcUrl: PropTypes.string.isRequired,
}

export default TokenCredits
