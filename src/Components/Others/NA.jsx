import { t } from 'i18next'
import React from 'react'

function NA({ message = t('No Data Available!') }) {
    return (
        <div className='text-center font-semibold text-[#BDBDBD] italic text-lg my-10'>{message}</div>
    )
}

export default NA