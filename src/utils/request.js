import axios from "axios"

export const initialUserState = {
    name: "____",
    level: 1,
    profit_perhour: 0,
    earn_pertap: 1,
    coins: 0,
    fan_tokens_level: 0,
    staking_level: 0,
    btc_pairs_level: 0,
    eth_pairs_level: 0,
    top_10_cmc_pairs_level: 0,
    gamefi_tokens_level: 0,
    timestamp: 0,
    invited_friends: [],
    is_joined_discord: 0,
    is_joined_marketcap: 0,
    is_joined_tgchannel: 0,
    is_joined_tggroup: 0,
    is_joined_twitter: 0,
    daily_reward_time: 0,
    daily_reward_value: 0
}

const baseUrl = 'https://mikebot-backend.onrender.com';
// const baseUrl = 'https://mikebot-backend.vercel.app';
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