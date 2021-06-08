export default class UserInfo {
  constructor({ profileTitleElement, profileSubtitleElement }) {
    this.name = profileTitleElement.textContent;
    this.job = profileSubtitleElement.textContent;
  }

  getUserInfo() {
    const userInfo = {
      name: this.name,
      job: this.job
    }
    return userInfo
  }

  setUserInfo(newUserData) {
    popupInputTypeName.value  = newUserData.name
    popupInputTypeJob.value = newUserData.job
  }
}
