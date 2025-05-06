export interface ISession {
    id: string;
    sessionId: string;
    userId: string;
    startTime: Date;
    endTime: Date;
    ip: string;
    agent: string;
    country: string;
}