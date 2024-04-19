export { AgentFunction, AgentFunctionDictonary, GraphData } from "./type";
import { AgentFunctionDictonary, GraphData, DataSource, TransactionLog, ResultDataDictonary, ResultData, CallbackDictonaryArgs } from "./type";
import { ComputedNode, StaticNode } from "./node";
type GraphNodes = Record<string, ComputedNode | StaticNode>;
export declare class GraphAI {
    private data;
    nodes: GraphNodes;
    agentId?: string;
    callbackDictonary: AgentFunctionDictonary;
    isRunning: boolean;
    onLogCallback: (_log: TransactionLog, _isUpdate: boolean) => void;
    private runningNodes;
    private nodeQueue;
    private onComplete;
    private concurrency;
    private loop?;
    private repeatCount;
    verbose: boolean;
    private logs;
    private createNodes;
    private getValueFromResults;
    private initializeNodes;
    constructor(data: GraphData, callbackDictonary: CallbackDictonaryArgs);
    getCallback(agentId?: string): import("./type").AgentFunction<any, any, any>;
    asString(): string;
    results(): ResultDataDictonary;
    errors(): Record<string, Error>;
    private pushReadyNodesIntoQueue;
    run(): Promise<ResultDataDictonary>;
    private runNode;
    pushQueue(node: ComputedNode): void;
    removeRunning(node: ComputedNode): void;
    appendLog(log: TransactionLog): void;
    updateLog(log: TransactionLog): void;
    transactionLogs(): TransactionLog[];
    injectValue(nodeId: string, value: ResultData): void;
    resultsOf(sources: Array<DataSource>): any[];
}
