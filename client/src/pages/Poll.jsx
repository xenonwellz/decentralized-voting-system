import React, { useEffect, useState, useContext } from 'react';
import PageLayout from '../components/PageLayout';
import { useParams } from 'react-router-dom';
import { Web3Context } from '../utils/contexts/Contract';
import Candidate from '../components/Candidate';

const Poll = () => {
    const { contract, account } = useContext(Web3Context);
    const { poll } = useParams()
    const [pollData, setPollData] = useState({});
    const [candidates, setCandidates] = useState([]);
    const [admin, setAdmin] = useState("");

    useEffect(() => {
        getPollDetails();
    }, []);

    useEffect(() => {

        getCandidates();

    }, [pollData]);

    const getCandidates = async () => {
        const _candidates = [];

        for (let index = 0; index < pollData.candidatesCount; index++) {
            const data = await contract.methods.getVoteCandidate(poll, index).call();
            _candidates.push(data);
        }

        setCandidates(_candidates);
    }

    const toggleVote = async () => {
        if (pollData.votingOpen) {
            await contract.methods.closeVoting(poll).send({ from: account }).then(() => {
                console.log("Sucessfully closed Vote.")
                alert("Sucessfully closed Vote.");
            });
        } else {
            await contract.methods.openVoting(poll).send({ from: account }).then(() => {
                console.log("Sucessfully Opened Vote.")
                alert("Sucessfully Opened Vote.");
            });
        }
        getPollDetails();
    }

    const getPollDetails = async () => {
        const _poll = await contract.methods.polls(poll).call();
        setPollData(_poll);
        const _admin = await contract.methods.admin().call();
        setAdmin(_admin);
    }

    return (
        <PageLayout>
            <div className="bg-white rounded-md shadow overflow-hidden mb-4">
                <div className='w-full p-3 grid grid-cols-4'>
                    <p><span className="font-bold">Poll Name:</span> {pollData.pollName}</p>
                    <p><span className="font-bold">Status:</span> {pollData.votingOpen ? "Opened" : "Closed"}</p>
                    <p><span className="font-bold">Candidate Count:</span> {pollData.candidatesCount}</p>
                    <p><span className="font-bold">Total Votes:</span> {pollData.totalVotes}</p>
                </div>
                {admin.toUpperCase() === account.toUpperCase() && <div className='p-3'>
                    <button className="primary bg-sky-700 hover:bg-sky-800 inline-block p-2 px-16 text-white rounded-xl" onClick={toggleVote}>{pollData.votingOpen ? 'Close' : "Open"} Vote</button>
                </div>}
            </div>
            <div className="mt-4">
                <div className="font-semibold bg-white rounded-xl p-3 mb-4">Candidates Vote: </div>
                <div className="bg-white rounded-xl p-3 mb-4 grid grid-cols-4 gap-4">
                    {candidates.map((candidate) => <Candidate key={candidate.id} refresh={getPollDetails} canVote={pollData.votingOpen} poll={poll} candidate={candidate} />)}
                </div>
            </div>
        </PageLayout>
    );
}

export default Poll;
