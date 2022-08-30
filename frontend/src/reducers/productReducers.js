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
    PRODUCT_CREATE_RESET,

    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET,

    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,
    PRODUCT_RANDOM_REQUEST,
    PRODUCT_RANDOM_SUCCESS,
    PRODUCT_RANDOM_FAIL,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL,

    PRODUCT_CATEGORY_LIST_REQUEST,
    PRODUCT_CATEGORY_LIST_SUCCESS,
    PRODUCT_CATEGORY_LIST_FAIL,
    PRODUCT_ALL_LIST_REQUEST,
    PRODUCT_ALL_LIST_SUCCESS,
    PRODUCT_ALL_LIST_FAIL,
    SENTIMENT_CIRCLE_CHART_REQUEST,
    SENTIMENT_BAR_CHART_SUCCESS,
    SENTIMENT_CIRCLE_CHART_SUCCESS,
    SENTIMENT_CIRCLE_CHART_FAIL,
    SENTIMENT_LINE_CHART_REQUEST,
    SENTIMENT_LINE_CHART_SUCCESS,
    SENTIMENT_LINE_CHART_FAIL,
    SENTIMENT_BAR_CHART_REQUEST,
    SENTIMENT_BAR_CHART_FAIL,
    PRODUCT_ID_NAME_REQUEST,
    PRODUCT_ID_NAME_SUCCESS,
    PRODUCT_ID_NAME_FAIL,
    SIMILAR_WORD_CLOUD_REQUEST,
    SIMILAR_WORD_CLOUD_SUCCESS,
    SIMILAR_WORD_CLOUD_FAIL,
    USER_BUY_PRODUCT_REQUEST, USER_BUY_PRODUCT_SUCCESS, USER_BUY_PRODUCT_FAIL
} from '../constants/productConstants'


// export const productListReducer = (
//   state = { loading: true, products: [] },
//   action
// ) => {
//   switch (action.type) {
//     case PRODUCT_LIST_REQUEST:
//       return { loading: true };
//     case PRODUCT_LIST_SUCCESS:
//       return {
//         loading: false,
//         products: action.payload.products,
//         pages: action.payload.pages,
//         page: action.payload.page,
//       };
//     case PRODUCT_LIST_FAIL:
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };


export const productListReducer = (state = { products: [] }, action) => {
     console.log('Action list: ',action.type)
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] }

        case PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                page: action.payload.page,
                pages: action.payload.pages
            }

        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


export const productAllListReducer = (state = { products: [] }, action) => {
    console.log('Action type All list: ',action.type)
    switch (action.type) {
        case PRODUCT_ALL_LIST_REQUEST:
            return { loading: true, products: [] }

        case PRODUCT_ALL_LIST_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                page: action.payload.page,
                pages: action.payload.pages
            }

        case PRODUCT_ALL_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const productIdNameReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_ID_NAME_REQUEST:
            return { loading: true, products: [] }

        case PRODUCT_ID_NAME_SUCCESS:
            return { loading: false, products: action.payload, }

        case PRODUCT_ID_NAME_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const similarWordCloudReducer = (state = { similars: [] }, action) => {
    switch (action.type) {
        case SIMILAR_WORD_CLOUD_REQUEST:
            return { loading: true, similars: [] }

        case SIMILAR_WORD_CLOUD_SUCCESS:
            return { loading: false, similars: action.payload, }

        case SIMILAR_WORD_CLOUD_FAIL:
            return { loading: false, similars: action.payload }

        default:
            return state
    }
}

export const sentimentCircleChartReducer = (state = { sentiments: [] }, action) => {
    switch (action.type) {
        case SENTIMENT_CIRCLE_CHART_REQUEST:
            return { loading: true, sentiments: [] }

        case SENTIMENT_CIRCLE_CHART_SUCCESS:
            return { loading: false, sentiments: action.payload, }

        case SENTIMENT_CIRCLE_CHART_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const sentimentLineChartReducer = (state = { sentiments: [] }, action) => {
    switch (action.type) {
        case SENTIMENT_LINE_CHART_REQUEST:
            return { loading: true, sentiments: [] }

        case SENTIMENT_LINE_CHART_SUCCESS:
            return { loading: false, sentiments: action.payload, }

        case SENTIMENT_LINE_CHART_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const sentimentBarChartReducer = (state = { sentiments: [] }, action) => {
    switch (action.type) {
        case SENTIMENT_BAR_CHART_REQUEST:
            return { loading: true, sentiments: [] }

        case SENTIMENT_BAR_CHART_SUCCESS:
            return { loading: false, sentiments: action.payload, }

        case SENTIMENT_BAR_CHART_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}
export const userBuyProductReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case USER_BUY_PRODUCT_REQUEST:
            return { loading: true, products: [] }

        case USER_BUY_PRODUCT_SUCCESS:
            return { loading: false, products: action.payload, }

        case USER_BUY_PRODUCT_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const productDetailsReducer = (state = { product: { reviews: [] } }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state }

        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload }

        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return { loading: true }

        case PRODUCT_DELETE_SUCCESS:
            return { loading: false, success: true }

        case PRODUCT_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}



export const productCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return { loading: true }

        case PRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload }

        case PRODUCT_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case PRODUCT_CREATE_RESET:
            return {}

        default:
            return state
    }
}


export const productUpdateReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return { loading: true }

        case PRODUCT_UPDATE_SUCCESS:
            return { loading: false, success: true, product: action.payload }

        case PRODUCT_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case PRODUCT_UPDATE_RESET:
            return { product: {} }

        default:
            return state
    }
}



export const productReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return { loading: true }

        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true, }

        case PRODUCT_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload }

        case PRODUCT_CREATE_REVIEW_RESET:
            return {}

        default:
            return state
    }
}


export const productTopRatedReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_TOP_REQUEST:
            return { loading: true, products: [] }

        case PRODUCT_TOP_SUCCESS:
            return { loading: false, products: action.payload, }

        case PRODUCT_TOP_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const productRandomReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_RANDOM_REQUEST:
            return { loading: true, products: [] }

        case PRODUCT_RANDOM_SUCCESS:
            return { loading: false, products: action.payload, }

        case PRODUCT_RANDOM_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const productCategoryListReducer = (
  state = { loading: true, products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_CATEGORY_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_CATEGORY_LIST_SUCCESS:
      return { loading: false, categories: action.payload };
    case PRODUCT_CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
