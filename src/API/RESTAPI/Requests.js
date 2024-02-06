import axios from "axios";
import {useState,useEffect} from "react";


//category specific requests
export const GET_CATEGORIES =  () => {

    const [categories,setCategories]=useState(null)
    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response=await axios.get(`http://localhost:5000/api/categories`);
                if (response.status!==200){
                    console.error("Error fetching categories")
                }
                const data=await response;

                setCategories(data.data.categories[0])

            }catch (e) {
                console.log(e)
            }
        }
        fetchData();

    },[]);
    return categories;

}

export const CREATE_CATEGORY = async ({ name, description, maximumCash, createdBy }) => {
    const [category,setCategory]=useState(null);

    try {

        const response=await axios.post(`http://localhost:5000/api/category`,{ name, description, maximumCash, createdBy });

        const data=await response.message;

        setCategory(data);

    }catch (e) {
       console.log(e)
    }
    
    return category;

}

export const UPDATE_CATEGORY = async ({ name, maximumCash,id }) => {
    const [category,setCategory]=useState(null);

    try {
      const response=await axios.put(`http://localhost:5000/api/category/${id}`,{
          name,
          maximumCash
      })

        const data=await response.message;

      setCategory(data)

  }catch (e) {
      console.log(e)
  }

  return category;
}

export const DELETE_CATEGORY = async ({Id}) => {
    const [category,setCategory]=useState(null);

    try {
        const response = await axios.delete(`http://localhost:5000/api/category/${Id}`);

        if (response.status !== 200) {

           setCategory(response.error);

        }

        const data=await response.message;

        setCategory(data)

    }catch (e) {
        console.log(e)
    }

    return category;
}

//expenditure specific requests

export const GET_EXPENDITURE =  () => {

    const [expenditure,setExpenditure]=useState(null);

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response=await axios.get(`http://localhost:5000/api/expenditures`);
                if (response.status!==200){
                    console.error("Error fetching categories")
                }
                const data=await response;

                setExpenditure(data.data.expenditures[0])

            }catch (e) {
                console.log(e)
            }
        }
        fetchData();

    },[]);
    return expenditure;

}

export const CREATE_EXPENDITURE = async ({ name, category, cost, description, createdBy }) => {
    const [expenditure,setExpenditure]=useState(null);

    try {

        const response=await axios.post(`http://localhost:5000/api/expenditure`,{ name, category, cost, description, createdBy });

        const data=await response.message;

        setExpenditure(data);

    }catch (e) {
        console.log(e)
    }

    return expenditure;

}

export const UPDATE_EXPENDITURE = async ({ name, category, cost,id }) => {
    const [expenditure,setExpenditure]=useState(null);

    try {
        const response=await axios.put(`http://localhost:5000/api/expenditure/${id}`,{ name, category, cost })

        const data=await response.message;

        setExpenditure(data)

    }catch (e) {
        console.log(e)
    }

    return expenditure;
}


export const DELETE_EXPENDITURE = async ({Id}) => {
    const [expenditure,setExpenditure]=useState(null);

    try {
        const response = await axios.delete(`http://localhost:5000/api/expenditure/${Id}`);

        if (response.status !== 200) {

            setExpenditure(response.error);

        }

        const data=await response.message;

        setExpenditure(data)

    }catch (e) {
        console.log(e)
    }

    return expenditure;
}
