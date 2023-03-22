import { BlogPost } from "../../data/data";
import reducer, {
  removePost,
  PostState,
  addNewPost,
  fetchPosts,
} from "../post/postSlice";

const TestPosts: BlogPost[] = [
  {
    "id": "037d4464-5d8d-4a66-830d-9b42be63261d",
    "userId": 1,
    "datePosted": "2022-05-07T01:41:43Z",
    "title": "Vestibulum ante ipsum primis in faucibus orci luctus",
    "body": "Vestibulum ante ipsum primis in faucibus orci luctus",
  },
  {
    "id": "037d4464-5dasdd-4aasd6-830d-9b42beasd",
    "userId": 2,
    "datePosted": "2022-06-08T01:41:43Z",
    "title": "Vestibulum  test ante ipsum primis in faucibus orci luctus",
    "body": "Vestibulum ate asdnte ipsum primis in faucibus orci luctus",
  },
];

describe("postSlice", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual({
      allPosts: [],
      addingError: false,
    });
  });

  it("should add posts to list when fetched", () => {
    const action = { type: fetchPosts.fulfilled.type, payload: TestPosts };

    const previousState: PostState = {
      allPosts: [],
      addingError: false,
    };

    expect(reducer(previousState, action)).toEqual({
      allPosts: TestPosts,
      addingError: false,
    });
  });

  it("should add post to the list", () => {
    const action = {
      type: addNewPost.fulfilled.type,
      payload: TestPosts[1],
    };

    const previousState: PostState = {
      allPosts: [TestPosts[0]],
      addingError: false,
    };

    expect(reducer(previousState, action)).toEqual({
      allPosts: TestPosts,
      addingError: false,
    });
  });

  it("should remove post from list", () => {
    const action = {
      type: removePost.fulfilled.type,
      meta: { arg: "037d4464-5d8d-4a66-830d-9b42be63261d" },
    };

    const previousState: PostState = {
      allPosts: TestPosts,
      addingError: false,
    };

    expect(reducer(previousState, action)).toEqual({
      allPosts: TestPosts.filter(
        (post) => post.id !== "037d4464-5d8d-4a66-830d-9b42be63261d",
      ),
      addingError: false,
    });
  });
});
