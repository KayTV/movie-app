$(document).ready(function(){
  var movie;
  var movies = JSON.parse(localStorage.getItem('movies')) || [];
  console.log(movies);

  function domMovies(){
    $("#myMovie").html("");
    movies.forEach(function(val, index) {
      console.log(val);
      var $div = $('<div>');
      $div.addClass('col-xs-3');
      $div.append("<h4>"+val.Title+"</h4>");
      $div.append("<button id='movieInfo' data-index='"+index+"'><img src="+val.Poster+"></button>");
      $div.append("<p>Your Rating: </p>")
      $div.append("<div class=\"br-wrapper br-theme-fontawesome-stars\"><select class=\"example\"><option value=\"1\">1</option><option value=\'2\'>2</option><option value=\'3\'>3</option><option value=\'4\'>4</option><option value=\'5\'>5</option></select></div>");

      $('#myMovie').append($div);
      $(function() {
        $('.example').barrating({
          theme: 'fontawesome-stars'
        });
      });
      console.log($($div.children()[3]).children());
    });
  }
  domMovies()

  $(document).on("click", "#movieInfo", function(){
    console.log("still clicking modal");
    $modal = $('#myModal');
    $modal.modal('show');
    var currentIndex = $(this).attr("data-index");
    var currentMovie = movies[currentIndex];
    $("#myModalLabel").html(currentMovie.Title);
    $("#movieDescription").html("<img src="+currentMovie.Poster+">");
    $("#movieDescription").append("<h3>Director: "+currentMovie.Director+"</h3>");
    $("#movieDescription").append("<h4>Actors: "+currentMovie.Actors+"</h4>");
    $("#movieDescription").append("<h5>Genre: "+currentMovie.Genre+", Rated: "
    +currentMovie.Rated+", Released: "+currentMovie.Released+"</h5>");
    $("#movieDescription").append("<h4><strong>Plot: </strong>"+currentMovie.Plot+"</h4>");
    $("#deleteMovie").on("click", function(){
      movies.splice(currentIndex, 1);
      localStorage.setItem('movies', JSON.stringify(movies));
      domMovies();
      $modal.modal("hide");
      console.log(currentIndex);
    })
  })

  $("#call").on("click", function(){
    var title = $("#title").val();
    var plot = $("#plot").val();
    var responseType = $("#res").val();

  $.ajax({
    url: 'https://www.omdbapi.com/?t='+title+'&y=&plot='+plot+'&r='+responseType,
    method: "GET",
    success: function(data) {
      console.log(data);
      movie = data;
      $("#results").html('  ');
      $("#results").append("<h2>"+data.Title+"</h2>");
      $("#results").append("<h3>Director: "+data.Director+"</h3>");
      $("#results").append("<img src="+data.Poster+">");
      $("#results").append("<h4>Actors: "+data.Actors+"</h4>");
      $("#results").append("<h5>Genre: "+data.Genre+", Rated: "+data.Rated+", Released: "+data.Released+"</h5>");
      $("#results").append("<h4><strong>Plot: </strong>"+data.Plot+"</h4>");
      $("#results").append("<button type=submit id=saveMovie>Save Movie</button>");
      $("#title").val('');
      $("#saveMovie").on("click", function(){
        movies.push(movie);
        localStorage.setItem('movies', JSON.stringify(movies));
        $("#saveMovie").hide("");
        $("#results").append("<h5>Movie saved to your database!</h5>");
      })

    }

  })

})

});
