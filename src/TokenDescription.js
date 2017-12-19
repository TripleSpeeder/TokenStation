import React, {Component, PropTypes} from 'react'
import {Header, Icon, Image, Label, Item, Segment} from "semantic-ui-react"

class TokenDescription extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        const {name, symbol, description, website, imageUrl, decimals, supply, contract, balance} = this.props.token
        return (
            <Item>
                <Item.Image size='tiny' src={imageUrl}></Item.Image>
                <Item.Content verticalAlign='top'>
                    <Item.Header>{name} ({symbol})</Item.Header>
                    <Segment basic floated='right'>
                        <Label size='big' color='teal'>
                            {balance ? balance.toFixed(4):''}
                        </Label>
                    </Segment>
                    <Item.Meta>
                        <a href={website} target='_blank'>{website}</a>
                    </Item.Meta>
                    <Item.Description>
                        {description}
                    </Item.Description>
                    <Label.Group>
                        <Label>
                            Supply:
                            <Label.Detail>{supply.toFixed(0)}</Label.Detail>
                        </Label>
                        <Label>
                            Decimals:
                            <Label.Detail>{decimals.toFixed(0)}</Label.Detail>
                        </Label>
                        <Label as='a' href='https://etherscan.io/address/0x267be1c1d684f78cb4f6a176c4911b741e4ffdc0'>
                            Contract:
                            <Label.Detail>{contract}</Label.Detail>
                        </Label>
                    </Label.Group>
                </Item.Content>
            </Item>
        )
    }
}

TokenDescription.propTypes = {
    token: PropTypes.object.isRequired
}

TokenDescription.defaultProps = {
    //myProp: <defaultValue>
}

export default TokenDescription
