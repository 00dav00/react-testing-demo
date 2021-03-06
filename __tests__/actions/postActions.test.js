jest.mock('../../src/services/postService');

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Actions from '../../src/actions';

const middlewares = [thunk] // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares)


describe('Post Actions', () => {

  it('GET posts', () => {
    // Mock Redux store (also provides utils to assert expected actions)
    const store = mockStore({});

    // The actions we expect to be dispatched by the actions creator we're testing
    const expectedActions = [
      { 
        type: Actions.Types.post.GET_POSTS,
        posts: [
          {
            "userId": 1,
            "id": 1,
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
          },
          {
            "userId": 1,
            "id": 2,
            "title": "qui est esse",
            "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
          }
        ]
      }
    ];

    // Return a promise that is resolved when all actions are dispatched
    return store
      .dispatch(Actions.post.getPosts())
      .then(() => {
        // Get the actions dispatched and compare with expected actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('Handle GET posts errors', () => {
    const store = mockStore({});
    return store
      .dispatch(Actions.post.getPosts(-1))
      .catch(() => {
        expect(store.getState()).toEqual({})
      });
  });

});