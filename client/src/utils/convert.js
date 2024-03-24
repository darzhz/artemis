function textToCSV(text) {
    // Extract text between two numbers using regex
    const matches = text.match(/(?<=\b\d\s).*?(?=\s\d\b)/g);

    if (!matches) {
        console.error("No matches found.");
        return;
    }

    // Convert matches to CSV format
    const csvContent = matches.map(match => `"${match.replace(/"/g, '"')}"`).join('\n');

    return csvContent.replace('\&quot;','');
}

function getText(){
let text = document.getElementById('my').value
console.log(text+"done..................................................")
console.log(textToCSV(text));
}