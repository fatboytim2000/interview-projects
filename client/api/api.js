import axios from './axios'

export default {
    async execute(method, resource, data) {
        return axios({
            method,
            url: resource,
            data
        }).then(req => {
            return req.data
        })
    },
    search(keywords, pageIndex, pageSize) {
        return this.execute('get', `/search?keyword=${keywords}&pageSize=${pageSize}&pageIndex=${pageIndex}`);
    },
    get(id) {
        return this.execute('get', `/get?id=${id}`);
    },
    checkout(basket) {
        return this.execute('post', '/checkout', basket);
    },
}