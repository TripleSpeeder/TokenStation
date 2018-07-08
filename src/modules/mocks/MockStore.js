// A super-simple mock of a redux store
import {action} from '@storybook/addon-actions'
import {ADDRESS_TYPE_EXTERNAL, ADDRESS_TYPE_OWNED} from '../address/addressActions'
import {BigNumber} from 'bignumber.js'
import {BALANCE_STATES} from '../balance/balanceActions'
import {TOKEN_LIST_STATES} from '../token/tokenActions'

const addresses = {
    allIds: [
        '0xAccountAddress1',
        '0xAccountAddress2',
        '0xAccountAddress3',
        '0xAccountAddress4',
        '0xAccountAddress5',
        '0xAccountAddress6'
    ],
    byId: {
        '0xAccountAddress1': {
            address: '0xAccountAddress1',
            ensName: 'cool.stuff.eth',
            balanceState: BALANCE_STATES.INITIALIZED,
            type: ADDRESS_TYPE_OWNED,
        },
        '0xAccountAddress2': {
            address: '0xAccountAddress2',
            balanceState: BALANCE_STATES.INITIALIZED,
            type: ADDRESS_TYPE_OWNED,
        },
        '0xAccountAddress3': {
            address: '0xAccountAddress3',
            balanceState: BALANCE_STATES.INITIALIZED,
            type: ADDRESS_TYPE_EXTERNAL,
        },
        '0xAccountAddress4': {
            address: '0xAccountAddress4',
            balanceState: BALANCE_STATES.INITIALIZED,
            ensName: 'joe.doe.eth',
            type: ADDRESS_TYPE_EXTERNAL,
        },
        '0xAccountAddress5': {
            address: '0xAccountAddress5',
            balanceState: BALANCE_STATES.INITIALIZED,
            type: ADDRESS_TYPE_EXTERNAL,
        },
        '0xAccountAddress6': {
            address: '0xAccountAddress6',
            balanceState: BALANCE_STATES.INITIALIZED,
            type: ADDRESS_TYPE_EXTERNAL,
        }
    }
}

const tokens_initialized = {
    allIds: [1, 2, 3],
    trackedIds: [1,3],
    byId: {
        1: {
            address: '0x1ContractAddress',
            decimals: new BigNumber(18),
            eventIds: [],
            id: 1,
            imageUrl: null,
            loading: false,
            name: 'Arcade Network Token',
            supply: {
                loading: false,
                supply: new BigNumber(20000000)
            },
            symbol: 'ANT',
            website: null,
        },
        2: {
            address: '0x2ContractAddress',
            decimals: new BigNumber(18),
            eventIds: [],
            id: 1,
            imageUrl: null,
            loading: false,
            name: 'District0x Network Token',
            supply: {
                loading: false,
                supply: new BigNumber(1000000000000000000000000000)
            },
            symbol: 'DNT',
            website: null,
        },
        3: {
            address: '0x3ContractAddress',
            decimals: new BigNumber(18),
            eventIds: [],
            id: 1,
            imageUrl: null,
            loading: false,
            name: 'OmiseGo',
            supply: {
                loading: false,
                supply: new BigNumber(1000000000000000000000000000)
            },
            symbol: 'OMG',
            website: null,
        }
    },
    listState: {
        listState: TOKEN_LIST_STATES.INITIALIZED,
        total: 3,
        matchedTokenIds: [],
        filter: '',
        filterIsActive: false,
        showOnlyTracked: false,
        activePage: 1,
    }
}

const tokens_filtered = {
    ...tokens_initialized,
    listState: {
        ...tokens_initialized.listState,
        matchedTokenIds: [1, 2],
        filter: 'Network',
        filterIsActive: true,
        showOnlyTracked: false,
        activePage: 1,
    }
}

const tokens_filtered_nomatch = {
    ...tokens_initialized,
    listState: {
        ...tokens_initialized.listState,
        matchedTokenIds: [],
        filter: 'filterstring not matching anything',
        filterIsActive: true,
        showOnlyTracked: false,
        activePage: 1,
    }
}

