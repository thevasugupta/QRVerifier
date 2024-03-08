// Initialize QuaggaJS for QR code scanning
Quagga.init({
    inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.getElementById("scanner-container"),
        constraints: {
            width: 480,
            height: 320,
            facingMode: "environment"
        },
    },
    decoder: {
        readers: ["code_128_reader", "ean_reader", "ean_8_reader", "code_39_reader", "code_39_vin_reader", "codabar_reader", "upc_reader", "upc_e_reader", "i2of5_reader", "2of5_reader", "code_93_reader"],
    },
}, function(err) {
    if (err) {
        console.error("Failed to initialize QuaggaJS", err);
        return;
    }
    console.log("Initialization finished. Ready to start");
    Quagga.start();
});

// Event listener for successful QR code scan
Quagga.onDetected(function(result) {
    var code = result.codeResult.code;
    console.log("QR code detected:", code);

    // Call function to fetch data from Google Sheets based on the scanned code
    fetchDataFromGoogleSheets(code);
});

// Function to fetch data from Google Sheets
function fetchDataFromGoogleSheets(code) {
    // Replace 'YOUR_GOOGLE_APPS_SCRIPT_URL' with the URL of your deployed Google Apps Script web app
    var url = 'https://script.google.com/macros/s/AKfycbzkHjCGCWtDIHXIb6TgC5_k9SDQFx6ulug7A8PX9PmQgqmiqTttaEuy4_VrQ1kGU5-G/exec?uniqueID=' + code;

    // Make a request to Google Apps Script web app
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Process the response and display the result on the web interface
            console.log("Data from Google Sheets:", data);
            // Display the result on the web page (example)
            document.getElementById("result-container").innerText = JSON.stringify(data);
        })
        .catch(error => {
            console.error("Error fetching data from Google Sheets:", error);
        });
}
