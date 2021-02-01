import axios from 'axios'

const client = axios.create({
    baseURL: '/api/products',
    json: true
})

export default {
    async execute(method, resource, data) {
        return client({
            method,
            url: resource,
            data
        }).then(req => {
            return req.data
        })
    },
    search(keywords, pageIndex) {
        return this.execute('get', `/search?keyword=${keywords}&pageSize=25&pageIndex=${pageIndex}`);
    },
    get(id) {
        return this.execute('get', `/get?id=${id}`);
    },
    checkout(basket) {
        return this.execute('post', '/checkout', basket);
    },
}