//import React
import React, {useEffect, useState} from 'react';
import {Doughnut} from 'react-chartjs-2';
import {UserData} from "../Data";
import {Chart as ChartJS} from 'chart.js/auto';
import {
    listAllProducts,
    listProductCategories,
    productsIdName,
    sentimentCircleChart,
    sentimentLineChart
} from "../actions/productActions";
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

function LineChart() {
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
        dispatch(sentimentLineChart('', ''));
    }, [dispatch]);

    //get all products id name from store
    const productIdName = useSelector(state => state.productIdName)
    const {loading: loadingProductIdName, error: errorProductIdName, products: productsList} = productIdName

    //get all category from store
    const category = useSelector(state => state.productCategoryList)
    const {loading: loadingCategory, error: errorCategory, categories: categoryList} = category

    //get sentiment circle chart from store
    const sentimentLine = useSelector(state => state.sentimentLineChart)
    const {loading: loadingSentimentLine, error: errorSentimentLine, sentiments} = sentimentLine

    // current type
    const [currentType, setCurrentType] = useState('All')
    // current type
    const [currentTypeDateFilter, setcurrentTypeDateFilter] = useState('year')
    //current product
    const [currentProductId, setCurrentProductId] = useState(1)
    //current category
    const [currentCategory, setCurrentCategory] = useState('vivo')
    //select options
    const [selectOptions, setSelectOptions] = useState([])

    //sentiment circle chart data
    const [sentimentLineChartData, setSentimentLineChartData] = useState({})


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
        } else if (type == 'All') {
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
    const handleChangeTypeDateFilter = (e) => {
        setcurrentTypeDateFilter(e.value)
        console.log('Type: ', e.value)
        if(e.value == 'month'){
            setStartDate(new Date('2022-01-01'))
            setEndDate(new Date())
        }else if(e.value == 'day'){
            console.log('Dang vao day')
            setStartDate(new Date('2022-07-15'))
            setEndDate(new Date())
        }

        //  let _startDate = startDate.toISOString().split('T')[0]
        // let _endDate = endDate.toISOString().split('T')[0]
        // console.log('_startDate: ', _startDate)
        // console.log('_endDate: ', _endDate)
        reloadChart()
    }

    const reloadChart = () => {
        let _startDate = startDate.toISOString().split('T')[0]
        let _endDate = endDate.toISOString().split('T')[0]
        if (currentType == 'All') {
            dispatch(sentimentLineChart("", "", _startDate, _endDate, currentTypeDateFilter))
        } else if (currentType == 'Product') {
            dispatch(sentimentLineChart('', currentProductId, _startDate, _endDate, currentTypeDateFilter))
        } else dispatch(sentimentLineChart(currentCategory, "", _startDate, _endDate, currentTypeDateFilter))


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
        let categories = []
        console.log("Sentimentttttttttt: ",sentiments)
        if (currentTypeDateFilter == 'year') {
            categories = sentiments.map(sentiment => sentiment.year)
        } else if (currentTypeDateFilter == 'month') {
            categories = sentiments.map(sentiment => sentiment.month + "/" + sentiment.year)
        } else
        {
            categories = sentiments.map(sentiment => sentiment.createdAt)
        }
       categories = categories.map(date=>{
           if (typeof(date) == 'string' && date.includes('T')){

               return date.split('T')[0]
           }
           return date

       })
        // categories.map(date=>console.log('date: ', date))

        let categoriesSet = new Set(categories)
        let categoriesArray = Array.from(categoriesSet)
        setSentimentLineChartData(
            {

                series: [
                    {
                        name: "Negative",
                        data: sentiments.filter((sentiment) => {
                            return sentiment.sentiment === 0
                        }).map((sentiment) => {
                            return sentiment.total
                        })
                    },
                    {
                        name: "Neutral",
                        data: sentiments.filter((sentiment) => {
                            return sentiment.sentiment === 1
                        }).map((sentiment) => {
                            return sentiment.total
                        })
                    },
                    {
                        name: "Positive",
                        data: sentiments.filter((sentiment) => {
                            return sentiment.sentiment === 2
                        }).map((sentiment) => {
                            return sentiment.total
                        })
                    }
                ],
                options: {
                    chart: {
                        height: 350,
                        type: 'line',
                        dropShadow: {
                            enabled: true,
                            color: '#000',
                            top: 18,
                            left: 7,
                            blur: 10,
                            opacity: 0.2
                        },
                        toolbar: {
                            show: false
                        }
                    },
                    colors: ['#ff6384', '#ff9f40', '#4bc0c0'],
                    dataLabels: {
                        enabled: true,
                    },
                    stroke: {
                        curve: 'smooth'
                    },
                    grid: {
                        borderColor: '#e7e7e7',
                        row: {
                            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                            opacity: 0.5
                        },
                    },
                    markers: {
                        size: 1
                    },
                    xaxis: {
                        categories: categoriesArray,
                        title: {
                            text: currentTypeDateFilter.toUpperCase()
                        },

                    },
                    yaxis: {
                        title: {
                            text: 'Comments'
                        },

                    },
                    legend: {
                        position: 'top',
                        horizontalAlign: 'right',
                        floating: true,
                        offsetY: -25,
                        offsetX: -5
                    }
                },


            })
    }, [sentimentLine]);

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
                                  <div className='col-sm-6 col-lg-12 mb-4'>
                                    <span>Type date filter</span>
                                    <Select options={[
                                        {value: 'year', label: 'Year'},
                                        {value: 'month', label: 'Month'},
                                        {value: 'day', label: 'Date'}
                                    ]} onChange={handleChangeTypeDateFilter}/>
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
                            {sentimentLineChartData.series == undefined ? (<Loader/>) :
                                sentimentLineChartData.series.length != 0 ? (
                                    <Chart options={sentimentLineChartData.options}
                                           series={sentimentLineChartData.series} type="line"
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

export default LineChart;