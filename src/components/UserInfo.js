export class UserInfo {

    constructor({name, info, avatar}) {
        this._profileName = document.querySelector(name);
        this._profileDesc = document.querySelector(info);
        this._profileAvatar = document.querySelector(avatar)
    }

    setAvatar(link) {
        this._profileAvatar.src = link;
    }

    getUserInfo() {
        return {
            name: this._profileName.textContent,
            info: this._profileDesc.textContent
        };
    }

    setUserInfo(name, info, id) {
        this._profileName.textContent = name;
        this._profileDesc.textContent = info;
        this.id = id
    }
}
