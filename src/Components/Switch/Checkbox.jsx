import React, { useEffect, useState } from 'react'
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';

const Checkbox = ({className='', className2='', className3='', text='', init_data=false, onChange=()=>{}}) => {

    const [is_checked, setIsChecked] = useState(init_data)
    
    const toggle = () => {
        setIsChecked(!is_checked)
    }

    useEffect(() => {
        onChange(is_checked)
    }, [is_checked])
    
    
    return (
        <div onClick={toggle} className={`cp flex items-center space-x-2 select-none ${className}`}>
            {is_checked && <ImCheckboxChecked className={`text-blue-600 ${className2}`}/>}
            {!is_checked && <ImCheckboxUnchecked className={`text-gray-600 ${className2}`}/>}

            <div className={`inline-block text-gray-800 cp ${className3}`}>{text}</div>
        </div>
    );
}
 
export default Checkbox;