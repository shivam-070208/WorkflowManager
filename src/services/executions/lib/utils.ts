
type NodeWithId = { id: string };
type Connection = { fromNode: string; toNode: string };

export const sortWorkflow = <T extends NodeWithId, K extends Connection>(
    nodes: T[],
    connections: K[]
): T[] => {
    const nodeMap: Record<string, T> = {};
    nodes.forEach(node => {
        nodeMap[node.id] = node;
    });

    const inDegree: Record<string, number> = {};
    nodes.forEach(node => {
        inDegree[node.id] = 0;
    });
    connections.forEach(connection => {
        if (inDegree[connection.toNode] !== undefined) {
            inDegree[connection.toNode]++;
        }
    });
    const queue: string[] = Object.keys(inDegree).filter(id => inDegree[id] === 0);
    const sorted: T[] = [];
    while (queue.length > 0) {
        const nodeId = queue.shift() as string;
        const node = nodeMap[nodeId];
        if (node) {
            sorted.push(node);
        }
      connections.forEach(connection => {
            if (connection.fromNode === nodeId) {
                inDegree[connection.toNode]--;
                if (inDegree[connection.toNode] === 0) {
                    queue.push(connection.toNode);
                }
            }
        });


    }


    const hasCycle = Object.values(inDegree).some(count => count > 0);
    if (hasCycle) {
        throw new Error("Workflow contains a cyclic dependency between nodes.");
    }

    return sorted;
}
