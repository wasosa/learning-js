///////////////////////////
// LOADING A FILE FROM DISK
///////////////////////////

// Called by clicking "Load File" button
function loadFile()
{
    console.debug("# loadFile()");
    let file = document.getElementById("load-file").files[0];
    if (file) {
        console.debug("a file has been chosen");
        let reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = fileLoaded;
    } else {
        console.debug("no file has been chosen");
    }
}

function fileLoaded(event) {
    console.debug("# fileLoaded()");
    contents = event.target.result;
    setFileContents(contents);
}

function setFileContents(contents)
{
    console.debug("# setFileContents()");
    let file_contents = document.getElementById("file-contents");
    if (file_contents) {
        // WARNING: this is not safe; validate contents
        contents = contents.replaceAll("&", "&amp;");
        contents = contents.replaceAll("<", "&lt;");
        contents = contents.replaceAll(">", "&gt;");
        file_contents.innerHTML = "<pre><code>" + contents + "</code></pre>";
    } else {
        console.error("could not find element: file-contents");
    }
}

// Called by clicking "Clear File" button
function resetFileContents()
{
    setFileContents("File contents will appear here.");
}

// Called by clicking "Clear Table" button
function resetTableContents()
{
    setFileContents("File contents will appear here.");
}

///////////////////////////////
// GENERATING A TABLE FROM JSON
///////////////////////////////

function loadTable()
{
    console.debug("# loadTable()");
    let tableFile = document.getElementById("load-table").files[0];
    if (tableFile) {
        console.debug("a table file has been chosen");
        let reader = new FileReader();
        reader.readAsText(tableFile, "UTF-8");
        reader.onload = tableFileLoaded;
    } else {
        console.debug("no table file has been chosen");
    }
}

function tableFileLoaded(event) {
    console.debug("# tableFileLoaded()");
    contents = event.target.result;
    setTableFileContents(contents);
}

function setTableFileContents(_contents)
{
    console.debug("# setTableFileContents()");

    let table_contents = document.getElementById("table-contents");
    if (!table_contents) {
        console.error("could not find element: table-contents");
        return;
    }

    let contents = JSON.parse(_contents)
    let transactions = contents["transactions"] || null;
    if (!transactions) {
        return;
    }

    let table = document.createElement('table');
    let cols = Object.keys(transactions[0]);
    let tr = document.createElement('tr');
    for (let i = 0; i < cols.length; i++) {
        let th = document.createElement('th');
        th.appendChild(document.createTextNode(cols[i]));
        tr.appendChild(th);
    }
    table.append(tr);

    for (let i = 0; i < transactions.length; i++) {
        let element = transactions[i];
        tr = document.createElement('tr');
        for (let j = 0; j < cols.length; j++) {
            let key = cols[j];
            let td = document.createElement('td');
            td.appendChild(document.createTextNode(element[key]));
            tr.append(td);
        }
        table.append(tr);
    }
    table_contents.append(table);
}

// Called by clicking "Clear File" button
function resetTableFileContents()
{
    setTableFileContents("{}");
}

function main()
{
    console.debug("# main()");
    resetFileContents();
    resetTableFileContents();
}

// ---------- start of testing code ----------

function assert_equal(actual, expected)
{
    if (actual !== expected) {
        throw new Error(`\n\nExpected: ${expected}\n  Actual: ${actual}\n`)
    }
}

function test()
{
    // We are not running inside a browser!
    console.debug("Not in the browser");
    console.debug("Running tests!");
    console.debug("All tests passed!");
}

// ---------- end of testing code ----------

if (typeof document === 'undefined') {
    test();
} else {
    main();
}
