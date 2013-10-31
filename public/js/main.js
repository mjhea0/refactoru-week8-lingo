$(function() {
  // translate a word
  $('#translate-btn').click(function(e) {
    e.preventDefault();
    var wordObject = {
      text: $('#translateWord').val(),
      from: $('#languageFrom').attr('data-language'),
      to: $('#languageTo').attr('data-language')
    };
    console.log(wordObject)
    $.post('/translate', wordObject, function(data) {
      $('#translated-word').append('<h3>'+data.translation+'</h3>');
    });
  });
});