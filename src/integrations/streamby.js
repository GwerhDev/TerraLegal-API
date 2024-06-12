const { streambyClientId, streambyClientSecret } = require("../config");
const Streamby = require("streamby");

async function streambyUpload(file) {
  try {
    const streamby = new Streamby();

    const response = await streamby.getBucket({
      fileData: file,
      clientId: streambyClientId,
      clientSecret: streambyClientSecret,
    });

    return response;

  } catch (error) {
    console.error(error);
    throw error;
  }
};

async function streambyDelete(fileUrl) {
  try {
    const streamby = new Streamby();

    const response = await streamby.deleteFile({
      fileUrl,
      clientId: streambyClientId,
      clientSecret: streambyClientSecret,
    });

    return response;

  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  streambyUpload,
  streambyDelete,
};
