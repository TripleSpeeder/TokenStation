import React from 'react'
import PropTypes from 'prop-types'
import {Progress} from 'semantic-ui-react'

const TokenLoader = (props) => {
    const {currentlyLoadingToken, progressCurrent, progressTotal} = props
    const progressColor = "green"
    let label = currentlyLoadingToken
    if (progressCurrent < progressTotal) {
        label += " (" + progressCurrent + "/" + progressTotal + ")"
    }

    return <div>
        <Progress value={progressCurrent}
                  total={progressTotal}
                  color={progressColor}
                  label={label}
                  size='small'/>
    </div>
}

TokenLoader.propTypes = {
    progressTotal: PropTypes.number.isRequired,
    progressCurrent: PropTypes.number.isRequired,
    currentlyLoadingToken: PropTypes.string.isRequired,
}

export default TokenLoader
