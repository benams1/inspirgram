module.exports = {
    DB_URL: process.env.DB_URL,
    PAYPAL_CONFIGURE_OBJ:{
        mode: process.env.PAYPAL_CLIENT_MODE,
        client_id: process.env.PAYPAL_CLIENT_ID,
        client_secret: process.env.PAYPAL_CLIENT_SECRET
    },
    APP_URL: process.env.URL,
};
