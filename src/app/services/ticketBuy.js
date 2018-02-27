import { apiEndpoint } from '../../config/app';
import createRestApiClient from './createRestApiClient';

export default () => {
    const client = createRestApiClient().withConfig({ baseURL: apiEndpoint });
    return {
        ticketBuyer: ({numberOfTickets,activityId}) => client.request({
          method: 'POST',
          url: '/api/parent/ticket/buy',
          data: {
            activityId,
            numberOfTickets
          }
        }),
        getPdf: ({ticketId}) => client.request({
          method: 'GET',
          url: `/api/parent/ticket/${ticketId}/pdf/`
        })
    };
};
