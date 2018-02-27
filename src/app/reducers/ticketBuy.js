import * as types from '../types/TicketBuyTypes';

const INITIAL_STATE = { pdf: '' };

export default function (state = INITIAL_STATE, action) {
    let error;
    switch (action.type) {
      case types.GET_TICKET_PDF:
      case types.GET_TICKET_PDF_SUCCESS:
          return {...state, pdf: action.payload};
      case types.GET_TICKET_PDF_FAILURE:
      default:
              return state;
    }
  }
