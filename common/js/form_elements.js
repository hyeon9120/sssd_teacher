/* ============================================================
 * Form Elements
 * This file applies various jQuery plugins to form elements
 * For DEMO purposes only. Extract what you need.
 * ============================================================ */
(function($) {

    'use strict';

    var getBaseURL = function() {
        var url = document.URL;
        return url.substr(0, url.lastIndexOf('/'));
    }

    $(document).ready(function() {

        //Multiselect - Select2 plug-in
        $("#multi").val(["Jim", "Lucy"]).select2();

        //Date Pickers
        $('#datepicker-range, #datepicker-component, #datepicker-component2, .input-date').datepicker({
			format: 'yyyy-mm-dd',
			language:'kr',
		});

        $('#datepicker-embeded').datepicker({
            daysOfWeekDisabled: "0,1",
			language:'kr',
        });

 		$('#summernote').summernote({
            height: 300,			
			lang: 'ko-KR',
            onfocus: function(e) {
                $('body').addClass('overlay-disabled');
            },
            onblur: function(e) {
                $('body').removeClass('overlay-disabled');
            },
			toolbar: [
				// [groupName, [list of button]]
				['style', ['bold', 'italic', 'underline', 'clear']],
				['font', ['strikethrough', 'superscript', 'subscript']],
				['fontsize', ['fontsize']],
				['color', ['color']],
				['para', ['ul', 'ol', 'paragraph']],
				['height', ['height']]
			  ],
			defaultFontName: 'Noto sans KR',
			fontNames: ['Noto Sans KR','돋움','굴림','바탕']
        });

        /* Time picker
         * https://github.com/m3wolf/bootstrap3-timepicker
         */
        $('#timepicker').timepicker().on('show.timepicker', function(e) {
            var widget = $('.bootstrap-timepicker-widget');
            widget.find('.glyphicon-chevron-up').removeClass().addClass('pg-arrow_maximize');
            widget.find('.glyphicon-chevron-down').removeClass().addClass('pg-arrow_minimize');
        });

        // disabling dates
        var nowTemp = new Date();
        var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
		
		
		//Typehead Sample Code

        // Basic Sample using Bloodhound
        // constructs the suggestion engine

        var countries = new Bloodhound({
          datumTokenizer: Bloodhound.tokenizers.whitespace,
          queryTokenizer: Bloodhound.tokenizers.whitespace,
          prefetch: 'http://pages.revox.io/json/countries-list.json'
        });

          var bestPictures = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            prefetch: 'http://pages.revox.io/json/drop-countries.json',
            remote: {
              url: 'http://pages.revox.io/json/drop-countries.json',
              wildcard: '%QUERY'
            }
          });
        // passing in `null` for the `options` arguments will result in the default
        // options being used
        $('.sample-typehead').typeahead(null, {
          name: 'countries',
          source: countries
        });
		//Custom Template
        $('#custom-templates .typeahead').typeahead(null, {
              name: 'best-pictures',
              display: 'value',
              source: bestPictures,
              templates: {
                empty: [
                  '<div class="empty-message">',
                    'unable to find any Best Picture winners that match the current query',
                  '</div>'
                ].join('\n'),
                suggestion: Handlebars.compile('<div>{{value}}– {{year}}</div>')
              }
        });
		
		$('.custom-tag-input').tagsinput({});
		$('.autonumeric').autoNumeric('init');
    });

})(window.jQuery);