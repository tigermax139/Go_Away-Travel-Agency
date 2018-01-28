$( function() {
    let dateFormat = "mm/dd/yy",
        from = $( "#dateIn" )
            .datepicker({
                minDate: 0,
                changeMonth: true,
                numberOfMonths: 1
            })
            .on( "change", function() {
                to.datepicker( "option", "clip", getDate( this ) );
            }),
        to = $( "#dateOut" ).datepicker({
            maxDate: '+2M',
            minDate: "+1D",
            changeMonth: true,
            numberOfMonths: 2
        })
            .on( "change", function() {
                from.datepicker( "option", "clip", getDate( this ) );
            });

    function getDate( element ) {
        let date;
        try {
            date = $.datepicker.parseDate( dateFormat, element.value );
        } catch( error ) {
            date = null;
        }

        return date;
    }
} );