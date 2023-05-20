import axios from "axios"


export const getCards = async () => {
    const response = await axios.get(`http://127.0.0.1:8000/cards/`)
    return response
}

export const getDevice = async () => {
    const response = await axios.get(`http://127.0.0.1:8000/device/`)
    return response
}

export const getPeople = async () => {
    const response = await axios.get(`http://127.0.0.1:8000/people/`)
    return response
}

export const getIssued = async () => {
    const response = await axios.get(`http://127.0.0.1:8000/issued/`)
    return response
}
