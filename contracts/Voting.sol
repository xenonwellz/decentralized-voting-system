// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    struct Voter {
        bool voted;
        uint weight;
    }

    struct Poll {
        string pollName;
        Candidate[] candidates;
        uint candidatesCount;
        uint totalVotes;
        mapping(address => Voter) voters;
        bool votingOpen;
    }

    address public admin;
    mapping(address => bytes32) public registeredVoters;
    Poll[] public polls;

    constructor() {
        admin = msg.sender;
    }

    function createPoll(string memory _pollName) public onlyAdmin {
        Poll storage poll = polls.push();
        poll.pollName = _pollName;
        poll.candidatesCount = 0;
        poll.totalVotes = 0;
        poll.votingOpen = false;
    }

    function createPollWithCandidates(
        string memory _pollName,
        string[] memory _candidates
    ) public onlyAdmin {
        createPoll(_pollName);

        for (uint i = 0; i < _candidates.length; i++) {
            addCandidate(polls.length - 1, _candidates[i]);
        }
    }

    function addCandidate(uint pollIndex, string memory name) public onlyAdmin {
        require(pollIndex < polls.length, "Invalid poll index");
        polls[pollIndex].candidates.push(
            Candidate(polls[pollIndex].candidatesCount, name, 0)
        );
        polls[pollIndex].candidatesCount++;
    }

    function getVoteCandidate(
        uint _pollIndex,
        uint _index
    ) public view returns (Candidate memory) {
        return polls[_pollIndex].candidates[_index];
    }

    function getPollsCount() public view returns (uint) {
        return polls.length;
    }

    function register(string memory passphrase) public {
        require(
            !(registeredVoters[msg.sender] != 0),
            "You have already registered"
        );
        bytes32 _p = keccak256(abi.encodePacked(passphrase));
        registeredVoters[msg.sender] = _p;
    }

    function hasVoted(uint _poll) public view returns (bool) {
        return polls[_poll].voters[msg.sender].voted;
    }

    function vote(
        uint pollIndex,
        uint candidateId,
        string memory passphrase
    ) public {
        require(pollIndex < polls.length, "Invalid poll index");
        Poll storage poll = polls[pollIndex];
        require(registeredVoters[msg.sender] != 0, "You are not registered");
        require(!poll.voters[msg.sender].voted, "You have already voted");
        bytes32 _p = keccak256(abi.encodePacked(passphrase));
        require(registeredVoters[msg.sender] == _p, "Incorrect passphrase");
        require(candidateId < poll.candidatesCount, "Invalid candidate");
        poll.voters[msg.sender].voted = true;
        poll.voters[msg.sender].weight = 1;
        poll.candidates[candidateId].voteCount += poll
            .voters[msg.sender]
            .weight;
        poll.totalVotes += poll.voters[msg.sender].weight;
    }

    function openVoting(uint pollIndex) public onlyAdmin {
        require(pollIndex < polls.length, "Invalid poll index");
        Poll storage poll = polls[pollIndex];
        require(!poll.votingOpen, "Voting is already open");
        poll.votingOpen = true;
    }

    function closeVoting(uint pollIndex) public onlyAdmin {
        require(pollIndex < polls.length, "Invalid poll index");
        Poll storage poll = polls[pollIndex];
        require(poll.votingOpen, "Voting is not open");
        poll.votingOpen = false;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }
}
