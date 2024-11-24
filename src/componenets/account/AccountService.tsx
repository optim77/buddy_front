import axios from "axios";

const fetch = async (token: string | null) => {
    if (!token) {
        throw new Error("Token is required");
    }
    await axios.get(`${process.env.REACT_APP_API_ADDRESS}/profile`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : '',
        }
    })
}

const AccountService = {
    fetch
}
export default AccountService;