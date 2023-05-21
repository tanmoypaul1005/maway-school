import React, { useEffect, useState } from 'react';

function SelectInput({
    label,
    placeholder,
    required,
    selectOptionOnChange,
    value,
    disabled=false,
    dataArray,  withStar = true,
}) {
    const [selectArray, setSelectArray] = useState([]);

    useEffect(() => {
        if (dataArray) setSelectArray(dataArray);
        else setSelectArray([
            {
                title: "Option 01",
                value: 10,
                selected: false
            }, {
                title: "Option 02",
                value: 20,
                selected: false,
            },
        ]);
    }, [dataArray]);

    // useEffect(() => { console.log("SELECTION PASSED VALUE:::", value); }, [value]);

    return (
        <div className='capitalize'>
            <div className={`text-cHighlighted important_text mb-s8 w-full ${(required === true && withStar === true) ? "req-field" : ""}`}>{label}</div>

            <select
                disabled={disabled}
                required={required}
                onChange={(e) => {
                    selectOptionOnChange(e.target.value);
                    console.log(e.target.value);
                }}
                defaultValue={value}
                value={value}
                className="capitalize cursor-pointer border-cInputBorder bg-cTextFieldGrey rounded-br4 w-full p-2.5 border-r-[10px] border-r-transparent">
                <option className='text-cMainBlack' selected value='' >{placeholder}</option>
                {
                    selectArray?.map((item, index) =>
                        item?.value ?
                            <option
                                key={index}
                                className='capitalize cursor-pointer py-s10 text-cMainBlack'
                                value={item?.value}
                                selected={item?.selected === true ? true : false}
                            >{item?.title}</option>
                            : ""
                    )
                }
            </select>
        </div>
    )
}

export default SelectInput
