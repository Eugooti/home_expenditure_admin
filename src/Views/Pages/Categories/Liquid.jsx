import { Liquid} from '@ant-design/plots';
import {Card} from "antd";
import Text from "antd/es/typography/Text.js";

const Liquids = () => {

    const config2 = {
        percent: 200/1000,
        outline: {
            border: 2,
            distance: 0,
        },
        wave: {
            length: 128,
        },

    };

    return (
        <>
                <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                    <Text strong>Allowance used</Text>

                    <Liquid style={{height:200,width:200}} label={"Allowance Usage"} {...config2} />
                </div>
        </>
    )
}
export default Liquids;
