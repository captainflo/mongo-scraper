$(document).on("click", "#scrapeArticles", function() {
    // Empty the articles from the note section
    $("#articles").empty();
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/scraper"
    })
      // With that done, add the note information to the page
      .then(function(data) {
        alert("You have scraped " +data.length + " articles");
        console.log(data);
        for (let i = 0; i < data.length; i++) {
        // The title of the article
        $("#articles").append("<div class='card'><div class='card-header'><button type='button' class='btn btn-outline-primary'>Saved Article!</button><a target='_blank' href='https://www.nytimes.com"+data[i].link+"'><h2>"+ data[i].title + "</h2></a></div><div class='card-body'><blockquote class='blockquote mb-0'><footer class='blockquote-footer'>"+data[i].text+"</footer></blockquote></div></div>");  
        }
           
      });
  });