import React from 'react';
import { NavLink } from 'react-router-dom';

const PollList = ({ poll, id }) => {
    return (
        <div className="bg-white rounded-md shadow flex overflow-hidden mb-4">
            <div className='w-full p-3'>
                <p><span className="font-bold">Poll Name:</span> {poll.pollName}</p>
                <p><span className="font-bold">Status:</span> {poll.votingOpen ? "Opened" : "Closed"}</p>
                <p><span className="font-bold">Candidate Count:</span> {poll.candidatesCount}</p>
                <p><span className="font-bold">Total Votes:</span> {poll.totalVotes}</p>
            </div>
            <NavLink to={`/poll/${id}`} className="w-[100px] flex-shrink-0 flex items-center hover:bg-sky-800 hover:text-white justify-center font-semibold p-3">View</NavLink>
        </div>
    );
}

export default PollList;
