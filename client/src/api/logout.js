import axios from "axios";

export function logout() {
    return axios.get("http://localhost:8080/logout", { withCredentials: true })
        .then((res) => {
            console.log(res);
            window.location.href = "/login";
        }).catch((err) => console.log(err));
    
}