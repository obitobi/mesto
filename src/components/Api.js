export class Api {

    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getProfileInfo() {
        return fetch(this._baseUrl+'/users/me', {
            headers: this._headers,
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject("Произошла ошибка");
        });
    }

    getInitialCards() {
        return fetch(this._baseUrl.concat('/cards'), {
            headers: this._headers
        }).then((res) => {
            if(!res.ok) {
                return Promise.reject('Error in getInitialCards');
            } return res.json();
        })
    }

    updateProfileInfo(name, description) {
        return fetch(this._baseUrl.concat('/users/me'), {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: description
            })
        }).then((res) => {
            if(!res.ok) {
                return Promise.reject('Error in updateProfileInfo');
            }
            console.log(`Profile updated with status: ${res.status}`);
            return res.json();
        })
    }

    addNewCard(name, link) {
        return fetch(this._baseUrl.concat('/cards'), {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        }).then((res) => {
            if(!res.ok) {
                return Promise.reject('Error in addNewCard');
            }
            console.log(`New card was added with status: ${res.status}`)
            return res.json();
        });
    }

    deleteCard(id) {
        fetch(this._baseUrl.concat(`/cards/${id}`), {
            method: 'DELETE',
            headers: this._headers
        }).then((res) => {
            if(!res.ok) {
                return Promise.reject('Error in deleteCard');
            } return res.json();
        }).then((data) => console.log(data))
            .catch((rej) => console.log(rej));
    }

    like(id) {
        fetch(this._baseUrl.concat(`/cards/likes/${id}`), {
            method: 'PUT',
            headers: this._headers
        }).then((res) => {
            if(!res.ok) {
                return Promise.reject('Error in like');
            } return res.json();
        }).then((data) => console.log(data))
            .catch((rej) => console.log(rej));
    }

    removeLike(id) {
        fetch(this._baseUrl.concat(`/cards/likes/${id}`), {
            method: 'DELETE',
            headers: this._headers
        }).then((res) => {
            if(!res.ok) {
                return Promise.reject('Error in removeLike');
            } return res.json();
        }).then((data) => console.log(data))
            .catch((rej) => console.log(rej));
    }

    updateProfileAvatar(link) {
        fetch(this._baseUrl.concat('/users/me/avatar'), {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: link
            })
        }).then((res) => {
            if(!res.ok) {
                return Promise.reject('Error in updateProfileAvatar');
            } return res.json();
        }).then((data) => console.log(data))
            .catch((rej) => console.log(rej));
    }
}
