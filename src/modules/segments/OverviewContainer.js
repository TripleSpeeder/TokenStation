import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Overview from './Overview'
import {connect} from 'react-redux'

class OverviewContainer extends Component {
    render() {
        const {hasAccounts} = this.props
        return (
            <Overview hasAccounts={hasAccounts}/>
        )
    }
}

OverviewContainer.propTypes = {
    hasAccounts: PropTypes.bool.isRequired,
}

OverviewContainer.defaultProps = {
    //myProp: <defaultValue>
}

const mapStateToProps = state => {
    const hasAccounts = (state.addresses.allIds.length > 0)

    return {
        hasAccounts,
    }
}

export default connect(mapStateToProps)(OverviewContainer)
