import React, { useRef, useState } from 'react'
import { debounce } from 'lodash';

import './Header.scss';
import DropDown from '../DropDown/DropDown';



const defaultState = {
    countryName: '',
    population: ''
}

export default function Header({ setState: setStateParent }) {

    const [state, setState] = useState(defaultState)

    const dropDownRef = useRef(true);

    const onChangeHandler = (e) => {
        const { value, name } = e.target
        setState((state) => ({ ...state, [name]: value }))
    }

    const onClear = (e) => {
        e.preventDefault();
        setState(defaultState)
        dropDownRef.current.onReset();
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const population = dropDownRef.current.getValue();
        setStateParent({ ...state, population });
    }


    // Future use: To update data in realtime   
    // const onChangeDropdownHandler = (value) => {

    //     setState((state) => {

    //         const newState = { ...state, population: Number(value) }
    //         setStateParent(newState);

    //         return newState
    //     })
    // }


    return (
        <div >
            <div className='heading'>Countries Info</div>
            <form className='formContainer' onSubmit={onSubmit}>
                <div className='lhs'>
                    <input className='countryName' onChange={onChangeHandler} name='countryName' type='text' placeholder='Country Name' value={state.countryName} />

                    <DropDown ref={dropDownRef} defaultValue={defaultState.population} />

                    <button className='clearBtn' onClick={onClear} >Clear</button>

                </div>

                <div>
                    <button className='showAllBtn' type='submit'>Show All countries</button>
                </div>

            </form>


        </div >
    )
}
