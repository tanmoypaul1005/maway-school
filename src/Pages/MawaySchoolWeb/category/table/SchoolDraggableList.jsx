import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import CommonEmptyStatus from '../../../../Components/CommonEmptyStatus/CommonEmptyStatus';
import CommonButton from '../../../../Components/Button/CommonButton';
import useSchoolCategoryStore from '../../../../App/Stores/school/schoolCategoryStore';
import { iDrivingCard, iExternalCard, iSchoolClassroomLesson } from '../../../../App/Utility/source';
import { useTranslation } from 'react-i18next';

const SchoolDraggableList = ({ onSubmit = () => { } }) => {

    const { schoolCategoryLessonList } = useSchoolCategoryStore();

    const { t } = useTranslation();

    //e React state to track order of items
    const [itemList, setItemList] = useState(schoolCategoryLessonList);
    const [draggableAreaHeight, setDraggableAreaHeight] = useState(0);

    //l Function to update list on drop
    const handleDrop = (droppedItem) => {
        //y Ignore drop outside droppable container
        if (!droppedItem.destination) return;

        var updatedList = [...itemList];

        // Remove dragged item
        const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);

        // Add dropped item
        updatedList.splice(droppedItem.destination.index, 0, reorderedItem);

        // Update State
        setItemList(updatedList);
    };

    useEffect(() => {
        setItemList(schoolCategoryLessonList);
        setDraggableAreaHeight((schoolCategoryLessonList?.length + 1) * 58);
    }, [schoolCategoryLessonList]);

    return (
        <div>
            <div className={` border rounded-br10 border-collapse overflow-hidden h-[${draggableAreaHeight}px]`}>

                <DragDropContext onDragEnd={handleDrop}>
                    <Droppable droppableId="list-container">
                        {(provided) => (
                            <div
                                className={`list-container`}
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {/* g headers start */}
                                <div className={`cursor-default w-full border border-collapse border-cNmSelect flex items-center text-cMainBlack font-semibold`} >

                                    <div className='w-10 text-center py-[10px]'>
                                        {"#"}
                                    </div>

                                    <div className='border-x-[2px] py-[10px] text-center px-[20px] w-[38%] flex items-center space-x-2.5'>
                                        {t("Name")}
                                    </div>

                                    <div className='px-s10 text-fs14 text-center  w-[20%] py-s10'>
                                        {t("Duration")}
                                    </div>

                                    <div className={`px-s10 border-x-[2px] text-center text-fs14  w-[20%] py-[19px]`}>
                                        {t("Mandatory")}
                                    </div>

                                    <div className='px-s10 flex items-center justify-center w-[20%] text-fs16'>
                                        {t("Price")}
                                    </div>
                                </div>

                                {/* r       headers start */}



                                {itemList?.length ? itemList?.map((item, index) => (
                                    <Draggable key={item?.lesson_name} draggableId={item?.lesson_name} index={index}>
                                        {(provided) => (
                                            <div className="item-container" ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps} >
                                                <div className={`w-full border cursor-pointer border-collapse border-cNmSelect flex items-center`} >

                                                    {/* b       index */}
                                                    <div className='font-normal w-10 text-center'>
                                                        {index + 1}
                                                    </div>

                                                    {/* e       image + name */}
                                                    <div className='border-x-[2px] p-s10 text-left px-s10 w-[38%] flex items-center  space-x-2.5'>
                                                        <div className='max-w-[38px] min-w-[38px]'>
                                                            <img className='w-s38 h-s38  grow-0 '
                                                                src={item?.lesson_type === 'driving' && iDrivingCard || item?.lesson_type
                                                                    === 'external' && iExternalCard || item?.lesson_type
                                                                    === 'classroom' && iSchoolClassroomLesson} alt=""
                                                            />
                                                        </div>

                                                        <div className='capitalize body_text text-cGray truncate'>
                                                            {item?.lesson_name ? item?.lesson_name : <CommonEmptyStatus />}
                                                        </div>
                                                    </div>

                                                    {/*l       duration */}
                                                    <div className='px-s10 text-center body_text text-cGray w-[20%] py-s10'>
                                                        {item?.duration_title ? item?.duration_title : <CommonEmptyStatus />}
                                                    </div>

                                                    {/* p           active status */}
                                                    <div className={`px-s10 border-x-[2px] text-center  w-[20%] py-[19px] text-cGray body-text`}>
                                                        {item?.is_mandatory ? 'Yes' : 'No'}
                                                    </div>

                                                    <div className='px-s10 flex items-center justify-center body_text text-cGray w-[20%]'>
                                                        {item?.price ? `DKK ${item?.price?.toLocaleString("da-DK")}` : <CommonEmptyStatus />}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                )) : ""}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>

            <div className="py-5">
                <CommonButton onClick={() => {
                    let t_array = []
                    itemList?.map((item, index) => t_array.push(
                        {
                            lesson_id: item?.id,
                            order_index: index
                        }
                    ))
                    onSubmit(t_array);
                }}
                    roundedFull={false}
                    width='w-[130px]'
                    btnLabel={t('Save Changes')}
                />
            </div>
        </div>
    )
}

export default SchoolDraggableList