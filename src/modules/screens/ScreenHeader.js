import React from 'react'
import PropTypes from 'prop-types'
import {Header} from 'semantic-ui-react'

const ScreenHeader = (props) => {
    const {title} = props
    /*
     custom style "marginTop: 0" required to prevent header sticking just a little bit outside of its grid row.
     Not sure if this is an error on my side, a bug of react-semantic-ui or semantic-ui itself, or intended behaviour...
     */
    return (
        <Header as={'h1'} block inverted color={'green'} textAlign={'center'}
                style={{
                    marginTop: 0,
                }}>
            {title}
        </Header>
    )
}

ScreenHeader.propTypes = {
    //myProp: PropTypes.object.isRequired
    title: PropTypes.string.isRequired
}

ScreenHeader.defaultProps = {
    //myProp: <defaultValue>
}

export default ScreenHeader
