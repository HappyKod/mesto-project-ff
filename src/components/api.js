const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-28',
    headers: {
        authorization: '58e37c49-337a-4be0-b10f-eb6f42746c87',
        'Content-Type': 'application/json'
    }
}

const jsonHandler = (res) => {
    if (res.ok) {
        return res.json();
    }
    return res.json()
        .then((json) => {
            return Promise.reject({
                status: res.status,
                body: json
            })
        })
        .catch((error) => {
            return Promise.reject({
                status: res.status,
                error: error || 'Unknown error'
            })
        })
}

export const getInitialCardsAPI = fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
})
    .then(jsonHandler)


export const getInitProfileAPI = fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
})
    .then(jsonHandler)


export const createCardAPI = (cardData) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(cardData)
    })
        .then(jsonHandler)
}

export const deleteCardAPI = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(jsonHandler)
}

export const likeCardAPI = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
        .then(jsonHandler)
}

export const dislikeCardAPI = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(jsonHandler)
}

export const editProfileAvatarAPI = (linkAvatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({avatar: linkAvatar})
    })
        .then(jsonHandler)
}

export const editProfileAPI = (profile) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(profile)
    })
        .then(jsonHandler)
}