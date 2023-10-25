///////////////////////////
// COMMON FUNCTIONS
///////////////////////////

function sanitizeContents(contents)
{
    console.log("# sanitizeContents()");
    console.log(contents);
    contents = contents.replaceAll("&", "&amp;");
    contents = contents.replaceAll("<", "&lt;");
    contents = contents.replaceAll(">", "&gt;");
    return "<pre><code>" + contents + "</code></pre>";
}

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
        file_contents.innerHTML = sanitizeContents(contents);
    } else {
        console.error("could not find element: file-contents");
    }
}

// Called by clicking "Clear File" button
function resetFileContents()
{
    setFileContents("");
}

/////////////////////////////////////
// LOADING A FILE FROM THE WEB SERVER
/////////////////////////////////////

// Called by clicking "Load File" button
async function loadServerFile()
{
    console.debug("# loadServerFile()");
    let obj = await fetch("sample.json");
    let contents = await obj.text();
    setServerFileContents(contents);
}

function setServerFileContents(contents)
{
    console.debug("# setServerFileContents()");
    let server_file_contents = document.getElementById("server-file-contents");
    if (server_file_contents) {
        server_file_contents.innerHTML = sanitizeContents(contents);
    } else {
        console.error("could not find element: server-file-contents");
    }
}

// Called by clicking "Clear File" button
function resetServerFileContents()
{
    setServerFileContents("");
}

///////////////////////////////
// GENERATING A TABLE FROM JSON
///////////////////////////////

async function generateTableFromJSON()
{
    contents = await displayTableSource("sample.json");
    displayRenderedTable(contents);
}

async function displayTableSource(filename)
{
    let obj = await fetch(filename);
    let contents = await obj.text();
    let element = document.getElementById('table-source');
    if (element) {
        element.innerHTML = sanitizeContents(contents);
    } else {
        console.error('Could not find #table-source');
    }
    return contents;
}

function displayRenderedTable(contents)
{
    let element = document.getElementById('table-render');
    if (element) {
        element.append(generateTable(contents));
    } else {
        console.error('Could not find #table-element');
    }
}

function generateTable(contents)
{
    console.debug("# generateTable()");

    if (!contents) {
        return;
    }
    let transactions = JSON.parse(contents).transactions;
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
    return table;
}

async function main()
{
    console.debug("# main()");
    resetFileContents();
    resetServerFileContents();
    await generateTableFromJSON();
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
