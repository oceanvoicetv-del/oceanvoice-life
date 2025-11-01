// /netlify/functions/fetch-youtube.js

exports.handler = async function(event, context) {
   // These values are stored securely in your Netlify dashboard, not in the code.
   const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
   // CORRECTED: This is the permanent, canonical Channel ID.
   const CHANNEL_ID = 'UCndKRxr2SIbJ9iGdO16F6lg';

   if (!YOUTUBE_API_KEY) {
       return {
           statusCode: 500,
           body: JSON.stringify({ error: 'YouTube API key is not configured.' })
       };
   }

   const API_URL = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=50`;

   try {
       const response = await fetch(API_URL);
       const data = await response.json();

       if (!response.ok) {
           // Forward YouTube's error message for easier debugging
           throw new Error(data.error.message || 'Failed to fetch data from YouTube API.');
       }

       return {
           statusCode: 200,
           body: JSON.stringify(data)
       };
   } catch (error) {
       console.error('Function Error:', error);
       return { 
           statusCode: 500, 
           body: JSON.stringify({ error: error.message }) 
       };
   }
};