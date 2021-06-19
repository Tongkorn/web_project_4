
export const renderInitialCards = () => {
  return fetch("https://around.nomoreparties.co/group-12/cards", {
    headers: {
      authorization: "e09604a5-57aa-4b20-9a83-ea66e5c6924b"
    }
  })

}

//********************* Old Initial cards *********************/

// const yosemiteImage = 'https://code.s3.yandex.net/web-code/yosemite.jpg'
// const lakeLouiseImage = 'https://code.s3.yandex.net/web-code/lake-louise.jpg'
// const baldMountainsImage = 'https://code.s3.yandex.net/web-code/bald-mountains.jpg'
// const latemarImage = 'https://code.s3.yandex.net/web-code/latemar.jpg'
// const vanoiseNationalParkImage = 'https://code.s3.yandex.net/web-code/vanoise.jpg'
// const lagodiBraiesImage = 'https://code.s3.yandex.net/web-code/lago.jpg'

// export const initialCards = [
//   {
//     "name": "Yosemite Valley",
//     "link": yosemiteImage
//   },
//   {
//     "name": "Lake Louise",
//     "link": lakeLouiseImage
//   },
//   {
//     "name": "Bald Mountains",
//     "link": baldMountainsImage
//   },
//   {
//     "name": "Latemar",
//     "link": latemarImage
//   },
//   {
//     "name": "Vanoise National Park",
//     "link": vanoiseNationalParkImage
//   },
//   {
//     "name": "Lago di Braies",
//     "link": lagodiBraiesImage
//   }
// ]

