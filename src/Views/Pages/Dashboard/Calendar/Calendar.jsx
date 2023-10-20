import {Calendar,theme} from "antd";

const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
};

const UserCalendar = () => {
    const { token } = theme.useToken();
    const wrapperStyle = {
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
    };
    return (
        <>
            <div className={'w-full h-full'} style={wrapperStyle}>
                <Calendar  fullscreen={false} onPanelChange={onPanelChange} />
            </div>
        </>
    )
}
export default UserCalendar