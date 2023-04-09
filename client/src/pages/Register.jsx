import React, { useState, useContext } from 'react';
import PageLayout from '../components/PageLayout';
import { Web3Context } from '../utils/contexts/Contract';

const Register = () => {
    const { contract, account } = useContext(Web3Context);
    const [password, setPassword] = useState("");

    const submit = async (e) => {

        e.preventDefault();

        if (password.length < 8) {
            alert("Password length must be greater than 8");
            return;
        }

        await contract.methods.register(password).send({ from: account }).then(() => {
            alert("You have successfully registered for voting.")
        }).catch(() => {
            alert("An error occurred.")
        });
    }

    return (
        <PageLayout>
            <form action="">
                <label htmlFor="">Password: </label>
                <input type="text" onChange={(e) => setPassword(e.target.value)} />
                <div className="mt-4">
                    <button className="primary bg-sky-600 hover:bg-sky-700 inline-block p-2 px-16 text-white rounded-xl" onClick={(e) => submit(e)}>Submit</button>
                </div>
            </form>
        </PageLayout>
    );
}

export default Register;
