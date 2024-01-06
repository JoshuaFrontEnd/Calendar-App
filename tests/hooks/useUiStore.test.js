import { act, renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { uiSlice } from '../../src/store';
import { useUiStore } from '../../src/hooks/useUiStore';

// Mock del store para el testing
const getMockStore = ( initialState ) => {
  return configureStore({
    reducer: {
      ui: uiSlice.reducer
    },
    preloadedState: {
      ui: {...initialState }
    }
  })
}

describe('Pruebas en useUiStore', () => {

  test('debe de regresar los valores por defecto', () => {

    const mockStore = getMockStore({ isDateModalOpen: false });

    const { result } = renderHook( () => useUiStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });

    expect( result.current ).toEqual({
      isDateModalOpen: false,
      openDateModal: expect.any( Function ),
      closeDateModal: expect.any( Function )
    })

  })

  test('openDateModal debe de colocar true en el isDateModalOpen', () => {

    const mockStore = getMockStore({ isDateModalOpen: false });

    const { result } = renderHook( () => useUiStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });

    const { isDateModalOpen, openDateModal } = result.current;

    act( () => {
      openDateModal();
    })

    expect({ result: result.current, isDateModalOpen }).toBeTruthy();

  })

  test('closeDateModal debe de colocar false en el isDateModalOpen', () => {

    const mockStore = getMockStore({ isDateModalOpen: false });

    const { result } = renderHook( () => useUiStore(), {
      wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
    });

    act( () => {
      result.current.closeDateModal();
    })

    expect( result.current.isDateModalOpen ).toBeFalsy();

  })

})