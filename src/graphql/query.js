export const getUsers = /* GraphQL */ `
  query MyQuery($filter: ModelUserFilterInput) {
    listUsers(filter: $filter) {
      items {
        id
      }
    }
  }
`;

export const getMessages = /* GraphQL */ `
  query MyQuery {
    listChats {
      items {
        id
        message
        userId
      }
    }
  }
`;

export const test = '11';
export const getMyChatRooms = /* GraphQL */ `
  query MyQuery($id: ID!) {
    getUser(id: $id) {
      chatRooms {
        items {
          id
          chatRoom {
            lastMessage
            updatedAt
            users {
              items {
                user {
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;
