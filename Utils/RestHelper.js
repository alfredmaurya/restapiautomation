const axios = require('axios');
const instance = axios.create()

instance.interceptors.request.use((config) => {
    config.headers['request-startTime'] = process.hrtime()
    return config
})
instance.interceptors.response.use((response) => {
    const start = response.config.headers['request-startTime']
    const end = process.hrtime(start)
    const milliseconds = Math.round((end[0] * 1000) + (end[1] / 1000000))
    response.headers['request-duration'] = milliseconds
    return response
})

const getData = (url) => {
    try {
        return axios.get(url);
    } catch (e) {
        console.error('exception occurred while GET', e);
        throw e;
    }
}

const postData = (url, data) => {
    try {
        return axios.post(url, data);
    } catch (e) {
        console.error('exception occurred while POST', e);
        throw e;
    }
}

const patchData = async (url, data) => {
    try {
        return await axios.patch(url, data);
    } catch (e) {
        console.error('exception occurred while PATCH', e);
        throw e;
    }
}

const deleteData = async (url, data) => {
    try {
        return await axios.delete(url);
    } catch (e) {
        console.error('exception occurred while DELETE', e);
        throw e;
    }
}
const generalFunction=async (config)=>{
    try {
        return await instance.request(config);
    } catch (e) {
        console.error('exception occurred', e);
        throw e;
    }
}

module.exports = {
    getData,
    postData,
    patchData,
    deleteData,
    generalFunction
}