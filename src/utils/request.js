import axios from "axios"

export const initialUserState = {
    name: "____",
    level: 1,
    profit_perhour: 0,
    coins: 0,
    fan_tokens_level: 0,
    staking_level: 0,
    btc_pairs_level: 0,
    eth_pairs_level: 0,
    top_10_cmc_pairs_level: 0,
    gamefi_tokens_level: 0
}

const baseUrl = 'https://mikebot-backend.onrender.com';
// const baseUrl = 'http://localhost:4000'
export const request = (url, method, data) => {
    return axios(baseUrl + url, {
        method: method,
        mode: 'no-cors',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        data: data
    })
}