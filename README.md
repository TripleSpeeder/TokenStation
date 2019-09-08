# TokenStation.io

Keep track of ERC20 token balances in a decentralized way. There is no database on the server, this is just 
a plain website. Any data is either retrieved directly from the Ethereum blockchain (token balances) or 
provided by the user (watched addresses). Watched addresses and tracked tokens are stored in browser local
storage, so you only need to set this up once per browser.

Site is live at https://tokenstation.io.

## Current functionality
 * **Overview page:** Show a summary of token balances for all watched addresses, grouped by Token (maybe 
 option to group by address?). Include balance for each individual address.
 * **Transfer events:** Show transfer history of tokens.
 * **Address manager:** A component that lists all watched addresses and allows to add/remove entries. Could be a 
 popup accessible from sidebar or top menu
 * **Token manager:** Allow user to select which tokens he wants to track (or "select all"). Needed as most people
 will know in advance which tokens they own and want to manage. "Select all" is mostly only relevant to
 check if there was any new airdrop happening.

## Planned functionality
 * Show more details for Token contracts (website, icon, supply, ...)
 * Transfer tokens
 * show allowances (Is this even possible?)
 * Support other token standards

### Future UI
 * **Token transfer dialog:** Allow transfering a token from owned address to arbitrary receiver address.
 Should be reachable from any of the above pages, kind of context menu for owned address that has positive balance.
 * **Cache manager:** A component that allows viewing and deleting/resetting all localStorage data
 * **"Add token" page:** Allows manually adding a token contract that is not available in the registry. 
 * **Token info page:** A component showing more details of a token (description, website, contract address, contract
  source, decimals, image, ratings, ...). Could be a modal popup, so it can be opened anywhere without interfering 
  with users workflow. 


# Dev notes
## Deployment
Site is hosted on github pages. To deploy a new build, run:

`npm run build`

This will create a new build in the "build" directory. To publish this build to github pages run:

`npm run deploy`

This will push the contents of the "build" folder to the gh-pages branch, which is being hosted by github pages.

## Update list of token contracts
Token contracts information is taken from https://github.com/ethereum-lists/tokens. Updating to the latest
list currently is a manual process. From the projects documentation:

>Just go to [the commit-list](https://github.com/ethereum-lists/tokens/commits/master) and click on the green checkmark behind the last commit. There you see kontinuum/run - and the details link there brings to the assembled files on IPFS.

Download the file matching to the desired network (currently supported: Mainnet (1), Ropsten (3), Rinkeby(4) and Kovan
(42)) and place it in the public folder, following the name schema `tokens_<networkID>.json`. 

Alternatively (if the ipfs download link times out as usual...) check out the ethereum-lists project and run `./gradlew run` to compile the token contract
lists on your own. Then copy over the resulting files from the `build/output` directory.
