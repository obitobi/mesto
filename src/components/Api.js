export class Api {

    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
    //Спасибо
    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(new Error(`Ошибка: ${res.status}`));
        }
        return res.json();
    }

    getProfileInfo() {
        return fetch(this._baseUrl+'/users/me', {
            headers: this._headers,
        }).then((res) => this._getResponseData(res));
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        }).then((res) => this._getResponseData(res));
    }

    updateProfileInfo(name, description) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: description
            })
        }).then((res) => this._getResponseData(res));
    }

    addNewCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        }).then((res) => this._getResponseData(res));
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        }).then((res) => this._getResponseData(res));
    }

    like(id) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
            method: 'PUT',
            headers: this._headers
        }).then((res) => this._getResponseData(res));
    }

    removeLike(id) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: this._headers
        }).then((res) => this._getResponseData(res));
    }

    updateProfileAvatar(link) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: link
            })
        }).then((res) => this._getResponseData(res));
    }
}
