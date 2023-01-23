export const onCreateMessage = /* GraphQL */ `
  subscription MySubscription {
    onCreateChat {
      message
      updatedAt
      createdAt
    }
  }
`;
