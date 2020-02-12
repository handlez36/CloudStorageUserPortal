import axios from 'axios'

import { TYPES } from '../containers/Support/TicketConstants';

const BASE_URL              = `${process.env.REACT_APP_API_BASE_URL}/bpm/API`;
const API_TOKEN_COOKIE_KEY  = 'X-Bonita-API-Token';
let axiosConfig             =
{
    withCredentials: true,
    crossDomain: true,
    headers:
        {
            "Content-Type":     "application/json",
        }
}
let ticketProcessId;

export class BonitaService {

    constructor(sessionId, sessionToken) {
        this.formHeaders(sessionId, sessionToken);
        this.getInstalledTicketProcess(sessionId);
    }

    formHeaders(sessionId, sessionToken) {
        axiosConfig.headers[API_TOKEN_COOKIE_KEY]   = sessionToken;
    }

    /**
     * TODO: Add logic
     */
    findLatestProcess = (processes) => {
        return processes[0];
    }

    findTicketProcess = (response) => {
        let mainTicketProcess = null;

        if (response.data) {
            const ticketProcesses = response.data.filter( process => process.displayName === 'Support Ticket' )

            if (ticketProcesses.count < 1) { return null }

            if (ticketProcesses.count > 1) {
                mainTicketProcess = this.findLatestProcess(ticketProcesses);
            } else {
                mainTicketProcess = ticketProcesses[0];
            }
            ticketProcessId = mainTicketProcess.id;
        }

        if (!mainTicketProcess) {
            throw new Error('No ticket processes found in Bonita');
        }

        return mainTicketProcess;

    }

    getInstalledTicketProcess = (sessionId) => {
        let url = `${BASE_URL}/bpm/process?p0&c=10`;
        let process = null;

        axios.get(url, {withCredentials: true})
            .then( response => {
                if (response.status === 200) {
                    process = this.findTicketProcess(response);
                }
                
                return !!process
            })
    }

    constructTicket(finalizedTicket, auth_status) {
        const {user: {firstname, lastname}} = auth_status;
        let ticket                          = null;

        if (!finalizedTicket) {
            ticket = {
                id:             '10003',
                title:          'Ticket Title',
                status:         'Open',
                requestor:      'Brandon',
                priority:       'NORMAL',
                type:           'SUPPORT',
                description:    'This is the ticket description',
                dateSubmitted:  'Oct 4, 2018 | 11:00 AM'
            }    
        } else {
            ticket = {
                id:             finalizedTicket.caseId || '',
                title:          finalizedTicket.title,
                status:         'Open',
                requestor:      `${firstname} ${lastname}`,
                priority:       finalizedTicket.priority,
                type:           finalizedTicket.type,
                description:    finalizedTicket.description,
                dateSubmitted:  finalizedTicket.dateSubmitted
            }
        }

        return ticket;
    }

    create(params) {
        console.log(`Creating ticket with ticketProcessId of ${ticketProcessId} and params: ${params}`);

        let url = `${BASE_URL}/bpm/process/${ticketProcessId}/instantiation`;

        return axios.post(url, params, axiosConfig);
    }
}