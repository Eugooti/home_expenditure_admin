import {Descriptions, Drawer} from "antd";
import {getFromLocalStorage} from "../../Utils/LocalStorage/localStorage.jsx";

// eslint-disable-next-line react/prop-types
const Drawers = ({open,onClose}) => {

    const user=getFromLocalStorage("user")

    return (
        <>

            <Drawer title={user?.name} open={open} onClose={onClose} placement="right">


                <Descriptions
                    column={{xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1}}
                >
                    <Descriptions.Item label="Email Address">{user.address}</Descriptions.Item>
                    <Descriptions.Item label="Acess">{user.Access}</Descriptions.Item>
                    <Descriptions.Item label="Phone No">{user.phone}</Descriptions.Item>
                </Descriptions>
            </Drawer>
        </>
    )
}
 export default Drawers;
