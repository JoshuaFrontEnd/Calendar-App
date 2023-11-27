import { useDispatch, useSelector } from 'react-redux';
import { onCloseDateModal, onOpenDateModal } from '../store';

export const useUiStore = () => {

  const dispatch = useDispatch();

  // Al usar "useSelector" tengo acceso al "store"
  const {
    isDateModalOpen
  } = useSelector( state => state.ui );

  // Con "useDispatch" puedo acceder a los reducers de los "slice" y ejecutarlos
  const openDateModal = () => {
    dispatch( onOpenDateModal() );
  }

  const closeDateModal = () => {
    dispatch( onCloseDateModal() );
  }

  // Funcion toggle que cierra y abre el modal, para usarla se debe llamar desde el trigger que abre y desde el trigger que cierra el modal, y para evitar problemas al cerrar el modal con doble click, se debe agregar un "pointer-events: none" a la clase del modal que tiene el "overlay { opacidad: 0 }"
  const toggleDateModal = () => {
    ( isDateModalOpen )
    ? closeDateModal()
    : openDateModal()
  }

  return {
    // Propiedades
    isDateModalOpen,

    // Metodos
    openDateModal,
    closeDateModal,
    // toggleDateModal

  }

}
