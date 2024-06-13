const router = require('express').Router();
const { decodeToken } = require('../../integrations/jwt');
const { streambyUpload, streambyDelete } = require('../../integrations/streamby');
const { message } = require('../../messages');
const { roles } = require('../../misc/consts-roles');
const contentSchema = require('../../models/Content');

router.get('/', async (req, res) => {
  try {
    const userToken = req.headers.authorization;
    if (!userToken) return res.status(403).json({ message: message.admin.permissionDenied });
    
    const decodedToken = await decodeToken(userToken);
    if (decodedToken?.data?.role !== roles.admin) return res.status(403).json({ message: message.admin.permissionDenied });

    const response = await contentSchema.find();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

router.post('/create', async (req, res) => {
  try {
    const userToken = req.headers.authorization;
    if (!userToken) return res.status(403).json({ message: message.admin.permissionDenied });
    
    const decodedToken = await decodeToken(userToken);
    if (decodedToken?.data?.role !== roles.admin) return res.status(403).json({ message: message.admin.permissionDenied });
    
    const { price, title, published, description, fileData } = req.body;

    const streamby = await streambyUpload(fileData);

    const formattedResponse = {
      price,
      title,
      published,
      description,
      contentGallery: [streamby.url],
    }

    const newContent = new contentSchema(formattedResponse);
    await newContent.save();
    return res.status(201).json({ message: message.admin.createproduct.success, success: true, presigned: streamby.presigned });
  } catch (error) {
    return res.status(500).json({ error: error, success: false });
  }
});

router.patch('/update/:id', async (req, res) => {
  try {
    const userToken = req.headers.authorization;
    if (!userToken) return res.status(403).json({ message: message.admin.permissionDenied });

    const decodedToken = await decodeToken(userToken);
    if (decodedToken?.data?.role !== roles.admin) return res.status(403).json({ message: message.admin.permissionDenied });

    const { id } = req.params;
    const { contentGallery } = req.body;

    await contentSchema.findByIdAndUpdate(id, req.body);

    return res.status(200).json({ message: message.admin.updateproduct.success, success: true });

  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const userToken = req.headers.authorization;
    if (!userToken) return res.status(403).json({ message: message.admin.permissionDenied });
    
    const decodedToken = await decodeToken(userToken);
    if (decodedToken?.data?.role !== roles.admin) return res.status(403).json({ message: message.admin.permissionDenied });
    
    const { id } = req.params;
    
    const content = await contentSchema.findById(id);

    content.contentGallery.map(async (url) => {
      await streambyDelete(url);
    });

    await contentSchema.findByIdAndDelete(id);

    return res.status(200).json({ message: message.admin.deleteproduct.success, success: true });

  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

module.exports = router;