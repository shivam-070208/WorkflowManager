

export const filterNodesByTypes = <T extends { type: string|undefined }>(input: T[], filterBy: string[] = []): T[] => {
    if (!Array.isArray(input) || !Array.isArray(filterBy) || filterBy.length === 0) return [];
    return input.filter(node => typeof node.type === "string" && filterBy.includes(node.type));
};

export const filterBySearch = <T extends { title: string|undefined }>(input: T[], searchQuery: string = ""): T[] => {
    if (!Array.isArray(input) || typeof searchQuery !== "string" || searchQuery.trim() === "") return input;
    const search = searchQuery.toLowerCase();
    return input.filter(node =>
        typeof node.title === "string" && node.title.toLowerCase().includes(search)
    );
};