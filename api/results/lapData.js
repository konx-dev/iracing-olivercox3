import axios from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { loadCookies } from '@/helpers/cookieManager';

const cookieJar = loadCookies();
const client = wrapper(axios.create({ jar: cookieJar }));

export async function lapData(year, quarter) {
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

      const sessions = await downloadResponse.json();

      // extract ids to retrieve lap times
      const subsessionIds = sessions.map((session) => session.subsession_id);

      //console.log(subsessionIds);

      // nested try/catch here
      try {
        const response = await client.get(`${process.env.ENDPOINT}data/results/lap_data`, {
          params: { cust_id: process.env.USER_ID, simsession_number: 0, subsession_id: subsessionIds[0] }
        });

        console.log('lap response: ', response.data.link);

        if (response.data.link) {
          const downloadResponse = await fetch(response.data.link);

          const sessionLaps = await downloadResponse.json();

          const { base_download_url, chunk_file_names } = sessionLaps.chunk_info;

          const lapsJson = await fetch(base_download_url + chunk_file_names);

          const laps = await lapsJson.json();

          console.log(laps); // lap_time: 876823 (this is in milliseconds)
        }
      } catch (error) {
        console.error('Error fetching laps: ', error);
      }
    } else {
      console.warn('No valid data found in the response.');
    }
  } catch (error) {
    console.error('Error fetching results: ', error);
  }
}
