import React from 'react'
import CommonDropDown from '../DropDown/CommonDropDown'
import CommonInput from '../Input/CommonInput'
import ImageUpload from '../Input/ImageUpload'
import CommonLabel from '../Label/CommonLabel'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'

export default function CardInputForm() {

  return (
    <>
        <div className="w-full px-4 pt-16">
            <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
            <Disclosure>
                {({ open }) => (
                <>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                    <span>1st Post Card</span>
                    <ChevronUpIcon
                        className={`${
                        open ? 'rotate-180 transform' : ''
                        } h-5 w-5 text-purple-500`}
                    />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                    <div className="py-s20 bg-cWhite">
                    <div>
                        <CommonInput label="Card Name" placeholder={"Give a name"} />

                        <div className="w-full">
                            <CommonLabel labelText="Select Shop"/>
                            <div className="pt-s16"></div>

                            <CommonDropDown
                            placeholderTextShow={true}
                            basicColor={true}
                            fullWidth={true}
                            toggleTitle={"Select shop"}
                            data={[
                                "Js Shop",
                                "React Shop",
                                "Japan Cards",
                                "KWG King",
                                "React Shop",
                                "Japan Cards",
                                "KWG King",
                            ]}
                            />
                        </div>

                        <div className="flex justify-between py-5">
                        <div className="w-full">
                            <CommonInput type="number" label="Add Price" placeholder={"$20"} />
                        </div>
                        <div className="p-s20"></div>
                        <div className="w-full">
                            <CommonLabel labelText="Select Category"/>
                            <div className="pt-s16"></div>

                            <CommonDropDown
                            placeholderTextShow={true}
                            basicColor={true}
                            fullWidth={true}
                            toggleTitle={"Select category"}
                            data={[
                                "Post Card",
                                "Gift Card",
                                "Mail Card",
                                "Premium Card",
                            ]}
                            />
                        </div>
                        </div>

                        <CommonLabel labelText="Upload gift card Image"/>
                        <div className="pt-s16"></div>
                        <ImageUpload  />
                        

                    </div>
                    </div>
                    </Disclosure.Panel>
                </>
                )}
            </Disclosure>          
            </div>
        </div>
    </>
  )
}
