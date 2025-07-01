// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingEligibility {
    uint public minAge = 18;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function checkEligibility(uint age) public view returns (bool) {
        if (age >= minAge) {
            return true;
        } else {
            return false;
        }
    }

    function updateMinAge(uint newMinAge) public {
        require(msg.sender == owner, "Chỉ chủ sở hữu mới được cập nhật");
        minAge = newMinAge;
    }
}
