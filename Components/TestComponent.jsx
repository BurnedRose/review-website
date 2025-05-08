import React from "react";
import ReviewService from "@/service/ReviewService";
import Fetch from "@/service/Fetch";

class TestComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      status: null,
    };
  }

  componentDidMount() {
    Fetch.getAllReviews().then((response) => {
        this.setState({ users: response.data });
  });
}
render() {
    return (
        <div>
            <h1 className="text-center">Reviews List</h1>
            <table className="table table-striped">
                <thread>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Image</th>
                    </tr>
                </thread>
            </table>
        </div>
    );
   }
}