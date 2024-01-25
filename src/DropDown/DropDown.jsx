import React, { useCallback, useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { debounce } from 'lodash';


import './DropDown.scss';


const OPTIONS = [
    { name: '<1M', value: 1000000 },
    { name: '<5M', value: 5000000 },
    { name: '<10M', value: 10000000 },
];

const DropDown = forwardRef(({ onChange = () => null, defaultValue = '' }, ref) => {
    const [inputField, setInputField] = useState(defaultValue);
    const [isHidden, setIsHidden] = useState(true);

    useImperativeHandle(ref, () => ({
        onReset,
        getValue
    }), [inputField]);

    const getValue = () => {
        return inputField
    }

    const onClickHandler = ({ name, value }) => {
        setInputField(value);
        setIsHidden(true)
        return onChange(value)
    }

    const updateParentCompnent = (value) => {
        return onChange(value)
    }

    const debounceLoadData = useCallback(debounce(updateParentCompnent, 1000), []);

    const onChangeHandler = (e) => {
        setInputField(e.target.value)
        debounceLoadData(e.target.value)
    }

    const onClickInputHandler = () => {
        setIsHidden(!isHidden)
    }

    const onReset = () => {
        setInputField('')
    }

    return (
        <div className='dropdownListMain'>
            <input type='number' placeholder='Enter Population' value={inputField} className='dropdownInput' onClick={onClickInputHandler} onChange={onChangeHandler} />
            {!isHidden && <div className='dropdownListWrapper' >
                {OPTIONS.map(({ name, value }) => {
                    return <div key={value} onClick={() => onClickHandler({ name, value })} className='dropdownList'>{name}</div>
                })}
            </div>}

        </div>

    )
})


export default DropDown;