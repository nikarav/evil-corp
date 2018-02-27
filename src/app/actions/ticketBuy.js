import * as types from '../types/TicketBuyTypes';
import ticketBuy from '../services/ticketBuy';
import Notifications, { success, error } from 'react-notification-system-redux';

function beginBuyTicket() {
    return {
        type: types.BUY_TICKET
    };
}

function buyTicketSuccess() {
    return {
        type: types.BUY_TICKET_SUCCESS
    };
}

function buyTicketFail(err) {
    return {
        type: types.BUY_TICKET_FAILURE
    };
}

function getTicketPdf() {
    return {
        type: types.GET_TICKET_PDF
    };
}

function getTicketPdfSuccess() {
    return {
        type: types.GET_TICKET_PDF_SUCCESS
    };
}

function getTicketPdfFail(err) {
    return {
        type: types.GET_TICKET_PDF_FAILURE
    };
}

export function buyTicket(data) {
    return (dispatch) => {
        dispatch(beginBuyTicket());

        return ticketBuy().ticketBuyer(data )
            .then((response) => {
                dispatch(buyTicketSuccess());
            })
            .catch((err) => {
                dispatch(buyTicketFail(err));
            });
    };
}

export function ticketPdf(data) {
    return (dispatch) => {
        dispatch(getTicketPdf());

        return ticketBuy().getPdf(data)
            .then((response) => {
                dispatch(getTicketPdfSuccess());
            })
            .catch((err) => {
                dispatch(getTicketPdfFail(err));
            });
    };
}
