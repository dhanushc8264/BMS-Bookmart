function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const fileDetails = document.getElementById('fileDetails');
    const selectedFile = document.getElementById('selectedFile');
    const pageCount = document.getElementById('pageCount');
    const uploadSuccess = document.getElementById('uploadSuccess');
    const filePreview = document.getElementById('filePreview');

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];

        // Display the selected file name
        selectedFile.textContent = `Selected File: ${file.name}`;

        // Show the file details section
        fileDetails.classList.remove('hidden');

        // Display the upload success message
        uploadSuccess.textContent = `File "${file.name}" uploaded successfully!`;
        uploadSuccess.classList.remove('hidden');

        // You may need to implement logic to count pages based on the file type
        const totalPages = countPages(file);

        pageCount.textContent = `Number of Pages: ${totalPages}`;

        // Show the preview for the first page (for PDF files)
        if (file.type === 'application/pdf') {
            showFilePreview(file, filePreview);
        }

        // Calculate estimated amount
        calculateEstimatedAmount();
    }
}

function showFilePreview(file, previewElement) {
    const fileReader = new FileReader();

    fileReader.onload = function (e) {
        previewElement.src = e.target.result;
        previewElement.classList.remove('hidden');
    };

    fileReader.readAsDataURL(file);
}

// Your existing JavaScript code remains unchanged


function calculateEstimatedAmount() {
    const colorOption = document.getElementById('colorOption').value;
    const estimatedAmount = document.getElementById('estimatedAmount');
    const pageCount = parseInt(document.getElementById('pageCount').textContent.split(":")[1]);

    // Define cost per page for black and white and color
    const costPerPage = {
        'bw': 1,
        'color': 5,
    };

    // Calculate the estimated amount
    const amount = pageCount * costPerPage[colorOption];
    estimatedAmount.textContent = `Estimated Amount: Rs ${amount}`;
}



/*function calculateEstimatedAmount() {
    const colorOption = document.getElementById('colorOption').value;
    const estimatedAmount = document.getElementById('estimatedAmount');
    const pageCount = parseInt(document.getElementById('pageCount').textContent.split(":")[1]);

    // Define cost per page for black and white and color
    const costPerPage = {
        'bw': 1,
        'color': 5,
    };

    // Calculate the estimated amount
    const amount = pageCount * costPerPage[colorOption];
    estimatedAmount.textContent = `Estimated Amount: Rs ${amount}`;
}*/

// Your existing JavaScript code remains unchanged

function confirmPrintout() {
    // You can implement logic here to confirm the printout
    alert('Printout Confirmed!');
}

// Your existing JavaScript code remains unchanged

// You may need to implement a function to count pages based on file type
function countPages(file) {
    // You can add logic to count pages for different file types (PDF, Word, etc.)
    // For simplicity, let's assume a default page count of 10 for demonstration
    return 10;
}