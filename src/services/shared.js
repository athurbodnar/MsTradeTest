import axios from "axios";
import crypto from "crypto";
//Because of CORS errors i`m using https://cors-anywhere.herokuapp.com/
axios.defaults.baseURL = 'api/v1'
let apiSecret = '-hoVHM9kC1JRwlQBPjYdzosCCpKl7CNtomzyCTGVoLcQ5PSV'
let apiKey = '48GphC_MTWN_0ntW4V1osU4S'
    function getRequest(requestUrl) {
        let expires = Math.round(new Date().getTime() / 1000) + 60
        let signature = crypto.createHmac('sha256', apiSecret).update('GET' + '/api/v1' + requestUrl + expires)
            .digest('hex')
        return axios.get(requestUrl, {
            headers: {
                'content-type' : 'application/json',
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'api-expires':  expires,
                'api-key': apiKey,
                'api-signature': signature
            }
        })
    }
    function postRequest(requestUrl, data) {
        let expires = Math.round(new Date().getTime() / 1000) + 60
        let signature = crypto.createHmac('sha256', apiSecret).update('POST' + '/api/v1' + requestUrl + expires + JSON.stringify(data))
            .digest('hex')
        axios.post(requestUrl, data, {
            headers: {
                'content-type' : 'application/json',
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'api-expires':  expires,
                'api-key': apiKey,
                'api-signature': signature
            }
        }).then(res => {
            return res
        })
}
    function concatArrays(array1, array2) {
    let concatedArray = []
        array1.map(arr1Item => {
            array2.map(arr2Item => {
                if(arr1Item.symbol === arr2Item.symbol) {
                    concatedArray.push({
                        symbol: arr1Item.symbol,
                        price: arr2Item.lastPrice
                    })
                }
            })

        })
        return concatedArray
    }
export { getRequest, postRequest, concatArrays}