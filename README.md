# TokenStation

## Planned functionality

 * Show list of all known Token contracts with details (address, supply, decimals, website, name, ...)
 * Show all token balances of provided ethereum address(es)
 * Transfer tokens
 * show allowances (possible?)
 
### UI ideas
 * **Overview page:** Show a summary of token balances for all watched addresses, grouped by Token 
 (maybe option to group by address?)
 * **Token details page:** Show balance for each watched address and according transfer event history. 
 Include filter option to only show details for selected/matched address. 
 * **Address details page:** Show balance for each token and according transfer event history. 
 Include filter option to only show transfer events for selected/matched token.
 * **Token transfer dialog:** Allow transfering a token from owned address to arbitrary receiver address.
 Should be reachable from any of the above pages, kind of context menu for owned address that has positive balance.
 * **Address manager:** A component that lists all watched addresses and allows to add/remove entries. Could be a 
 popup accessible from sidebar or top menu
 * **Token manager:** Allow user to select which tokens he wants to track (or "select all"). Needed as most people
 will know in advance which tokens they own and want to manage. "Select all" is mostly only relevant to
 check if there was any new airdrop happening.
 * **Cache manager:** A component that allows viewing and deleting/resetting all localStorage data
 * **Token info page:** A component showing more details of a token (description, website, contract address, contract
  source, decimals, image, ratings, ...). Could be a modal popup, so it can be opened anywhere without interfering 
  with users workflow. 
 * **"Add token" page:** Allows manually adding a token contract that is not available in the registry. 