const tokens_virgin = {
    allIds: [],
    byId: {},
    listState: {
        listState: TOKEN_LIST_STATES.VIRGIN,
        total: 0,
        matchedTokenIds: [],
        filter: '',
        filterIsActive: false,
        showOnlyTracked: false,
        activePage: 1,
    }
}

const tokens_loading = {
    allIds: [1,2],
    trackedIds: [],
    byId: {
        1: {
            address: '0x1ContractAddress',
            decimals: new BigNumber(18),
            eventIds: [],
            id: 1,
            imageUrl: null,
            loading: false,
            name: 'Arcade Network Token',
            supply: {
                loading: false,
                supply: new BigNumber(20000000)
            },
            symbol: 'ANT',
            website: null,
        },
        2: {
            address: '0x2ContractAddress',
            decimals: new BigNumber(18),
            eventIds: [],
            id: 1,
            imageUrl: null,
            loading: false,
            name: 'District0x Network Token',
            supply: {
                loading: false,
                supply: new BigNumber(1000000000000000000000000000)
            },
            symbol: 'DNT',
            website: null,
        },
    },
    listState: {
        listState: TOKEN_LIST_STATES.LOADING,
        total: 3,
        matchedTokenIds: [],
        filter: '',
        filterIsActive: false,
        showOnlyTracked: false,
        activePage: 1,
    }
}

const balance = {
    allIds:['b1','b2','b3','b4','b5','b6'],
    byId: {
        b1: {
            balanceId: "b1",
            addressId: "0xAccountAddress1",
            tokenId: "1",
            balance: new BigNumber('100'),
            balanceState: BALANCE_STATES.INITIALIZED
        },
        b2: {
            balanceId: "b2",
            addressId: "0xAccountAddress2",
            tokenId: "1",
            balance: new BigNumber('200'),
            balanceState: BALANCE_STATES.INITIALIZED
        },
        b3: {
            balanceId: "b3",
            addressId: "0xAccountAddress3",
            tokenId: "1",
            balance: new BigNumber('300'),
            balanceState: BALANCE_STATES.INITIALIZED
        },
        b4: {
            balanceId: "b4",
            addressId: "0xAccountAddress1",
            tokenId: "2",
            balance: new BigNumber('400'),
            balanceState: BALANCE_STATES.INITIALIZED
        },
        b5: {
            balanceId: "b5",
            addressId: "0xAccountAddress2",
            tokenId: "3",
            balance: new BigNumber('200'),
            balanceState: BALANCE_STATES.INITIALIZED
        },
        b6: {
            balanceId: "b6",
            addressId: "0xAccountAddress3",
            tokenId: "3",
            balance: new BigNumber('300'),
            balanceState: BALANCE_STATES.INITIALIZED
        }
    },
    positiveIds: ['b1','b2','b3','b4','b5','b6'],
    listState: {
        filter: '',
        matchedBalanceIds: [],
        displayCount: 10,
    }
}

const mockStore = {
    getState: () => {
        return {
            balance: balance,
            tokens: tokens_initialized,
            addresses: addresses,
        };
    },
    subscribe: () => 0,
    dispatch: action('dispatch'),
};

const mockStore_filtered = {
    getState: () => {
        return {
            balance: balance,
            tokens: tokens_filtered,
            addresses: addresses,
        };
    },
    subscribe: () => 0,
    dispatch: action('dispatch'),
};

const mockStore_nomatch = {
    getState: () => {
        return {
            balance: balance,
            tokens: tokens_filtered_nomatch,
            addresses: addresses,
        };
    },
    subscribe: () => 0,
    dispatch: action('dispatch'),
};

const mockStore_virgin = {
    getState: () => {
        return {
            balance: balance,
            tokens: tokens_virgin,
            addresses: addresses,
        };
    },
    subscribe: () => 0,
    dispatch: action('dispatch'),
};

const mockStore_loading = {
    getState: () => {
        return {
            balance: balance,
            tokens: tokens_loading,
            addresses: addresses,
        };
    },
    subscribe: () => 0,
    dispatch: action('dispatch'),
};

export default mockStore
export { mockStore_filtered }
export { mockStore_nomatch }
export { mockStore_loading }
export { mockStore_virgin }
