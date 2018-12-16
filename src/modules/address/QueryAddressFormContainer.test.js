import React from "react"
import Enzyme, {shallow} from 'enzyme'
import {QueryAddressFormContainer} from './QueryAddressFormContainer'
import Adapter from "enzyme-adapter-react-16"
import QueryAddressForm from './QueryAddressForm'

Enzyme.configure({adapter: new Adapter()})

function setup() {
    const wrapper = shallow(<QueryAddressFormContainer/>)
    return {
        wrapper
    }
}

describe("QueryAddressFormContainer", () => {
    const validAddress = '0x267be1C1D684F78cb4F6a176C4911b741E4Ffdc0'
    const validENSName = 'm-bauer.eth'
    const invalidInput = 'invalid'

    test("renders", () => {
        const {wrapper} = setup()
        expect(wrapper.exists()).toBe(true)
    })

    test("Initial state", () => {
        const {wrapper} = setup()
        const inputProps = wrapper.find('QueryAddressForm').props()
        expect(inputProps.loading).toBe(false)
        expect(inputProps.error).toBe(true)
        expect(inputProps.disabled).toBe(true)
        expect(inputProps.address).toEqual('')
        expect(inputProps.ensName).toEqual('')
        expect(inputProps.value).toEqual('')
    })

    test("invalid input", () => {
        const {wrapper} = setup()
        const event = {
            target: { value: invalidInput }
        };
        wrapper.instance().handleChange(event)
        const inputProps = wrapper.find('QueryAddressForm').props()
        expect(inputProps.loading).toBe(false)
        expect(inputProps.error).toBe(true)
        expect(inputProps.disabled).toBe(true)
        expect(inputProps.address).toEqual('')
        expect(inputProps.ensName).toEqual('')
        expect(inputProps.value).toEqual(invalidInput)
    })

    test("valid address is accepted", () => {
        const {wrapper} = setup()
        const event = {
            target: { value: validAddress }
        };
        wrapper.instance().handleChange(event)
        const inputProps = wrapper.find('QueryAddressForm').props()
        expect(inputProps.loading).toBe(false)
        expect(inputProps.error).toBe(false)
        expect(inputProps.disabled).toBe(false)
        expect(inputProps.address).toEqual(validAddress)
        expect(inputProps.ensName).toEqual('')
        expect(inputProps.value).toEqual(validAddress)
    })

    test("valid ENSname starts resolving", () => {
        const {wrapper} = setup()
        const event = {
            target: { value: validENSName }
        };
        wrapper.instance().handleChange(event)
        const inputProps = wrapper.find('QueryAddressForm').props()
        expect(inputProps.loading).toBe(true)
        expect(inputProps.error).toBe(false)
        expect(inputProps.disabled).toBe(true)
        expect(inputProps.address).toEqual('')
        expect(inputProps.ensName).toEqual(validENSName)
        expect(inputProps.value).toEqual(validENSName)
    })
})
