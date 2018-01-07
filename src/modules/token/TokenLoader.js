import React from 'react'
import PropTypes from 'prop-types'
import {Progress} from 'semantic-ui-react'

const TokenLoader = (props) => {
    return <div>
        <Progress value={props.progressCurrent}
                  total={props.progressTotal}
                  color='green'
                  label={props.currentlyLoadingToken}
                  size='small'/>
    </div>
}

TokenLoader.propTypes = {
    progressTotal: PropTypes.number.isRequired,
    progressCurrent: PropTypes.number.isRequired,
    currentlyLoadingToken: PropTypes.string.isRequired,
}

export default TokenLoader
