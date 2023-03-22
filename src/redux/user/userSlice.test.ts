import { User } from "../../data/data";
import reducer, { fetchUsers, UserState, removeUser } from "../user/userSlice";

const TestUsers: User[] = [
  {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "email": "test@test.org",
    "gender": "Male",
    "ip_address": "127.0.0.1",
  },
  {
    "id": 2,
    "first_name": "Jane",
    "last_name": "Doe",
    "email": "test-second@test.org",
    "gender": "Female",
    "ip_address": "0.0.0.0",
  },
];

describe("usersSlice", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: undefined })).toEqual({
      userList: [],
      loadingUsers: true,
      expandedUserList: []
    });
  });

  it("adds users to list when fetched", () => {
    const action = { type: fetchUsers.fulfilled.type, payload: TestUsers };

    const previousState: UserState = {
      userList: [],
      loadingUsers: false,
      expandedUserList: []
    };

    expect(reducer(previousState, action)).toEqual({
      userList: TestUsers,
      loadingUsers: false,
      expandedUserList: []
    });
  });

  it("remove user", () => {
    const action = { type: removeUser.fulfilled.type, meta: { arg: 1} };

    const previousState: UserState = {
      userList: TestUsers,
      loadingUsers: false,
      expandedUserList: []
    };

    expect(reducer(previousState, action)).toEqual({
      userList: TestUsers.filter((user) => user.id !== 1),
      loadingUsers: false,
      expandedUserList: []
    });
  });
});
