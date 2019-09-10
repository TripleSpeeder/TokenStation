import React from 'react'
import PropTypes from 'prop-types'
import {addValidationRule} from 'formsy-react'
import {Grid, Header, List, Modal, Segment} from 'semantic-ui-react'
import {Label} from 'semantic-ui-react'
import {Form, Input} from 'formsy-semantic-ui-react'

const TransferForm = (props) => {
    const {
        web3, onValidSubmit, onClose,
        fromAddress,
        tokenName, tokenSymbol, tokenBalance,
        etherBalance, gasCosts } = props

    const errorLabel = <Label color="red" pointing/>

    addValidationRule('isEthereumAddress', (values, value) => (web3.isAddress(value)))
    addValidationRule('isLessThanOrEqual', (values, value, max) => {
        try {
            const bnValue = web3.utils.toBN(value)
            const bnMax = web3.toBN(max)
            return bnValue.lte(bnMax)
        }
        catch (err) {
            // if anything goes wrong with BigNumber, just fail validation
            return false
        }
    })

    return (
        <Modal open onClose={onClose} size={'small'} closeIcon>
            <Modal.Header>Transfer '{tokenName}' Tokens</Modal.Header>
            <Modal.Content>

                <Form noValidate onValidSubmit={onValidSubmit}>
                    <Segment>
                        <Grid columns={2}>
                            <Grid.Row>
                                <Grid.Column width={4}>
                                    <strong>Account address:</strong>
                                </Grid.Column>
                                <Grid.Column width={5}>{fromAddress}</Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={4}>
                                    <strong>Account balance:</strong>
                                </Grid.Column>
                                <Grid.Column width={5}>
                                    <List>
                                        <List.Item>
                                            {tokenBalance.toFixed()} {tokenSymbol}
                                        </List.Item>
                                        <List.Item>{etherBalance.toFixed()} ETH</List.Item>
                                    </List>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>

                    <Segment>
                        <Header size="small">To Address</Header>
                        <Form.Group>
                            <Input width={6}
                                   name="toAddress"
                                   placeholder="Receiving ethereum address"
                                   required
                                   instantValidation
                                   validations="isEthereumAddress"
                                   validationErrors={{
                                       isEthereumAddress: 'This is not a valid Ethereum address',
                                       isDefaultRequiredValue: 'To Address is Required',
                                   }}
                                   errorLabel={errorLabel}
                            />
                        </Form.Group>

                        <Header size="small">Amount to send</Header>
                        <Form.Group>
                            <Input width={6}
                                   name="amount"
                                   placeholder="Enter amount"
                                   label={tokenSymbol}
                                   labelPosition="right"
                                   required
                                   instantValidation
                                   validations={'isNumeric,isLessThanOrEqual:' + tokenBalance.toFixed()}
                                   validationErrors={{
                                       isNumeric: 'This is not a valid number',
                                       isDefaultRequiredValue: 'Amount is Required',
                                       isLessThanOrEqual: 'Maximum available balance is ' + tokenBalance.toFixed()
                                   }}
                                   errorLabel={errorLabel}
                            />
                        </Form.Group>
                    </Segment>

                    <Segment>
                        <Header size="small">Estimated Gas costs</Header>
                        <Form.Group>
                            <Input width={6}
                                   name="gasCosts"
                                   label="ETH"
                                   labelPosition="right"
                                   readOnly
                                   value={gasCosts}
                                   validations={'isLessThanOrEqual:' + etherBalance.toFixed()}
                                   instantValidation
                                   validationErrors={{
                                       isLessThanOrEqual: 'Not enough ether to cover gas costs'
                                   }}
                                   errorLabel={errorLabel}
                            />
                        </Form.Group>
                    </Segment>
                    <Form.Group>
                        <Form.Button content="Submit" color="green"/>
                    </Form.Group>

                </Form>

            </Modal.Content>
        </Modal>
    )
}

TransferForm.propTypes = {
    web3: PropTypes.object.isRequired
}

TransferForm.defaultProps = {
    //myProp: <defaultValue>
}

export default TransferForm
