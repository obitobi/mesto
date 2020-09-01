export class UserInfo {

    constructor({name, info}) {
        this._profileName = document.querySelector(name);
        this._profileDesc = document.querySelector(info);
    }

    getUserInfo() {
        return {
            name: this._profileName.textContent,
            info: this._profileDesc.textContent
        };
    }

    setUserInfo(name, info) {
        this._profileName.textContent = name;
        this._profileDesc.textContent = info;
    }
}
