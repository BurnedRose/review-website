import axios from 'axios';
const  USER_REST_API_URL  = 'http://localhost:8080/api/all_reviews';

class ReviewService {
    getAllReviews() {
        return axios.get(USER_REST_API_URL);
    }
}

export default new ReviewService();