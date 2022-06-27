import config from '../tsconfig.json';
import treeData from '../data/treeData';
const axios = require('axios');

export async function getTreeData(id: string): Promise<treeData> {
    let data: treeData = new treeData(); 
    let res = await axios.get(`${config.connectionString}?id=${id}`).catch(function (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
    });

    if (res.status !== 200) {
        console.error(`\nDid not get an OK from the server. Code: ${res.status}`);
    }
  
    data = res.data;
    console.log(data);

    return data;
}

export async function postTreeData(id: string, data: treeData): Promise<boolean> { 
    let res = await axios.post(`${config.connectionString}?id=${id}`, data).catch(function (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
        return false;
    });

    if (res.status !== 200) {
        console.error(`\nDid not get an OK from the server. Code: ${res.status}`);
        return false;
    }
  
    return true;
}