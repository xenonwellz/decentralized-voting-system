import React, { useContext, useEffect, useState } from 'react';
import PageLayout from '../components/PageLayout';
import PollList from '../components/PollList';
import { Web3Context } from '../utils/contexts/Contract';

const Home = () => {

    const { contract } = useContext(Web3Context);
    const [polls, setPolls] = useState({});

    const getPolls = async () => {
        const _polls = await contract.methods.getPollsCount().call();
        // console.log(_polls - 1);

        const pollObj = {};
        for (let i = 0; i < _polls; i++) {
            pollObj[i] = await contract.methods.polls(i).call();
        }
        setPolls(pollObj);
    }

    useEffect(() => {
        getPolls();
    }, [])

    return (
        <PageLayout>
            <div className="p-4">
                {Object.keys(polls).map((poll) =>
                    <PollList poll={polls[poll]} id={poll} key={poll} ></PollList>
                )}
            </div>
        </PageLayout>
    );
}

export default Home;
