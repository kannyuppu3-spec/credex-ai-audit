export const supabase = {
  auth: {
    getUser: jest.fn(() =>
      Promise.resolve({
        data: { user: null },
      })
    ),

    onAuthStateChange: jest.fn(() => ({
      data: {
        subscription: {
          unsubscribe: jest.fn(),
        },
      },
    })),

    signInWithOAuth: jest.fn(),
    signOut: jest.fn(),
  },

  from: jest.fn(() => ({
    insert: jest.fn(() => ({
      select: jest.fn(() => ({
        single: jest.fn(() =>
          Promise.resolve({
            data: {
              id: 1,
            },
            error: null,
          })
        ),
      })),
    })),
  })),
};