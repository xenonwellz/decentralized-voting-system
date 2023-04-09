import React from 'react';

const InputList = ({ count, addItem, removeItem, i, handleChange, list }) => {
    return (
        <div className='flex items-stretch gap-2 mb-3'>
            <input type="text" onChange={(e) => handleChange(i, e.target.value)} value={list[i] ?? ""} />
            {(i === 0) ? <button className='h-full p-2.5 rounded-md text-white flex items-center justify-center bg-green-600' onClick={addItem}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button> : null}
            {i >= 1 && i !== count ? <button className='h-full p-2.5 rounded-md text-white flex items-center justify-center bg-red-600' onClick={() => removeItem(i)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                </svg>
            </button> : null}
        </div>
    );
}

export default InputList;
