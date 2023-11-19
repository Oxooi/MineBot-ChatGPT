function parseConstructionCommand(message) {
    // Convert the message in lowercase to simplify the match
    const msgLower = message.toLowerCase();

    // Basic structur for building infos
    let constructionDetails = {
        type: null,
        size: null,
        height: null,
        width: null,
    };

    // Check if the message contain "construire" word
    if (msgLower.includes('construis') || msgLower.includes('construire')) {
        // Example : "construis une petite maison" or "construis une tour de 10 blocs"

        // Use the regular expression to extract informations
        const typeMatch = msgLower.match(/maison|tour|pont/); // Add few more words if needed
        const material = msgLower.match(/pierre|bois|terre/); // Get the material
        const part = msgLower.match(/toit|mur|sol|plafond/) // Part of the house
        const sizeMatch = msgLower.match(/petite|grande|gigantesque/); // Size example
        const heightMatch = msgLower.match(/(\d+) blocs de haut/); // For specific size
        const widthMatch = msgLower.match(/(\d+) blocs de large/);

        // Assign the values find to "constructionDetails"
        if (typeMatch) constructionDetails.type = typeMatch[0];
        if (sizeMatch) constructionDetails.size = sizeMatch[0];
        if (material) constructionDetails.material = material[0];
        if (part) constructionDetails.part = part[0];
        if (heightMatch) constructionDetails.height = { height: parseInt(heightMatch[1]) };
        if (widthMatch) constructionDetails.width = { width: parseInt(widthMatch[1]) };

        return constructionDetails;
    }

    // If the message dont contain commands return
    return null;
}

module.exports = {
    parseConstructionCommand
}