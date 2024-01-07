import { render, screen } from '@testing-library/react';
import { useAuthStore } from '../../src/hooks/useAuthStore';
import { AppRouter } from '../../src/router/AppRouter';

jest.mock('../../src/hooks/useAuthStore');

// Mock para error del modal
jest.mock('react-modal', () => ({
  ...jest.requireActual('react-modal'),
  setAppElement: jest.fn()
}))

describe('Pruebas en <AppRouter />', () => {

  const mockCheckAuthToken = jest.fn();

  beforeEach(() => jest.clearAllMocks() );

  test('debe de mostrar la pantalla de carga y llamar checkAuthToken', () => {

    useAuthStore.mockReturnValue({
      status: 'checking',
      checkAuthToken: mockCheckAuthToken
    })

    render( <AppRouter /> );

    expect( screen.getByText('Cargando...') ).toBeTruthy();
    expect( mockCheckAuthToken ).toHaveBeenCalled();

  })

})