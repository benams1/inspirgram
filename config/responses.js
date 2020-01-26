const genericResponses = {
    GET_SUCCESS:{
        code:200,
        json:{
            status: 1,
            message:'success',
            data: undefined,
        }
    },
    GENERAL_SUCCESS:{
        code:200,
        json:{ status:1, message:`success` }
    },
    MISSING_PARAMS:{
        code: 400,
        json:{ status: 0, message:`all API parameters must be set`},
    },
    WRONG_PARAMS:{
        code: 400,
        json:{ status: 0, message:`incorrect API parameters sent`},
    },
    SAVED_SUCCESSFULLY:{
        code: 200,
        json: { status: 1, message: `saved successfully` },
    },
    DB_ERROR:{
        code: 502,
        json:{
            status: 0, message:`DB Error: `
        }
    },
    UPDATED: {
        code: 200,
        json: { status: 1, message: `updated successfully` },
    },
    FORBIDDEN: {
        code:403,
        json:{ status: 0, message: 'unauthorized user' }
    },
    ERROR_OCCURRED:{
        code: 502,
        json: {
            code: 0,
            message: `error occurred`
        },
    },
};

exports.genericsReponces = genericResponses;


const sentencesResponses = {
    NOT_FOUND:{
        code: 404,
        json:{
            status: 0,
            message:'not found',
        }
    },
    ADD:{
        SAVED_SUCCESSFULLY:genericResponses.SAVED_SUCCESSFULLY,
        FAILURE: {
            code: 502,
            json:{
                status: 0,
                message:'there was error to save the sentence',
            },
        },
    },
    GET:{
        SUCCESS: genericResponses.GET_SUCCESS,
    },
    UPDATE: {
        SUCCESS: genericResponses.UPDATED,
        FAILURE: genericResponses.ERROR_OCCURRED,
    },
    DELETE:{
        SUCCESS: genericResponses.GENERAL_SUCCESS,
    },
    DB_ERROR: genericResponses.DB_ERROR,
    FORBIDDEN: genericResponses.FORBIDDEN,
    MISSING_PARAMS: genericResponses.MISSING_PARAMS,
    WRONG_PARAMS: genericResponses.WRONG_PARAMS,
    ERROR_OCCURRED: genericResponses.ERROR_OCCURRED,
};

exports.sentencesResponses = sentencesResponses;

const ordersResponses = {
    NOT_FOUND:{
        code: 404,
        json:{
            status: 0,
            message:'not found',
        }
    },
    ADD:{
        SAVED_SUCCESSFULLY:genericResponses.SAVED_SUCCESSFULLY,
        FAILURE: {
            code: 502,
            json:{
                status: 0,
                message:'there was error to establish your order',
            },
        },
    },
    GET:{
        SUCCESS: genericResponses.GET_SUCCESS,
    },
    UPDATE: {
        SUCCESS: genericResponses.UPDATED,
        FAILURE: genericResponses.ERROR_OCCURRED,
    },
    DELETE:{
        SUCCESS: genericResponses.GENERAL_SUCCESS,
    },
    DB_ERROR: genericResponses.DB_ERROR,
    FORBIDDEN: genericResponses.FORBIDDEN,
    MISSING_PARAMS: genericResponses.MISSING_PARAMS,
    WRONG_PARAMS: genericResponses.WRONG_PARAMS,
    ERROR_OCCURRED: genericResponses.ERROR_OCCURRED,
};

exports.ordersResponses = ordersResponses;

const usersResponses = {
    NOT_FOUND:{
        code: 404,
        json:{
            status: 0,
            message:'not found',
        }
    },
    ADD:{
        SAVED_SUCCESSFULLY:genericResponses.SAVED_SUCCESSFULLY,
        FAILURE: {
            code: 502,
            json:{
                status: 0,
                message:'there was error to save users credentials',
            },
        },
    },
    GET:{
        SUCCESS: genericResponses.GET_SUCCESS,
    },
    UPDATE: {
        SUCCESS: genericResponses.UPDATED,
        FAILURE: genericResponses.ERROR_OCCURRED,
    },
    DELETE:{
        SUCCESS: genericResponses.GENERAL_SUCCESS,
    },
    DB_ERROR: genericResponses.DB_ERROR,
    FORBIDDEN: genericResponses.FORBIDDEN,
    MISSING_PARAMS: genericResponses.MISSING_PARAMS,
    WRONG_PARAMS: genericResponses.WRONG_PARAMS,
    ERROR_OCCURRED: genericResponses.ERROR_OCCURRED,
};

exports.usersResponses = usersResponses;
