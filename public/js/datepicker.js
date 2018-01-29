$( function() {
    const size = +900;
    const clientWidth = window.innerWidth;
    //необходимая переменная для оперденления шырины екрана
    //на ммобилке лезет календарь
    let count = 1;
    if(clientWidth <= size) {
        count = 1;
    }else if(clientWidth > size){
        count = 2;
    }
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
            numberOfMonths: count
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