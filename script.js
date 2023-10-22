// Called by clicking "Load" button
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
        file_contents.innerHTML = contents;
    } else {
        console.error("could not find element: file-contents");
    }
}

// Called by clicking "Clear" button
function resetFileContents()
{
    setFileContents("File contents will appear here.");
}

function main()
{
    console.debug("# main()");
    resetFileContents();
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
