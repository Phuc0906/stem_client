export const downloadFile = (file, fileName) => {
    const fileURL = URL.createObjectURL(file);
    // Create an anchor element
    const link = document.createElement('a');
    link.href = fileURL;
    link.download = fileName;

    // Programmatically trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up the URL and remove the anchor element
    URL.revokeObjectURL(fileURL);
    document.body.removeChild(link);
}

export function base64ToFile(base64String, fileName, fileType) {
    // Step 1: Decode the Base64 string
    const binaryString = atob(base64String);

    // Step 2: Create a Blob
    const arrayBuffer = new ArrayBuffer(binaryString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < binaryString.length; i++) {
        uint8Array[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([uint8Array], { type: fileType });

    // Step 3: Convert Blob to File
    const file = new File([blob], fileName, { type: fileType });
    return file;
}