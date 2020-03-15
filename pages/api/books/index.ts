import { NextApiRequest, NextApiResponse } from 'next';
import { sampleBookData } from '../../../utils/sample-data';

export default (_: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!Array.isArray(sampleBookData)) {
      throw new Error('Cannot find book data');
    }

    res.status(200).json(sampleBookData);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};
