export class Api {

    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getProfileInfo() {
        return fetch(this._baseUrl+'/users/me', {
            headers: this._headers,
        }).then((res) => {
            if (!res.ok) {
                return Promise.reject("Произошла ошибка");
            }
            return res.json();
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
        return fetch(this._baseUrl.concat(`/cards/${id}`), {
            method: 'DELETE',
            headers: this._headers
        }).then((res) => {
            if(!res.ok) {
                return Promise.reject('Error in deleteCard with status ' + res.status);
            } return res.json();
        });
    }

    like(id) {
        return fetch(this._baseUrl.concat(`/cards/likes/${id}`), {
            method: 'PUT',
            headers: this._headers
        }).then((res) => {
            if(!res.ok) {
                return Promise.reject('Error in like');
            } return res.json();
        });
    }

    removeLike(id) {
        return fetch(this._baseUrl.concat(`/cards/likes/${id}`), {
            method: 'DELETE',
            headers: this._headers
        }).then((res) => {
            if(!res.ok) {
                return Promise.reject('Error in removeLike');
            } return res.json();
        });
    }

    updateProfileAvatar(link) {
        return fetch(this._baseUrl.concat('/users/me/avatar'), {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: link
            })
        }).then((res) => {
            if(!res.ok) {
                return Promise.reject('Error in updateProfileAvatar');
            } return res.json();
        });
    }
}


/*
fetch('https://mesto.nomoreparties.co/v1/cohort-15/users/me/avatar', {
            method: 'PATCH',
            headers: {
                authorization: '49a75c0f-916c-427e-bed4-87859e997b2f',
        'Content-Type': 'application/json'
    },
            body: JSON.stringify({
                avatar: 'https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABYQp33Z3D9uGJK0IZsYfvENQpSz4zoSrjb8v5CCl4UTiFDe7Z_yovhieDFhJtGm2Rh4LoleJfHwHdyRDMtezwqojkDXH.jpg?r=77f'
            })
        }).then((res) => {
            if(!res.ok) {
                return Promise.reject('Error in updateProfileAvatar');
            } return res.json();
        })

* */
