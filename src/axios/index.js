import axios from 'axios';
 
// 创建 axios 实例
const service = axios.create({});
 
// 请求拦截器
service.interceptors.request.use(
    config => {
        // 统一添加请求头
        config.headers['Referrer-Policy'] = 'strict-origin' 
        return config;
    },
    error => {
        // 请求错误的处理
        return Promise.reject(error);
    }
);
 
export default service;