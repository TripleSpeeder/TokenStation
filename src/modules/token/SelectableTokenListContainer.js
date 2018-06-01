import React, {Component} from 'react'
import {connect} from "react-redux"
import {Divider} from 'semantic-ui-react'
import TokenListFilterContainer from './TokenListFilterContainer'
import SelectableTokenList from "./SelectableTokenList"

class SelectableTokenListContainer extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <React.Fragment>
                <TokenListFilterContainer/>
                <Divider/>
                <SelectableTokenList
                    tokenList={this.props.allTokenIds}
                />
            </React.Fragment>
            )
    }
}

const mapStateToProps = state => {
    return {
        allTokenIds: state.tokens.allIds,
    }
}

const mapDispatchToProps = dispatch => ({
})


export default connect(mapStateToProps, mapDispatchToProps)(SelectableTokenListContainer)
