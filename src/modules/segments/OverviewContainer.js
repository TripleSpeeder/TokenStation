import React, {Component} from 'react'
import ScreenHeader from '../layout/ScreenHeader'
import OverviewBodyContainer from './OverviewBodyContainer'
import OverviewOptions from './OverviewOptions'
import {Divider} from 'semantic-ui-react'

class OverviewContainer extends Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            showEmpty: true,
            groupBy: 'tokenId',
        }
    }

    toggleShowEmpty = () => {
        this.setState({showEmpty: !this.state.showEmpty})
    }

    setGroupBy = (e, { value}) => {
        this.setState({groupBy: value})
    }

    render() {
        const {showEmpty, groupBy} = this.state

        return (
            <React.Fragment>
                <ScreenHeader title={'Overview'}/>
                <OverviewOptions toggleShowEmpty={this.toggleShowEmpty}
                                 showEmpty={showEmpty}
                                 setGroupBy={this.setGroupBy}
                                 groupBy={groupBy}
                />
                <Divider/>
                <OverviewBodyContainer showEmpty={showEmpty} groupBy={groupBy}/>
            </React.Fragment>
        )
    }
}

export default OverviewContainer
