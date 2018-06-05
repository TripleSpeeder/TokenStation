import React from 'react'
import PropTypes from 'prop-types'
import {Progress, Segment} from 'semantic-ui-react'

const TokenLoader = (props) => {
    const {currentlyLoadingToken, progressCurrent, progressTotal} = props
    if (progressCurrent === progressTotal) {
        return null
    }

    const progressColor = "green"
    let label = "Loading " + currentlyLoadingToken
    if (progressCurrent < progressTotal) {
        label += " (" + progressCurrent + "/" + progressTotal + ")"
    }

    return <Segment basic>
        <Progress value={progressCurrent}
                  total={progressTotal}
                  color={progressColor}
                  label={label}
                  size='small'/>
    </Segment>
}

TokenLoader.propTypes = {
    progressTotal: PropTypes.number.isRequired,
    progressCurrent: PropTypes.number.isRequired,
    currentlyLoadingToken: PropTypes.string.isRequired,
}

export default TokenLoader
