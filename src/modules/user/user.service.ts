import { v2 as cloudinary } from 'cloudinary';
import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { getIdFromToken } from '../../utils/jwt/jwt.utils';
import { apiResponseHandler } from '../../utils/apiResponse.handler';
import {
  fetchTokens,
  getSkills,
  getUserById,
  getUserProfile,
  postUserProfile,
  getUsersSkills,
} from './user.dal';
import { userProfileSchema } from './user.validators';

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
  const parsed = userProfileSchema.safeParse(req.body);

  if (!parsed.success) {
    const error = parsed.error.flatten().fieldErrors;
    return apiResponseHandler(res, 400, 'Validation Failed', error);
  }

  const userId = await getIdFromToken(req.cookies.auth)?.userId;

  if (!userId) {
    return apiResponseHandler(res, 401, 'Unauthorized User');
  }

  const profileInstance = await postUserProfile(userId, parsed.data);

  if (!profileInstance) {
    return apiResponseHandler(res, 404, 'Error Saving Profile');
  }

  return apiResponseHandler(res, 201, 'Profile Saved Successfully', profileInstance);
});

export const resumeUpload = expressAsyncHandler(async (req: Request, res: Response) => {
  const file: string | undefined = req.file?.path;
  const userId: string = (await getIdFromToken(req.cookies.auth)?.userId) as string;
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
    const profile = await getUserProfile(userId);

    cloudURL = profile ? profile.resumeCloudUrl : await uploader(file as string, res);

    tokens = await fetchTokens(cloudURL as string);

    return apiResponseHandler(res, 201, 'tokens fetched successfully', {
      cloudURL,
      tokens,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
    }
  }
});

export const querySkills = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const query: string = req.query.query as string;

    const data = await getSkills(query);

    if (!data) {
      return apiResponseHandler(res, 400, 'Skill Not Found');
    }

    return apiResponseHandler(res, 200, 'Skills Queried', { data });
  }
);

export const getUserSkills = expressAsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const userId = await getIdFromToken(req.cookies.auth)?.userId;

    if (!userId) {
      return apiResponseHandler(res, 401, 'Unauthorized User');
    }

    const skillsInstance = await getUsersSkills(userId);

    if (!skillsInstance) {
      return apiResponseHandler(res, 404, 'No Skills Found for this User');
    }

    return apiResponseHandler(res, 200, 'User Skills Fetched Successfully', skillsInstance);
  }
);

// Helper Function
const uploader = async (file: string, res: Response) => {
  const cloudURL = await cloudinary.uploader
    .upload(file as string, {
      resource_type: 'raw',
    })
    .then((res) => {
      return res.url;
    })
    .catch(() => apiResponseHandler(res, 500, 'Error Uploading File to Cloudinary'));

  return cloudURL;
};
