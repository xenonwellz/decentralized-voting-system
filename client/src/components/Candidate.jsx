import React, { useContext, useEffect, useState } from 'react';
import { Web3Context } from '../utils/contexts/Contract';

const Candidate = ({ candidate, canVote, poll, refresh }) => {
    const { contract, account, web3 } = useContext(Web3Context);
    const [password, setPassword] = useState("");
    const [voteMode, setVoteMode] = useState(false);
    const [hasVoted, setHasVoted] = useState(true);

    const checkVoted = async () => {
        const hasVoted = await contract.methods.hasVoted(poll).call().then();
        setHasVoted(hasVoted);
    }

    useEffect(() => {
        checkVoted();
    }, [])

    const vote = async () => {
        await contract.methods.vote(poll, candidate.id, password).send({ from: account }).then((err) => {
            alert(`You have successfully voted for ${candidate.name}`);
            setVoteMode(false);
            refresh();
        }).catch((err) => {
            if (err.message.includes("You are not registered")) {
                alert("Your account is not registered,You cannot vote.");
            } else if (err.message.includes("Incorrect passphrase")) {
                alert("The password you entered is incorrect.");
            } else {
                alert("An unknown error occured.");
            }
        })
    }

    return (
        <div className="rounded-2xl bg-gray-100 border">
            <p className='text-center text-3xl font-semibold p-3'>{candidate.name}</p>
            <div className="flex">
                {!voteMode ? <><p className={'p-2 text-center bg-sky-800 text-white w-full rounded-bl-2xl' + (!(canVote & !hasVoted) ? ' rounded-br-2xl' : '')}>{candidate.voteCount}</p>
                    {canVote & !hasVoted ? <button className='p-2 text-center bg-sky-800 text-white w-full font-semibold hover:bg-sky-900 border-l rounded-br-2xl' onClick={() => setVoteMode(true)}>Vote</button> : null} </> :
                    <div className='flex w-full relative'>
                        <button className='h-full p-2 text-white flex items-center justify-center bg-red-800 absolute left-0 top-0 border-t border-transparent rounded-bl-2xl' onClick={() => setVoteMode(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <input onChange={(e) => setPassword(e.target.value)} placeholder='password' className='fix border-white w-full rounded-b-2xl p-2 px-12 focus:border-sky-800 focus:ring focus:ring-sky-800/30 focus:outline-none' />

                        <button className='h-full p-2 text-white flex items-center justify-center bg-sky-800 absolute right-0 top-0 rounded-br-2xl' onClick={vote}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>

                        </button>
                    </div>
                }
            </div>
        </div>
    );
}

export default Candidate;
