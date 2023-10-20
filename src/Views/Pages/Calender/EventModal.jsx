import {useForm} from "antd/es/form/Form.js";
import {Form, Input} from "antd";
import Button from "antd/es/button/index.js";
import DateRangePickerWrapper from '../../../Config/DatePicker/DateRangePickerConfig.jsx'
import TextArea from "antd/es/input/TextArea.js";


const EventModal = () => {


    const [form] = useForm();

    const onFormFinish = (values) => {
        console.log(values)
        // todo handle form finish
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
        form.setFieldsValue({ dateRange: value });
    };


    return (
        <div className={'flex justify-center'}>
            <div className={'w-full '}>
        <Form
                form={form}
                name="basic"
                layout="vertical"
                initialValues={{remember: true}}
                onFinish={onFormFinish}
                onFinishFailed={onFormFinishFailed}
            >


                <Form.Item rules={[{required:true,message:"Required field"}]} label="Event Title" name="title">
                    <Input/>
                </Form.Item>

                <Form.Item rules={[{required:true,message:"Required field"}]} label="Description" name="description">
                    <TextArea rows={4}/>
                </Form.Item>

                <Form.Item rules={[{required:true,message:"Required field"}]} label="Date Range" name="dateRange">
                    {/* Use the custom DateRangePickerWrapper component */}
                    <DateRangePickerWrapper
                        className={'w-full'}
                        value={form.getFieldValue('dateRange')}
                        onChange={handleDateRangeChange} // Handle date range change
                    />
                </Form.Item>
                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button htmlType="button" onClick={onFormClearClick}>
                        Clear
                    </Button>
                </Form.Item>
            </Form>
            </div>
        </div>
    )
}
export default EventModal;
