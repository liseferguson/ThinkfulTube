//this variable is the API endpoint URL
const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

//this function gets data from the YouTube API. We pass as parameters of .getJSON: our endpoint URL, query object, and a callback which will create divs representing each result
//ajax method was used instead of getJSON becuase ajax gives coder more control over configuration
function getDataFromApi(searchTerm, callback) {
  const settings = {
    url: YOUTUBE_SEARCH_URL,
    data: {
     q: `${searchTerm} in:name`,
      part: 'snippet',
      key: 'AIzaSyAKzTbFtHT2upbhqWjy_OVYBzTZhmgx48Y',
      per_page: 15
  },
  dataType: 'json',
  type: 'GET',
  success: callback
};

$.ajax(settings);
}

//this function renders the results of the search including the video title and source via html template. The concatonated link in the href makes the uniqie youtube address per each result.
//target="_blank" allows the clicked link to open in a new tab instead of the current one
//the <a> tage in the image div makes the image (thumbnail) clickable, and takes the user to that YouTube page in a new tab
function renderResult(result){
  return `
    <div>
      <h2>
      <a class="js-result-name" href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank">${result.snippet.title}</a> by
      <a class="js-video-author" href="https://www.youtube.com/channel/${result.snippet.channelId}" target="_blank">${result.snippet.channelTitle}</a></h2>
      <div class="image">
        <a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank"><input type="image" class="thumbnail" src="${result.snippet.thumbnails.default.url}" role="button" alt="video thumbnail">
      </a>
    </div>
  `;
}


//get a better idea of what this does
function displayYouTubeSearchData(data) {
  const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').html(results);
}

//get a better idea of what this does

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

//callback function

$(watchSubmit);
