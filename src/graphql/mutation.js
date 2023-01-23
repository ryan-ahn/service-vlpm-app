export const createMessage = /* GraphQL */ `
  mutation MyMutation($input: CreateChatInput!, $condition: ModelChatConditionInput) {
    createChat(input: $input, condition: $condition) {
      message
      updatedAt
      createdAt
    }
  }
`;

export const createCall = /* GraphQL */ `
  mutation MyMutation($input: CreateCallInput!, $condition: ModelCallConditionInput) {
    createCall(input: $input, condition: $condition) {
      id
      updatedAt
      createdAt
    }
  }
`;

export const createUser = /* GraphQL */ `
  mutation MyMutation($input: CreateUserInput!, $condition: ModelUserConditionInput) {
    createUser(input: $input, condition: $condition) {
      id
      name
    }
  }
`;

export const createChatRoom = /* GraphQL */ `
  mutation MyMutation($input: CreateChatRoomInput!, $condition: ModelChatRoomConditionInput) {
    createChatRoom(input: $input, condition: $condition) {
      id
    }
  }
`;

export const createUserChatRoom = /* GraphQL */ `
  mutation MyMutation(
    $input: CreateUserChatRoomInput!
    $condition: ModelUserChatRoomConditionInput
  ) {
    createUserChatRoom(input: $input, condition: $condition) {
      id
    }
  }
`;
