import { v2 as cloudinary } from 'cloudinary';
import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { getIdFromToken } from '../../utils/jwt/jwt.utils';
import { apiResponseHandler } from '../../utils/apiResponse.handler';
import { fetchTokens, getUserById } from './user.dal';
import { string } from 'zod';

export const getUserDetailsById = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const userId = await getIdFromToken(req.cookies.auth);

    if (!userId) {
      return apiResponseHandler(res, 404, 'Unauthorized User');
    }

    const userInstance = await getUserById(userId.userId);

    if (!userInstance) {
      return apiResponseHandler(res, 400, 'No User Found');
    }
    return apiResponseHandler(res, 200, 'User Fetched Successfully', userInstance);
  }
);

export const userProfile = expressAsyncHandler(async (req: Request, res: Response) => {
  const userId = await getIdFromToken(req.cookies.auth)?.userId;

  if (!userId) {
    return apiResponseHandler(res, 404, 'Unauthorized User');
  }

  //Cloud URL, Skills, Experience
});

export const resumeUpload = expressAsyncHandler(async (req: Request, res: Response) => {
  const file: string | undefined = req.file?.path;
  let cloudURL: string | void = '';
  let tokens: string[] | string = '';

  try {
    // Cloudinary coniguration
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    // Upload file to Cloudinary and store the URL
    cloudURL = await cloudinary.uploader
      .upload(file as string, {
        resource_type: 'raw',
      })
      .then((res) => {
        return res.url;
      })
      .catch(() => apiResponseHandler(res, 500, 'Error Uploading File to Cloudinary'));

    // Fetch tokens from the uploaded file
    tokens = typeof cloudURL === 'string' ? await fetchTokens(cloudURL) : '';

    if (!tokens || tokens.length === 0) {
      return apiResponseHandler(res, 400, 'No Tokens Found for the Uploaded File');
    }

    

    return apiResponseHandler(res, 201, 'File Uploaded Successfully', {
      cloudURL,
      tokens,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
    }
  }
});
