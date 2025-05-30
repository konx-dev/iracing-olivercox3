import axios from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { loadCookies } from '@/helpers/cookieManager';

const cookieJar = loadCookies();
const client = wrapper(axios.create({ jar: cookieJar }));

export async function searchSeries(year, quarter) {
  try {
    const response = await client.get(`${process.env.ENDPOINT}data/results/search_series`, {
      params: { cust_id: process.env.USER_ID, season_year: year, season_quarter: quarter }
    });

    if (!response.data) {
      throw new Error('No data returned');
    }

    const { base_download_url, chunk_file_names } = response.data.data.chunk_info;

    // what happens if there are more than 1 chunk?
    if (base_download_url && chunk_file_names) {
      const downloadResponse = await fetch(base_download_url + chunk_file_names);
      return await downloadResponse.json();
    } else {
      console.warn('No valid data found in the response.');
    }
  } catch (error) {
    console.error('Error fetching results: ', error);
  }
}
