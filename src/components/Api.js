export default class Api {
  constructor(urlToRequestedResource, optionsObj) {
    this.url = urlToRequestedResource;
    this.options = optionsObj;
    this.groupId = "group-12";
  }

  getUserData() {
    return fetch(`${this.url}${this.groupId}/users/me`,
      this.options
    )
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        // if the this.url returns an error, reject the promise
        return Promise.reject(`Error:${res.status}`)
      })
  }

  getInitialCards() {
    return fetch(`${this.url}/${this.groupId}/cards`, this.options)
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Error:${res.status}`)
      })
  }

  updateUser(userData) {
    return fetch(`${this.url}/${this.groupId}/users/me`, {
      method: "PATCH",
      headers: this.options.headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Error:${res.status}`)
      })
  }

  addCard(cardData) {
    return fetch(`${this.url}/${this.groupId}/cards`, {
      method: "POST",
      headers: this.options.headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link,
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Error:${res.status}`)
      })
  }

  deleteCard(cardId) {
    return fetch(`${this.url}/${this.groupId}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.options.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Error:${res.status}`)
      })
  }

  addLike(cardId) {
    return fetch(`${this.url}/${this.groupId}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this.options.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Error:${res.status}`)
      })
  }

  removeLike(cardId) {
    return fetch(`${this.url}/${this.groupId}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this.options.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Error:${res.status}`)
      })
  }

  changeProfilePic(avatarLink) {
    return fetch(`${this.url}/${this.groupId}/users/me/avatar`, {
      method: "PATCH",
      headers: this.options.headers,
      body: JSON.stringify({
        avatar: avatarLink.avatar
      }),
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Error:${res.status}`)
      })
  }
}
