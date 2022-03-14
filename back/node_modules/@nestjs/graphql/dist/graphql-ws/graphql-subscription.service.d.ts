import { GraphQLSchema } from 'graphql';
import { ServerOptions } from 'graphql-ws';
import { SubscriptionConfig } from '../interfaces/gql-module-options.interface';
export interface GraphQLSubscriptionServiceOptions extends SubscriptionConfig {
    schema: GraphQLSchema;
    path?: string;
    context?: ServerOptions['context'];
}
export declare class GraphQLSubscriptionService {
    private readonly options;
    private readonly httpServer;
    private readonly wss;
    private readonly subTransWs;
    constructor(options: GraphQLSubscriptionServiceOptions, httpServer: any);
    private initialize;
    stop(): Promise<void>;
}
