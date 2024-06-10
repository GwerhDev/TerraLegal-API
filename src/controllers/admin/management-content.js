const router = require('express').Router();
const { decodeToken } = require('../../integrations/jwt');
const { message } = require('../../messages');
const { roles } = require('../../misc/consts-user-model');
const contentSchema = require('../../models/Content');
const contentGallerySchema = require('../../models/ContentGallery');

router.post('/create', async (req, res) => {
  try {
    const userToken = req.headers.authorization;
    if (!userToken) return res.status(403).json({ message: message.admin.permissionDenied });

    const decodedToken = await decodeToken(userToken);
    if (decodedToken?.data?.role !== roles.admin) return res.status(403).json({ message: message.admin.permissionDenied });

    const { contentGallery } = req.body;

    for (let i = 0; i < contentGallery.length; i++) {
      const newContentGallery = new contentGallerySchema({ file: contentGallery[i] });
      await newContentGallery.save();
      req.body.contentGallery[i] = newContentGallery._id;
    }

    const newProduct = new contentSchema(req.body);
    await newProduct.save();
    return res.status(201).json({ message: message.admin.createproduct.success, success: true });
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

    for (let i = 0; i < contentGallery.length; i++) {
      if (contentGallery[i]._id) await contentGallerySchema.findByIdAndUpdate(contentGallery[i]._id, { file: contentGallery[i].file });
      else {
        const newContentGallery = new contentGallerySchema({ file: contentGallery[i].file });
        await newContentGallery.save();
        req.body.contentGallery[i] = newContentGallery._id;
      }
    };

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

    await contentSchema.findByIdAndDelete(id);

    return res.status(200).json({ message: message.admin.deleteproduct.success, success: true });

  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

module.exports = router;