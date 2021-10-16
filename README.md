GITHUB LINK: https://github.com/mhmmd-iqbal/iqbal-betest

MONGODB CONN:mongodb+srv://iqbal12345:iqbal12345@cluster0.izvnv.mongodb.net/db_iqbal_betest?retryWrites=true&w=majority

host on HEROKU :

url: https://ms-iqbal-betest.herokuapp.com

route:

    - register user:
    path: {url}/register
    method: POST
    params:
        header :
            Content-Type : application/json
        body :
            userName        : string | require
            accountNumber   : string | require
            emailAddress    : string | require
            identifyNumber  : string | require
            password        : string | require

    - Login:
    path: {url}/login
    method: POST
    params:
        header :
            Content-Type : application/json
        body :
            userName : string | require
            password : string | require

    - Get User Data
    path: {url}/user
    method: GET
    params:
        header :
            Content-Type  : application/json
            Authorization : Bearer {token}
        query :
            identifyNumber : string | nullable
            accountNumber  : string | nullable
