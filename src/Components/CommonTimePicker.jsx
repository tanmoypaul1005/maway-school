import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { TimePicker } from 'antd';
import moment from 'moment/moment';

const CommonTimePicker = ({
    format = 'HH:mm',
    showNow = false,
    size = 'large',
    value = "00:00",
    onChange,
    label = "",
    required = false,
    withStar = true
}) => {

    return (
        <div>
            <div className={`text-cHighlighted important_text mb-s8 w-full ${required && withStar ? 'req-field' : ''}`}>{label}</div>
            <TimePicker
                style={{
                    width: '100%', backgroundColor: "#F4F4F4", borderRadius: "4px", height: "39px", border:"0px solid black"
                }}
                format={format}
                showNow={showNow}
                size={size}
                value={moment(value, "HH:mm")}
                suffixIcon={<DownOutlined />}
                onSelect={onChange}
            />
        </div>
    );
};

export default CommonTimePicker;