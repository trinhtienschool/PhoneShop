//import React
import React, {useEffect, useState} from 'react';
import {Doughnut} from 'react-chartjs-2';
import {UserData} from "../Data";
import {Chart as ChartJS} from 'chart.js/auto';
import {listAllProducts, listProductCategories, productsIdName, sentimentCircleChart} from "../actions/productActions";
import {useDispatch, useSelector} from "react-redux";
import {sentimentBarChartReducer, sentimentLineChartReducer} from "../reducers/productReducers";
import Loader from "./Loader";
import Message from "./Message";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Chart from "react-apexcharts";

import {registerLocale, setDefaultLocale} from "react-datepicker";
import us from 'date-fns/locale/en-US';

registerLocale('us', us)

function DoughnutChart() {
    const dispatch = useDispatch()

    //send dispatch load  list products has only id, name to store
    useEffect(() => {
        dispatch(productsIdName())
    }, [dispatch])


    //send dispatch load list categories
    useEffect(() => {
        dispatch(listProductCategories());
    }, [dispatch]);

    //send dispatch load init chart data
    useEffect(() => {
        dispatch(sentimentCircleChart('', ''));
    }, [dispatch]);

    //get all products id name from store
    const productIdName = useSelector(state => state.productIdName)
    const {loading: loadingProductIdName, error: errorProductIdName, products: productsList} = productIdName

    //get all category from store
    const category = useSelector(state => state.productCategoryList)
    const {loading: loadingCategory, error: errorCategory, categories: categoryList} = category

    //get sentiment circle chart from store
    const sentimentCircle = useSelector(state => state.sentimentCircleChart)
 const {loading: loadingSentimentCircle, error: errorSentimentCircle, sentiments} = sentimentCircle

    // current type
    const [currentType, setCurrentType] = useState('All')
    //current product
    const [currentProductId, setCurrentProductId] = useState(1)
    //current category
    const [currentCategory, setCurrentCategory] = useState('vivo')
    //select options
    const [selectOptions, setSelectOptions] = useState([])

    //sentiment circle chart data
    const [sentimentCircleChartData, setSentimentCircleChartData] = useState({})


    const [startDate, setStartDate] = useState(new Date('2017-01-01'));
    const [endDate, setEndDate] = useState(new Date());

    const handleChangeType = (e) => {
        let type = e.value
        setCurrentType(type)
        console.log('Type: ', type)

        let options = []
        if (type == 'Category') {
            for (let i = 0; i < categoryList.length; i++) {
                options.push({value: categoryList[i].category, label: categoryList[i].category})
            }
        } else if (type == 'Product') {
            for (let i = 0; i < productsList.length; i++) {
                options.push({value: productsList[i]._id, label: productsList[i].name})
            }
        }else if(type=='All'){
            reloadChart()
        }
        console.log('Options: ', options)
        setSelectOptions(options)
    }

    const handleChangeCategory = (e) => {
        setCurrentCategory(e.value)
         reloadChart()
    }

    const handleChangeProductId = (e) => {
        setCurrentProductId(e.value)
        reloadChart()
    }

    const reloadChart = () => {
        let _startDate = startDate.toISOString().split('T')[0]
        let _endDate = endDate.toISOString().split('T')[0]
        if (currentType == 'All') {
            dispatch(sentimentCircleChart("", "", _startDate, _endDate))
        } else if (currentType == 'Product') {
            dispatch(sentimentCircleChart('', currentProductId, _startDate, _endDate))
        } else dispatch(sentimentCircleChart(currentCategory, "", _startDate, _endDate))


    }
    const handleChangeStartDate = (date) => {
        setStartDate(date)
         reloadChart()
    };
    const handleChangeEndDate = (date) => {
        setEndDate(date)
         reloadChart()
    };

    //reaload chart data
    useEffect(() => {

        sentiments.map(sentiment => {
            if (sentiment.sentiment == 0) sentiment.sentiment = 'Negative'
            else if (sentiment.sentiment == 1) sentiment.sentiment = 'Neutral'
            else sentiment.sentiment = 'Positive'
        })
        setSentimentCircleChartData({
            series: sentiments.map((data) => data.total),
            options: {
                labels: sentiments.map((data) => data.sentiment),
                chart: {
                    type: 'donut',
                },
                dataLabels: {
                    enabled: true
                },
                colors: ['#ff6384', '#ff9f40', '#4bc0c0'],
            },
        });
    }, [sentimentCircle]);

    return (
        <>

            {loadingProductIdName
                ? (<Loader/>)
                : errorProductIdName
                    ? (<Message variant='danger'>{errorProductIdName}</Message>)
                    : (
                        <div>
                            <div className='row'>
                                <div className='col-sm-6 col-lg-6 mb-4'>
                                    <span>Type</span>
                                    <Select options={[
                                        {value: 'All', label: 'All'},
                                        {value: 'Category', label: 'Category'},
                                        {value: 'Product', label: 'Product'}
                                    ]} onChange={handleChangeType}/>
                                </div>
                                <div className='col-sm-6 col-lg-6 mb-4'>

                                    {currentType == 'Product' ? (
                                            <>
                                                <span>{currentType}</span>
                                                <Select options={selectOptions} onChange={handleChangeProductId}/>
                                            </>
                                        )
                                        : currentType == 'Category' ? (
                                                <>
                                                    <span>{currentType}</span>
                                                    <Select options={selectOptions} onChange={handleChangeCategory}/>
                                                </>
                                            )
                                            : (
                                                <div className='d-none'></div>
                                            )

                                    }
                                </div>
                                <div className='col-sm-6 col-lg-6 mb-4'>
                                    <span>From date</span>
                                    <DatePicker locale="us" selected={startDate} onChange={handleChangeStartDate}/>
                                </div>
                                <div className='col-sm-6 col-lg-6 mb-4'>
                                    <span>To date</span>
                                    <DatePicker locale="us" selected={endDate} onChange={handleChangeEndDate}/>
                                </div>
                                {/*<div className='col-sm-6 col-lg-6 mb-4'>*/}
                                {/*    <button className='btn btn-primary' onClick={handleLoadChart}>Load Chart</button>*/}
                                {/*</div>*/}
                            </div>
                            {sentimentCircleChartData.series == undefined ? (<Loader/>) :
                                sentimentCircleChartData.series.length != 0 ? (
                                    <Chart options={sentimentCircleChartData.options}
                                           series={sentimentCircleChartData.series} type="donut"
                                    />
                                ) : (
                                    <>
                                    </>

                                )}
                        </div>
                    )}
        </>

    )
}

export default DoughnutChart;