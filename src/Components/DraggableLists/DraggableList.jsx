import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import useSchoolStore from '../../App/Stores/SchoolStore';
import { iClassroomCard, iDrivingCard, iExternalCard } from '../../App/Utility/source';
import { toHoursAndMinutes } from '../../App/Utility/UtilityFunctions';
import CommonButton from '../Button/CommonButton';
import CommonEmptyStatus from '../CommonEmptyStatus/CommonEmptyStatus';


const DraggableList = ({ onSubmit = () => { } }) => {

    const { schoolCategoryShow } = useSchoolStore();

    //e React state to track order of items
    const [itemList, setItemList] = useState(schoolCategoryShow?.lessons);
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
        setItemList(schoolCategoryShow?.lessons);
        setDraggableAreaHeight((schoolCategoryShow?.lessons?.length + 1) * 58);
    }, [schoolCategoryShow?.lessons]);

    return (
        <div>

            {/* <div onClick={async () => { await getSchoolCategoryShowIndex(1737); }} className="py-5">REFRESH</div>

            <div
                onClick={async () => {
                    console.log("itemList:", itemList);
                    console.log("schoolCategoryShow", schoolCategoryShow?.lessons);
                }}
                className="py-5">CHECK</div> */}
            <div className={` border rounded-br10 border-collapse overflow-hidden h-[${draggableAreaHeight}px]`}>

                <DragDropContext onDragEnd={handleDrop}>
                    <Droppable droppableId="list-container">
                        {(provided) => (
                            <div
                                className={`list-container`}
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {/* g       headers start */}
                                <div className={`cursor-default w-full border border-collapse border-cNmSelect flex items-center text-cMainBlack font-semibold`} >

                                    <div className='w-10 text-center py-[10px]'>
                                        {"#"}
                                    </div>

                                    <div className='border-x-[2px] py-[19px] text-left px-[20px] w-[50%] flex items-center space-x-2.5'>
                                        Name
                                    </div>

                                    <div className='px-s10 text-fs14 text-center  w-[100px] py-s10'>
                                        Duration
                                    </div>

                                    <div className={`px-s10 border-x-[2px] text-center text-fs14  w-[100px] py-[19px]`}>
                                        Status
                                    </div>

                                    <div className='px-s10 flex items-center justify-center  text-fs16'>
                                        Price
                                    </div>
                                </div>

                                {/* r       headers start */}

                                {itemList?.length ? itemList?.map((item, index) => (
                                    <Draggable key={item?.name} draggableId={item?.name} index={index}>
                                        {(provided) => (
                                            <div className="item-container" ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps} >
                                                <div className={`w-full border cursor-pointer border-collapse border-cNmSelect flex items-center`} >

                                                    {/* b       index */}
                                                    <div className='font-normal w-10 text-center'>
                                                        {index + 1}
                                                    </div>

                                                    {/* e       image + name */}
                                                    <div className='border-x-[2px] py-s10 text-left px-s10 w-[50%] flex items-center space-x-2.5'>
                                                        <div className='max-w-[40px]'>
                                                            <img className='w-s38 h-s38  grow-0' src={item?.type === 'driving' && iDrivingCard || item?.type === 'external' && iExternalCard || item?.type === 'classroom' && iClassroomCard} alt="" />
                                                        </div>

                                                        <div className='capitalize max-w-full truncate font-fw600 text-cMainBlack lg:text-fs14 sm:text-fs12 '>
                                                            {item?.name ? item.name : <CommonEmptyStatus />}
                                                        </div>
                                                    </div>

                                                    {/*l       duration */}
                                                    <div className='px-s10 text-fs14 text-center text-cTextBody w-[100px] py-s10'>
                                                        {item?.duration ? toHoursAndMinutes(item?.duration) : <CommonEmptyStatus />}
                                                    </div>

                                                    {/* p           active status */}
                                                    <div className={`px-s10 border-x-[2px] text-center text-fs14 text-cTextBody w-[100px] py-[19px] ${item?.status ? "text-cPassed" : "text-cCancelled"}`}>
                                                        {item?.status ? "Active" : "Deactivate"}
                                                    </div>

                                                    <div className='px-s10 flex items-center justify-center text-cBrandColor text-fs16 font-fw600'>
                                                        {item?.price ? `DKK ${item.price}` : <CommonEmptyStatus />}
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
                }} width='w-[200px]' btnLabel='Save Changes' />
            </div>
        </div>
    )
}

export default DraggableList