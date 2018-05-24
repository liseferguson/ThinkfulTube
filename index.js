//this variable is the API endpoint URL
const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

//this function gets data from the YouTube API. We pass as parameters of .getJSON: our endpoint URL, query object, and a callback which will create divs representing each result
function getDataFromApi(searchTerm, callback) {
  const settings = {
    url: YOUTUBE_SEARCH_URL,
    data: {
     q: `${searchTerm} in: name`,
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

//this function renders the results of the search including the video title, source, and number of views
function renderResult(result){
  return `
    <div>
      <h2>
      <a class="js-result-name" href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank">${result.snippet.title}</a> by 
      <a class="js-video-author" href="https://www.youtube.com/channel/${result.snippet.channelId}" target="_blank">${result.snippet.channelTitle}</a></h2>
      <div class="image"> 
        <input type="image" src="${result.snippet.thumbnails.default.url}" role="button" alt="video thumbnail">
      </div>
    </div>
  `;
}

function displayYouTubeSearchData(data) {
  const results = data.items.map((item, index) => renderResult(item));
  $('.js-search-results').html(results);
}

//this event listener listens for user to click on thumbnail, then takes them to the video link
//$(function(){
//  $(.image).click(function(event){

 // })
//})

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

$(watchSubmit);