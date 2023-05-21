import React from 'react'
import { k_role } from '../../../App/Utility/const';
import AdminFaq from './AdminFaq';
import SchoolFAQ from './school/SchoolFAQ';

function FaqManagement() {

    const role=localStorage.getItem('maway_role')

    return (
        <>
            {role === k_role.admin ? <AdminFaq /> : <SchoolFAQ />}
        </>
    )
}

export default FaqManagement
