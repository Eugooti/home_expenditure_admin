import {Fragment, useContext, useRef} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {ExclamationTriangleIcon} from '@heroicons/react/24/outline'
import {useForm} from "antd/es/form/Form.js";
import { Form, Input, message} from "antd";
import TextArea from "antd/es/input/TextArea.js";
import {UserContext} from "../../../../Context/User Context/UserContext.jsx";
import DatePickerWrapper from "../../../../Config/DatePicker/DatePickerConfig.jsx";
import {CREATE_TODO} from "../../../../API/Mutations/Mutations.js";
import {useMutation} from "@apollo/client";

// eslint-disable-next-line react/prop-types
const NewToDo=({open,handleClose,setOpen})=> {

    const [messageApi, contextHolder] = message.useMessage();

    const User = useContext(UserContext);


    const [form] = useForm();

    const [createTodo]=useMutation(CREATE_TODO)

    const onFormFinish = async (values) => {
        // todo handle form finish

        try {
            const {title,date,description}=values
            const createdBy = User?.emailAddress;

            const response=await createTodo({
                variables:{
                    title,
                    date,
                    description,
                    createdBy
                },
            })

            console.log(response)

            if (response && response.data.createToDo){
                messageApi.success("Todo created successfully").then(()=>{
                    onFormClearClick()
                    handleClose()
                })
            }

        }catch (e) {
            console.log(e)
        }

    };

    const onFormFinishFailed = (errorInfo) => {
        console.log(errorInfo)
        // todo handle form finish fail
    };

    const onFormClearClick = () => {
        form.resetFields();
    };

    const handleDateRangeChange = (value) => {
        // Update the form field when the date range changes
        form.setFieldsValue({ date: value });
    };

    const cancelButtonRef = useRef(null)

    return (
        <Transition.Root show={open} as={Fragment}>
            {/*{contextHolder}*/}
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                {contextHolder}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <Form
                                    form={form}
                                    name="basic"
                                    layout="vertical"
                                    initialValues={{remember: true}}
                                    onFinish={onFormFinish}
                                    onFinishFailed={onFormFinishFailed}
                                >

                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">

                                        <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />

                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h2" className="text-base font-semibold leading-6 text-gray-900">
                                                    Add ToDo Item
                                                </Dialog.Title>
                                                <div className="mt-6">
                                                    <div  className={'w-96 '}>

                                                        <Form.Item className={'w-full'} rules={[{required:true,message:"Required field"}]} label="Todo Title" name="title">
                                                            <Input size={"large"}/>
                                                        </Form.Item>

                                                        <Form.Item rules={[{required:true,message:"Required field"}]} label="Date" name="date">
                                                            {/* Use the custom DateRangePickerWrapper component */}
                                                            <DatePickerWrapper
                                                                size={'large'}
                                                                className={'w-full'}
                                                                value={form.getFieldValue('dateRange')}
                                                                onChange={handleDateRangeChange}
                                                            />
                                                        </Form.Item>

                                                        <Form.Item rules={[{required:true,message:"Required field"}]} label="Description" name="description">
                                                            <TextArea rows={4}/>
                                                        </Form.Item>




                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="submit"
                                            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                        >
                                            Add Event
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={handleClose}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default NewToDo;