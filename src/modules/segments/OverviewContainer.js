import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ScreenHeader from "../layout/ScreenHeader"
import OverviewBodyContainer from "./OverviewBodyContainer"
import OverviewOptions from "./OverviewOptions"
import {Divider} from "semantic-ui-react"

class OverviewContainer extends Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            showEmpty: true,
        }
    }

    toggleShowEmpty = () => {
        this.setState({showEmpty: !this.state.showEmpty})
    }

    render() {
        const {showEmpty} = this.state

        return (
            <React.Fragment>
                <ScreenHeader title={'Overview'}/>
                <OverviewOptions toggleShowEmpty={this.toggleShowEmpty} showEmpty={showEmpty}/>
                <Divider/>
                <OverviewBodyContainer showEmpty={showEmpty}/>
            </React.Fragment>
        )
    }
}

OverviewContainer.propTypes = {
}

OverviewContainer.defaultProps = {
    //myProp: <defaultValue>
}

const mapStateToProps = state => {
}

export default connect(mapStateToProps)(OverviewContainer)