export function getDocByCategory(docs,category){
    const matchedCategory = docs.filter(doc=> doc.category=== category);
    return matchedCategory;
}
export function getDocByAuthor(docs,author){
    const matchedAuthor = docs.filter(doc=> doc.author === author);
    return matchedAuthor;
}
export function getDocByTag(docs, tag){
    const matchedTag = docs.filter(doc=>doc.tags.some(t=>t===tag));
    return matchedTag;
}