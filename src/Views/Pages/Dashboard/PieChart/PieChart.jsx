
import {G2, Pie} from '@ant-design/plots';
import Text from "antd/es/typography/Text.js";
import {useQuery} from "@apollo/client";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../../../Context/User Context/UserContext.jsx";
import {GET_CATEGORIES_BY_USER, GET_EXPENDITURES_BY_USER} from "../../../../API/GraphQL/Queries/Queries.js";
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";


function calculateCategoryTotals(expenditures, categories) {
    // Create an object to store category totals
    const categoryTotals = {};

    // Log the expenditures and categories to see what you're working with
    console.log("Expenditures:", expenditures);
    console.log("Categories:", categories);

    // Initialize the category totals object with category names
    categories.forEach(category => {
        categoryTotals[category.name] = {
            name: category.name,
            total: 0,
        };
    });

    // Log the categoryTotals to see if it's correctly initialized
    console.log("Initial Category Totals:", categoryTotals);

    // Iterate through expenditures and calculate totals for each category
    expenditures.forEach(expenditure => {
        const categoryName = expenditure.Category; // Check the category field

        // Add the cost to the category total
        categoryTotals[categoryName].total += expenditure.cost; // Check the field name

        // Log the category totals after adding the cost
        console.log("Updated Category Totals:", categoryTotals);
    });

    // Convert the category totals object to an array
    const result = Object.values(categoryTotals);

    // Log the result to check the final totals
    console.log("Final Totals Result:", result);

    return result;
}
const PieChart = () => {

    const User = useContext(UserContext);

    const { loading: expendituresLoading, error: expendituresError, data: expendituresData } = useQuery(
        GET_EXPENDITURES_BY_USER,
        { variables: { emailAddress: User?.emailAddress } }
    );

    const { loading: categoriesLoading, error: categoriesError, data: categoriesData } = useQuery(
        GET_CATEGORIES_BY_USER,
        { variables: { emailAddress: User?.emailAddress } }
    );
    const [mappedExpenditures, setMappedExpenditures] = useState([]);
    const [mappedCategories, setMappedCategories] = useState([]);
    const [categoryTotals, setCategoryTotals] = useState([]);


    useEffect(() => {
        if (expendituresData && expendituresData.getExpenditureByUser) {
            const mappedData = expendituresData.getExpenditureByUser.map((item) => ({
                key: item.id.toString(),
                name: item.name,
                Category: item.category,
                cost: item.cost,
                description: item.description,
                id: item.id,
            }));
            setMappedExpenditures(mappedData);
        }
    }, [expendituresData]);

    useEffect(() => {
        if (categoriesData && categoriesData.getCategoriesByUser) {
            const mappedData = categoriesData.getCategoriesByUser.map((item) => ({
                key: item.id.toString(),
                name: item.name,
                maximumExpense: item.maximumCash,
                description: item.description,
            }));
            setMappedCategories(mappedData);
        }
    }, [categoriesData]);

    useEffect(() => {
        if (mappedExpenditures.length > 0 && mappedCategories.length > 0) {
            const totals = calculateCategoryTotals(mappedExpenditures, mappedCategories);

            setCategoryTotals(totals);
        }
    }, [mappedExpenditures, mappedCategories]);

    console.log("total",categoryTotals)

    const G = G2.getEngine('canvas');
    const data = categoryTotals?.map((item)=>({
        type:item.name,
        value:item.total
    }))

    const cfg = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.43,
        legend: false,
        label: {
            type: 'spider',
            labelHeight: 30,
            formatter: (data, mappingData) => {
                const group = new G.Group({});
                group.addShape({
                    type: 'circle',
                    attrs: {
                        x: 0,
                        y: 0,
                        width: 40,
                        height: 50,
                        r: 5,
                        fill: mappingData.color,
                    },
                });
                group.addShape({
                    type: 'text',
                    attrs: {
                        x: 5,
                        y: 8,
                        text: `${data.type}`,
                        fill: mappingData.color,
                    },
                });
                group.addShape({
                    type: 'text',
                    attrs: {
                        x: 0,
                        y: 25,
                        text: `${data.value}个 ${data.percent * 100}%`,
                        fill: 'rgba(0, 0, 0, 0.65)',
                        fontWeight: 700,
                    },
                });
                return group;
            },
        },
        interactions: [
            {
                type: 'element-selected',
            },
            {
                type: 'element-active',
            },
        ],
    };
    return (
        <>
            <div>
                <Text strong>Allowance usage</Text>

                {categoryTotals.length>=0?
                    <Pie className={'h-64'} style={{outline:'lime '}} {...(cfg)} />:
                    <div className={'h-full w-full flex items-center justify-center'}>
                        {/*<Spin size="large"/>*/}
                        <Spin indicator={<LoadingOutlined style={{fontSize: 24}} spin size='large'/>}/>

                    </div>
                }

            </div>

        </>
        )
};

export default PieChart;