import React from 'react'
import { useParams } from 'react-router-dom';
import useSchoolStudentStore, { getSchoolStudentShow, schoolStudentBalancePay } from '../../../../App/Stores/school/schoolStudentStore';
import CommonModal from '../../../../Components/Modal/CommonModal';
import CommonInput from '../../../../Components/Input/CommonInput';
import CommonButton from '../../../../Components/Button/CommonButton';
import { useTranslation } from 'react-i18next';


function PayModal() {

    const { showPayModal, setShowPayModal, setPricePayForm, pricePayForm, schoolStudentDetails } = useSchoolStudentStore();

    const { school_student_id } = useParams();

    const { t } = useTranslation();

    const submitPay = async(e) => {
        e.preventDefault();
        setPricePayForm({ ...pricePayForm, student_id: school_student_id })
        const success = await schoolStudentBalancePay();
        if (success) {
            await getSchoolStudentShow(school_student_id);
            setShowPayModal(false);
            setPricePayForm({
                student_id: "",
                amount: "",
                type: "pay",
                comment: ""
            })
        }
    }

    return (
        <div>
            <CommonModal
                showModal={showPayModal}
                setShowModal={setShowPayModal}
                widthClass='w-[650px]'
                modalTitle={t("Pay")}
                mainContent={
                    <div className='mt-s20'>
                        <form onSubmit={submitPay}>
                            <div className='space-y-4'>
                                <CommonInput
                                    type="number"
                                    label={t('Write amount')}
                                    placeholder={t('Write amount')}
                                    required={true}
                                    withStar={false}
                                    max_number={schoolStudentDetails?.balance?.due_balance}
                                    min_number={0}
                                    value={pricePayForm.amount}
                                    onChange={(e) => { setPricePayForm({ ...pricePayForm, amount: e.target.value }) }}
                                />

                                <CommonInput
                                    type='text'
                                    textarea={true}
                                    label={t('Write comment')}
                                    placeholder={t('Write comment')}
                                    required={true}
                                    withStar={false}
                                    value={pricePayForm.comment}
                                    onChange={(e) => { setPricePayForm({ ...pricePayForm, comment: e.target.value }) }}
                                />

                                <div className="flex justify-center items-center">
                                    <CommonButton
                                        roundedFull={false}
                                        type='submit'
                                        btnLabel={t('submit')}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                }
            />
        </div>
    )
}

export default PayModal
