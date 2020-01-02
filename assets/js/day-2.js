$(document).ready(function () {
    // $("#tbl1 tbody tr").eq(0).addClass("red");
    // $("#tbl1 tbody tr").filter(function(index) {
    //     // return $(this).find("td").not(":first-child") && index > 0;
    //     $(this).find("td").filter(function(index2){
    //         return index2 > 0 && index2 % 2 == 0;
    //     }).addClass("yellow");

    //     $(this).find("td").slice(1,2).addClass("blue");
    //     $(this).find("td").slice(3,4).addClass("red");
    // });

    // $("#tbl1 tbody").find("tr").find("td").not(":first-child").addBack().addClass("red");

    // $("#tbl1 tbody").children(":eq(1)").addClass("red");

    $("#tbl1 tbody tr").eq(0).find("td").eq(1).addClass("selected red").find("input").focus();

    $("#btnLeft").click(function (e) { 
        e.preventDefault();
        var tdIndex = $(".selected").index();

        if(tdIndex > 1){
            $(".selected").removeClass().prev().addClass("selected red").find("input").focus();
        }else{
            alert("Out of abound!");
        }
        
    });

    $("#btnRight").click(function (e) { 
        e.preventDefault();
        var tdIndex = $(".selected").index();
        var tdLength = $(".selected").parent().children().length;

        if((tdIndex+1) < tdLength){
            $(".selected").removeClass().next().addClass("selected red").find("input").focus();
        }else{
            alert("Out of abound!");
        }
        
    });

    $("#btnUp").click(function (e) { 
        e.preventDefault();
        var tdIndex = $(".selected").index();
        var trIndex = $(".selected").parent().index();
        
        if((trIndex) > 0){
            $(".selected").removeClass().parent().prev().children().eq(tdIndex).addClass("selected red").find("input").focus();
        }else {
            alert("Out of abound!");
        }
        
    });

    $("#btnDown").click(function (e) { 
        e.preventDefault();
        
        var tdIndex = $(".selected").index();
        var trIndex = $(".selected").parent().index();
        var trLength = $(".selected").parents("tbody").children().length;

        if((trIndex+1) < trLength){
            $(".selected").removeClass().parent().next().children().eq(tdIndex).addClass("selected red").find("input").focus();
        }
        else{
            alert("Out of abound!");
        }
        
    });

    $("#btnAdd").click(function (e) { 
        e.preventDefault();

        var trLength = $("tbody").children().length;

        var newRow = '<tr><td>'+(trLength+1)+'</td>'+
                    '<td><input class="myInput" type="text"></td>'+
                    '<td><input class="myInput" type="text"></td>'+
                    '<td><input class="myInput" type="text"></td>'+
                    '<td><input class="myInput" type="text"></td></tr>';

        $("#tbl1 tbody").append(newRow);
        
    });

    $("#btnRemove").click(function (e) { 
        e.preventDefault();

        var trLength = $("tbody").children().length;

        $("#tbl1 tbody tr").eq(trLength-1).remove();
        
    });

    $("#btnReset").click(function (e) { 
        
        $(".myInput").val("");
    });

    $("#tbl1 tbody tr td").mouseenter(function (e) { 
        if($(this).index() != 0){
            $(this).css("background-color" , "#ffaaaa");
        }
    });

    $("#tbl1 tbody tr td").mouseleave(function (e) { 
        if($(this).index() != 0){
            $(this).css("background-color" , "#eaeaea");
        }
    });

    $("#tbl1 tbody tr td").click(function (e) { 
        e.preventDefault();
        $(this).find(".myInput").focus();
        $(".selected").removeClass();
        $(this).addClass("selected red");
    });

    $(document).keyup(function (e) { 
        // console.log(e);
        if(e.which == 38){ 
            // alert("UP");
            var tdIndex = $(".selected").index();
            var trIndex = $(".selected").parent().index();
            
            if((trIndex) > 0){
                $(".selected").removeClass().parent().prev().children().eq(tdIndex).addClass("selected red").find("input").focus();
            }else {
                alert("Out of abound!");
            }
        }

        if(e.which == 40){
            // alert("DOWN");
            var tdIndex = $(".selected").index();
            var trIndex = $(".selected").parent().index();
            var trLength = $(".selected").parents("tbody").children().length;

            if((trIndex+1) < trLength){
                $(".selected").removeClass().parent().next().children().eq(tdIndex).addClass("selected red").find("input").focus();
            }
            else{
                alert("Out of abound!");
            }
        }

        if(e.which == 37){
            // alert("LEFT");
            var tdIndex = $(".selected").index();

            if(tdIndex > 1){
                $(".selected").removeClass().prev().addClass("selected red").find("input").focus();
            }else{
                alert("Out of abound!");
            }
        }

        if(e.which == 39){
            // alert("RIGHT");
            var tdIndex = $(".selected").index();
            var tdLength = $(".selected").parent().children().length;

            if((tdIndex+1) < tdLength){
                $(".selected").removeClass().next().addClass("selected red").find("input").focus();
            }else{
                alert("Out of abound!");
            }
        }
    });

    $("#tbl1").on("change",".myInput", function(){
        
        var trIndex = $(this).parent().index();
        var total = 0;

        $("#tbl1 tbody tr").filter(function(index){
            total += ($(this).find("td").eq(trIndex).find("input").val()*1);
        });

        $("#tbl1 tfoot tr td").eq(trIndex).html("<b>"+total+"</b>");
    });
});