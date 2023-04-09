import React, { useEffect, useState, useContext } from 'react';
import PageLayout from '../components/PageLayout';
import InputList from '../components/InputList';
import { Web3Context } from '../utils/contexts/Contract';

const NewPoll = () => {
    const { contract, account } = useContext(Web3Context);

    const [candidateCount, setCandidateCount] = useState(2);
    const [pollName, setPollName] = useState("");

    const [candidates, setCandidates] = useState([]);

    const metadataChange = (i, text) => {
        const newArr = [];

        for (let index = 0; index < candidates.length; index++) {
            newArr.push(candidates[index]);
        }

        newArr[i] = text;
        setCandidates(newArr);
    }

    const removeItem = (i) => {
        if (candidateCount > 2) {
            const newArr = [];

            for (let index = 0; index < candidates.length; index++) {
                if (index !== i) {
                    newArr.push(candidates[index]);
                }
            }

            setCandidates(newArr);
            setCandidateCount(candidateCount - 1);
        }
    }

    const submit = async () => {
        const newArr = [];

        for (let index = 0; index < candidates.length; index++) {
            if (typeof candidates[index] !== "undefined" && candidates[index] !== "") {
                newArr.push(candidates[index]);
            }
        }

        if (newArr.length < 2) {
            console.log('====================================');
            const err = 'There must be at least 2 candidates';
            console.log(err);
            alert(err);
            console.log('====================================');
            return;
        }
        if (!pollName) {
            console.log('====================================');
            console.log('Poll name cannot be empty.');
            console.log('====================================');
            return;
        }


        await contract.methods.createPollWithCandidates(pollName, newArr).send({ from: account }).then(async (err, hash) => {
            setPollName("");
            setCandidateCount(2);
            setCandidates([]);
            alert("You have added a poll successfully.");
        });




    }

    const addItem = () => {
        setCandidateCount(candidateCount + 1);
    }

    const CandidateInput = () => {
        let list = [];
        for (let i = 0; i < candidateCount; i++) {
            list.push(<InputList key={i} count={candidateCount}
                i={i}
                handleChange={metadataChange}
                removeItem={removeItem} id={i}
                list={candidates}
                addItem={addItem} />)
        }
        return list;
    }

    return (
        <PageLayout>
            <label htmlFor="poll_name">Poll Name:</label>
            <input type="text" name="poll_name" id='poll_name' value={pollName} onChange={(e) => setPollName(e.target.value)} required />
            <div className="my-5 border-t"></div>
            <div className="font-semibold">Add Candidates</div>

            {CandidateInput()}

            <div className="mt-4">
                <button className="primary bg-sky-600 hover:bg-sky-700 inline-block p-3 px-16 text-white rounded-xl" onClick={submit}>Submit</button>
            </div>
        </PageLayout>
    );
}

export default NewPoll;
