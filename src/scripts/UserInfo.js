
import { popupInputTypeName, popupInputTypeJob } from './constants.js'

export default class UserInfo {
  constructor({ profileTitleElement, profileSubtitleElement }) {
    this.name = profileTitleElement;
    this.job = profileSubtitleElement;
  }

  getUserInfo() {
    const userInfo = {
      name: this.name.textContent,
      job: this.job.textContent
    }
    popupInputTypeName.value = userInfo.name
    popupInputTypeJob.value = userInfo.job;
    return userInfo;
  }

  setUserInfo(newUserData) {
    this.name.textContent = newUserData.name;
    this.job.textContent = newUserData.job;
  }
}
