import axios from "axios";

const USER_REST_API_URL = 'http://localhost:8080/api/all_reviews';

class Fetch {
    getAllReviews() {
        return axios.get('http://localhost:8080/api/all_reviews', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .catch(error => console.error('Error fetching reviews:', error));
    }
}

export default new Fetch();