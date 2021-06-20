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
      name: cardData.name,
      link: cardData.link,
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(res.status)
    })
}
