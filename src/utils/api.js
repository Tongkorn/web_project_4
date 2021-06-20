const server = "https://around.nomoreparties.co"
const token = "e09604a5-57aa-4b20-9a83-ea66e5c6924b"
const groupId = "group-12"

export const getUserData = () => {
  return fetch(`${server}/${groupId}/users/me`, {
    method: "GET",
    headers: {
      authorization: token
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(res.status)
    })
}

export const getInitialCards = () => {
  return fetch(`${server}/${groupId}/cards`, {
    method: "GET",
    headers: {
      authorization: token
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(res.status)
    })
}

export const updateUser = (userData) => {
  return fetch(`${server}/${groupId}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: userData.name,
      about: userData.about
    })
  })
}

export const addCard = (cardData) => {
  return fetch(`${server}/v1/${groupId}/cards`, {
    method: "POST",
    headers: {
      authorization: token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      likes: [],
      _id: "",
      name: cardData.name,
      link: cardData.link,
      owner: {
        name: "",
        about: "",
        avatar: "",
        _id: "",
        cohort: ""
      },
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(res.status)
    })
}

export const deleteCard = (cardId) => {
  return fetch(`${server}/v1/${groupId}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: token,
      "Content-Type": "application/json"
    },
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(res.status)
    })
}

export const addLike = (cardId) => {
  return fetch(`${server}/v1/${groupId}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: token,
      "Content-Type": "application/json"
    },
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(res.status)
    })
}

export const removeLike = (cardId) => {
  return fetch(`${server}/v1/${groupId}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: token,
      "Content-Type": "application/json"
    },
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(res.status)
    })
}
