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
    similarWordCloud
} from "../actions/productActions";
import {useDispatch, useSelector} from "react-redux";
import {sentimentBarChartReducer, sentimentLineChartReducer} from "../reducers/productReducers";
import Loader from "./Loader";
import Message from "./Message";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Chart from "react-apexcharts";
import ReactWordcloud from 'react-wordcloud';
import {registerLocale, setDefaultLocale} from "react-datepicker";
import us from 'date-fns/locale/en-US';

registerLocale('us', us)



function SimilarWordCloud() {

    // const words = [
    //     {
    //         text: 'told',
    //         value: 15,
    //     },
    //     {
    //         text: 'mistake',
    //         value: 1521,
    //     },
    //     {
    //         text: 'thought',
    //         value: 1566,
    //     },
    //     {
    //         text: 'bad',
    //         value: 17,
    //     },
    //     {
    //         text: 'run',
    //         value: 15,
    //     },
    //     {
    //         text: 'sound',
    //         value: 152,
    //     },
    //     {
    //         text: 'luck',
    //         value: 1566,
    //     },
    //     {
    //         text: 'screen',
    //         value: 17,
    //     },
    // ]


    const options = {
        rotations: 2,
        rotationAngles: [-90, 0],
    };
    const size = [500, 500];


    const dispatch = useDispatch()
    //send dispatch load init word cloud data
    useEffect(() => {
        dispatch(similarWordCloud());
    }, [dispatch]);


    //get sentiment circle chart from store
    const similarWordCloudSelector = useSelector(state => state.similarWordCloud)
    const {loading: loadingWordCloud, error: errorWordCloud, similars: wordCloud} = similarWordCloudSelector

    // current type
    const [expression, setExpression] = useState('phone')
    //current product
    const [number, setNumber] = useState(10)


    const handleChangeExpression = (e) => {
        setExpression(e.target.value)

    }
    const handleChangeNumber = (e) => {
        setNumber(e.target.value)
    }

    const handleClickLoadWordCloud = (e)=>{
        reloadWordCloud()
    }

    const reloadWordCloud = () => {
          dispatch(similarWordCloud(number, expression))
    }

    //reaload chart data
    // useEffect(() => {
    //     console.log('word cloud: ',wordCloud)
    //     wordCloud.map(token => {
    //         token.value = token.value*1000
    //     })
    //
    // }, [similarWordCloudSelector]);

    return (
        <>

            {loadingWordCloud
                ? (<Loader/>)
                : errorWordCloud
                    ? (<Message variant='danger'>{errorWordCloud}</Message>)
                    : (
                        <div>
                            <div className='row'>
                                <div className='col-sm-6 col-lg-6 mb-4'>
                                    <span>Expression</span>
                                    <input type="text" value={expression} className="form-control" onChange={handleChangeExpression}/>

                                </div>
                                <div className='col-sm-6 col-lg-6 mb-4'>
                                    <span>Number</span>
                                    <input type="number" value={number} className="form-control" onChange={handleChangeNumber}/>

                                </div>

                                <div className='col-sm-6 col-lg-6 mb-4'>
                                    <button className='btn btn-primary' onClick={handleClickLoadWordCloud}>Load similar</button>
                                </div>
                            </div>
                            <ReactWordcloud
                                        options={options}
                                        words={wordCloud}
                                        // size={size}
                                    />
                            {/*{wordCloud[0] == undefined ? (<Loader/>) :*/}
                            {/*    wordCloud.word.length != 0 ? (*/}
                            {/*        */}
                            {/*    ) : (*/}
                            {/*        <>*/}
                            {/*        </>*/}

                            {/*    )}*/}
                        </div>
                    )}
        </>

    )
}

export default SimilarWordCloud;