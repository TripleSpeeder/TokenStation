import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {Label, Item, Button, Icon} from 'semantic-ui-react'
import Blockies from 'react-blockies'
import {Link} from 'react-router-dom'

class Token extends Component {

    render() {
        const {address, name, symbol, description, website, decimals, loading} = this.props.token
        const {tokenEventsLinkOptions} = this.props
        let imageUrl = this.props.token.imageUrl
        if (!imageUrl) {
            imageUrl = "Silvercoin.png"
        }
        const {supply} = this.props.token.supply
        let supplyValue = supply ? supply.toFixed(0) : <Icon loading name='spinner'/>

        let meta = null
        if (website) {
            meta = <Item.Meta><a href={website} target='_blank'>{website}</a></Item.Meta>
        }

        let eventLink = <Link to={tokenEventsLinkOptions}>{name}</Link>

        return (
            <Item>
                <Item.Image size='tiny'>
                    <Blockies seed={address.toLowerCase()}
                              size={8}
                              scale={8}
                    />
                </Item.Image>
                <Item.Content>
                    <Item.Header>{eventLink} ({symbol})</Item.Header>
                    {meta}
                    <Button floated='right'
                            size='small'
                            circular
                            icon='refresh'
                            loading={loading}
                            onClick={this.props.handleRefresh}
                    />
                    <Item.Description>
                        {description}
                    </Item.Description>
                    <Label.Group>
                        <Label>
                            Supply:
                            <Label.Detail>{supplyValue}</Label.Detail>
                        </Label>
                        <Label>
                            Decimals:
                            <Label.Detail>{decimals.e}</Label.Detail>
                        </Label>
                        <Label as='a' href={this.props.etherscanUrl} target='_blank'>
                            Contract:
                            <Label.Detail>{address}</Label.Detail>
                        </Label>
                    </Label.Group>
                </Item.Content>
            </Item>
        )
    }
}

Token.propTypes = {
    token: PropTypes.object.isRequired,
    loadingBalance: PropTypes.bool,
    handleRefresh: PropTypes.func.isRequired,
    etherscanUrl: PropTypes.string.isRequired,
}

Token.defaultProps = {
    loadingBalance: false
}

export default Token
