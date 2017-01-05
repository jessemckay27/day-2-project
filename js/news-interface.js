var apiKey = require('./../.env').apiKey;

$(document).ready(function() {
  $('select').material_select();
  $('#color-form').submit(function(event) {
    event.preventDefault();
    $('results-list').empty();
    $('#source-selector :selected').each(function() {
      var source = $(this).val();
      $('#results-list').append("<li><h4>" + $(this).text() + "</h4><ul id='" + source + "-section'></ul></li>");
      $.get("https://newsapi.org/v1/articles?source=" + source + "&sortBy=top&apiKey=" + apiKey).then(function(response) {
        var articles = response.articles;
        for (i = 0; i < 2; i++) {
          var link = articles[i].url;
          var imgSrc = articles[i].urlToImage;
          var title = articles[i].title;
          var articleSource = response.source;
          $("#" + articleSource + "-section").append("<li><a href='" + link + "'><img src='" + imgSrc + "'><br>" + title + "</a></li><br>");
        }
      });
    });
  });
});
