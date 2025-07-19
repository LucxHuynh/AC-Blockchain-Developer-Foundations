// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() ERC20("MyToken", "MTK") {
        // Mint 1,000,000 tokens to deployer (18 decimals)
        _mint(msg.sender, 1000000 * 10**decimals());
    }
}