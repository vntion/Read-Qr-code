const API_URL = 'http://api.qrserver.com/v1/read-qr-code/';
const MAX_SIZE = 1048576; // 1 Mb
const ACCEPT_TYPES = ['image/png', 'image/gif', 'image/jpeg'];
const MAX_FILE_COUNT = 1;

const fileInput = document.querySelector('.image-upload__input');
const textArea = document.querySelector('.textarea');
const btnCopy = document.querySelector('.btn');

fileInput.addEventListener('change', async e => {
  e.preventDefault();

  const target = e.target;

  if (
    target.files[0].size >= MAX_SIZE ||
    !ACCEPT_TYPES.some(type => target.files[0].type === type) ||
    target.files.length > MAX_FILE_COUNT
  ) {
    console.error('Please below 1 Mb');
    return;
  }

  try {
    const formData = new FormData();
    formData.append('file', target.files[0]);

    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    textArea.value = data[0].symbol[0].data;
  } catch (err) {
    console.error(`Something went wrong ${err.message}`);
  }
});

btnCopy.addEventListener('click', async () => {
  if (!textArea.value) return;

  try {
    await navigator.clipboard.writeText(textArea.value);
    console.log(`Text copied to clipboard`);
  } catch (err) {
    console.error(`${err}, cannot copy text to clipboard`);
  }
});
