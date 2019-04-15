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
        $("#articles").append("<div class='card'><div class='card-header'><button data-id="+i+" type='submit' class='saved btn btn-outline-primary'>Saved Article!</button><a id='link' target='_blank' href='https://www.nytimes.com"+data[i].link+"'><h2 id='title'>"+ data[i].title + "</h2></a></div><div class='card-body'><blockquote class='blockquote mb-0'><footer class='text blockquote-footer'>"+data[i].text+"</footer></blockquote></div></div>");
        }
      });
  });
  
    $(document).on("click", '.saved', function(event) {
        event.preventDefault();
        var thisId = $(this).attr("data-id");
        console.log(thisId);
        newArticle = {
            title: $('#title').val(),
            link: $("#link").attr("href"),
            text: $(".text").val(),
        }
        
        console.log(newArticle);
        $.ajax({
          method: "POST",
          url: "/saved"+ thisId,
          data: newArticle
        })
          // With that done, add the note information to the page
          .then(function(data) {
            console.log(data);
          });
      });
  