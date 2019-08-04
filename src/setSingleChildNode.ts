export function setSingleChildNode(parentNode: Node, child: Node) {
    let childNodes = parentNode.childNodes;
    // DO NOT SET INNNERHTML = "" AS IT EFFECTIVELY DESTROYS THE CHILDREN AS WELL
    for (let i = 0; i < childNodes.length;) {
        let childNode = childNodes.item(i);
        if (childNode === child || childNode.nodeType === 1 && parentNode.childNodes.length === 1)
            ++i;
        else childNode.remove();
    }
    let firstChild = parentNode.firstChild;
    if (firstChild === child)
        return;
    else if (firstChild)
        parentNode.replaceChild(child, firstChild);
    else parentNode.appendChild(child);
}