//this variable is the API endpoint URL
const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

//this function gets data from the YouTube API. We pass as parameters of .getJSON: our endpoint URL, query object, and a callback which will create divs representing each result
function getDataFromApi(searchTerm, callback) {
  const settings = {
    url: YOUTUBE_SEARCH_URL,
    data: {
     q: `${searchTerm} in: name`,
      part: 'snippet',
      key: 'AIzaSyAKzTbFtHT2upbhqWjy_OVYBzTZhmgx48Y ',
      per_page: 15
  },
  dataType: 'json',
  type: 'GET',
  success: callback
};

$.ajax(settings);
}