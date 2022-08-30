import axios from 'axios'
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,

    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,

    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,

    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,


    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL,


    PRODUCT_RANDOM_REQUEST,
    PRODUCT_RANDOM_SUCCESS,
    PRODUCT_RANDOM_FAIL,
    PRODUCT_CATEGORY_LIST_REQUEST,
    PRODUCT_CATEGORY_LIST_SUCCESS,
    PRODUCT_CATEGORY_LIST_FAIL,
    PRODUCT_ALL_LIST_REQUEST,
    PRODUCT_ALL_LIST_SUCCESS,
    PRODUCT_ALL_LIST_FAIL,
    SENTIMENT_CIRCLE_CHART_REQUEST,
    SENTIMENT_CIRCLE_CHART_SUCCESS,
    SENTIMENT_CIRCLE_CHART_FAIL,
    PRODUCT_ID_NAME_REQUEST,
    PRODUCT_ID_NAME_SUCCESS,
    PRODUCT_ID_NAME_FAIL,
    SENTIMENT_BAR_CHART_REQUEST,
    SENTIMENT_BAR_CHART_SUCCESS,
    SENTIMENT_BAR_CHART_FAIL,
    SENTIMENT_LINE_CHART_REQUEST,
    SENTIMENT_LINE_CHART_FAIL,
    SENTIMENT_LINE_CHART_SUCCESS,
    SIMILAR_WORD_CLOUD_REQUEST,
    SIMILAR_WORD_CLOUD_SUCCESS,
    SIMILAR_WORD_CLOUD_FAIL,
    USER_BUY_PRODUCT_REQUEST,
    USER_BUY_PRODUCT_SUCCESS,
    USER_BUY_PRODUCT_FAIL

} from '../constants/productConstants'


export const listProducts =
  ({
    pageNumber = '',
    seller = '',
    name = '',
    category = '',
    order = 'createdAt',
    min = 0,
    max = 1000000,
    rating ='',
  }) =>
  async (dispatch) => {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });
    try {
      console.log(`/api/products?page=${pageNumber}&seller=${seller}&keyword=${name}&category=${category}&min=${min}&max=${max}&rating=${rating}&order=${order}`)
      const { data } = await axios.get(
        `/api/products?page=${pageNumber}&seller=${seller}&keyword=${name}&category=${category}&min=${min}&max=${max}&rating=${rating}&order=${order}`
      );
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
  };


export const listAllProducts = (page) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_ALL_LIST_REQUEST })

        console.log("Page: ",page)
        const { data } = await axios.get(`/api/products/all?page=${page}`)

        dispatch({
            type: PRODUCT_ALL_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_ALL_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const productsIdName = (page) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_ID_NAME_REQUEST })

        console.log("Page: ",page)
        const { data } = await axios.get(`/api/products/products-id-name`)

        dispatch({
            type: PRODUCT_ID_NAME_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_ID_NAME_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const sentimentLineChart = (category, product_id, start_date, end_date, filter_type_date) => async (dispatch) => {
    console.log('product_id: ', product_id)
    try {
        dispatch({ type: SENTIMENT_LINE_CHART_REQUEST })
        start_date = start_date == undefined ? '2017-01-01' : start_date
        filter_type_date = filter_type_date == undefined ? 'year' : filter_type_date
        end_date = end_date == undefined ? new Date().toISOString().split('T')[0] : end_date
        const { data } = await axios.get(`/api/products/get-sentiment-line?category=${category}&product_id=${product_id}&from_date=${start_date}&to_date=${end_date}&filter_type_date=${filter_type_date}`)

        dispatch({
            type: SENTIMENT_LINE_CHART_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: SENTIMENT_LINE_CHART_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const sentimentCircleChart = (category, product_id, start_date, end_date) => async (dispatch) => {
    console.log('product_id: ', product_id)
    try {
        dispatch({ type: SENTIMENT_CIRCLE_CHART_REQUEST })
        start_date = start_date == undefined ? '2017-01-01' : start_date
        end_date = end_date == undefined ? new Date().toISOString().split('T')[0] : end_date
        const { data } = await axios.get(`/api/products/get-sentiment-circle?category=${category}&product_id=${product_id}&from_date=${start_date}&to_date=${end_date}`)

        dispatch({
            type: SENTIMENT_CIRCLE_CHART_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: SENTIMENT_CIRCLE_CHART_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const similarWordCloud = (number, expression) => async (dispatch) => {

    try {
        dispatch({ type: SIMILAR_WORD_CLOUD_REQUEST })
        number = number == undefined ? 10:number
        expression = expression == undefined ? 'phone' : expression
        const { data } = await axios.get(`/api/products/get-word-cloud?expression=${expression}&number=${number}`)

        dispatch({
            type: SIMILAR_WORD_CLOUD_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: SIMILAR_WORD_CLOUD_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const userBuyProduct = (user_id, product_id) => async (dispatch) => {

    try {
        dispatch({ type: USER_BUY_PRODUCT_REQUEST })

        const { data } = await axios.get(`/api/orders/user-buy-product?user_id=${user_id}&product_id=${product_id}`)

        dispatch({
            type: USER_BUY_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_BUY_PRODUCT_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const sentimentBarChart = (category, product_id, start_date, end_date) => async (dispatch) => {
    console.log('product_id: ', product_id)
    try {
        dispatch({ type: SENTIMENT_BAR_CHART_REQUEST })
        start_date = start_date == undefined ? '2017-01-01' : start_date
        end_date = end_date == undefined ? new Date().toISOString().split('T')[0] : end_date
        const { data } = await axios.get(`/api/products/get-sentiment-horizontal-bar-chart?category=${category}&product_id=${product_id}&from_date=${start_date}&to_date=${end_date}`)

        dispatch({
            type: SENTIMENT_BAR_CHART_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: SENTIMENT_BAR_CHART_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listProductCategories = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_CATEGORY_LIST_REQUEST,
  });
  try {
    const { data } = await axios.get(`/api/products/categories`);
    dispatch({ type: PRODUCT_CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_CATEGORY_LIST_FAIL, payload: error.message });
  }
};
export const listRandomProducts = (count) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_RANDOM_REQUEST })

        const { data } = await axios.get(`/api/products/random-products?num-product=${count}`)

        dispatch({
            type: PRODUCT_RANDOM_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_RANDOM_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}
export const listTopProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_TOP_REQUEST })

        const { data } = await axios.get(`/api/products/top/`)

        dispatch({
            type: PRODUCT_TOP_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_TOP_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/products/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `/api/products/delete/${id}/`,
            config
        )

        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
        })


    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}




export const createProduct = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/products/create/`,
            {},
            config
        )
        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/products/update/${product._id}/`,
            product,
            config
        )
        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data,
        })


        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createProductReview = (productId, review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/products/${productId}/reviews/`,
            review,
            config
        )
        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
            payload: data,
        })



    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}