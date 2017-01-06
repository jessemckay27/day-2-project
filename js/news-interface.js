var apiKey = require('./../.env').apiKey;

$(document).ready(function() {
  $('select').material_select();
  $('#color-form').submit(function(event) {
    event.preventDefault();
    $('#results-list').empty();
    $('#source-selector :selected').each(function() {
      var source = $(this).val();
      $('#results-list').append("<div class='row source-row'><div class='col s12'><h4 class='center'>" + $(this).text() + "</h4><div id='" + source + "-section'></div></div></div>");
      $.get("https://newsapi.org/v1/articles?source=" + source + "&sortBy=top&apiKey=" + apiKey).then(function(response) {
        var articles = response.articles;
        for (i = 0; i < 6; i++) {
          var link = articles[i].url;
          var imgSrc = articles[i].urlToImage;
          var title = articles[i].title;
          var articleSource = response.source;
          console.log(response);
          $("#" + articleSource + "-section").append("<div class='result-body col s12 m6 l4'><div class='result-interior'><div class='img-wrap'><a href='" + link + "'><img src='" + imgSrc + "' onerror=\"this.src='./public/no-image.png'\"></div><div class='text-wrap'><div class='text-body'>" + title + "</div></div></a></div></div></div>");
        }
      });
    });
  });
});
