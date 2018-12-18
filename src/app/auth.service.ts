export class AuthService {
    isLoggedIn: boolean = false;

    isAuthenticated() {
        const promise = new Promise(
            (resolve, reject) => {
                setTimeout( resolve(this.isLoggedIn), 800);
            }
        );
        return promise;
    }

    login() {
        this.isLoggedIn = true;
    }

    logout() {
        this.isLoggedIn = false;
    }
}