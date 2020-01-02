/* Filename: custom.js */
$(document).ready(function() {

    $("#addBtn").on("click",function(){
        var fullName = $("#fullName").val();
        var mark1 = $("#mark1").val();
        var mark2 = $("#mark2").val();

        if(fullName != ""){
            var totalSum = 0;

            var countRow = $("#kiroMano").find('tbody').find('tr').length;

            var addNewRow = '<tr>'+
                            '<td>'+(countRow+1)+'</td>'+
                            '<td>'+fullName+'</td>'+
                            '<td><input type="number" class="marks" id="mark1_'+(countRow+1)+'" value="'+mark1+'" name="id_'+(countRow+1)+'[]"/></td>'+
                            '<td><input type="number" class="marks" id="mark2_'+(countRow+1)+'" value="'+mark2+'" name="id_'+(countRow+1)+'[]"/></td>'+
                            '<td class="subTotal">'+((mark1*1)+(mark2*1))+'</td>'+
                            '<td><button class="delBtn" id="del_'+(countRow+1)+'">Delete</button></td>'+
                            '</tr>';

                            
            $("#kiroMano").find('tbody').append(addNewRow);

            // $(".subTotal").each(function(index){
            //     totalSum += ($(this).html()*1);
            // });
            

            $("#totalSum").html(totalSum);
            recountTotal();

            $("#fullName").val("");
            $("#mark1").val("");
            $("#mark2").val("");
        }
        else {
            alert("Please insert your name.");
        }
        
    });

    $("#tableMark").on("change , keyup",".marks",function(){
        var idMark = $(this).attr("id");
        
        var idSplit = idMark.split("_");
        var curMark1 = $("#mark1_"+idSplit[1]).val();
        var curMark2 = $("#mark2_"+idSplit[1]).val();

        var rowSubTotal = $(this).parents("tr").find(".subTotal");

        if((curMark1*1)+(curMark2*1) < 60){
            rowSubTotal.css("background-color","#ff9c9c");
        }else{
            rowSubTotal.css("background-color","#a2ffa2");
        }

        rowSubTotal.html((curMark1*1)+(curMark2*1));
        // console.log(curMark1);
        recountTotal();

    });

    $("#tableMark").on("click",".delBtn",function(){
        // alert($(this).attr("id"));
        $(this).parents("tr").remove();

        recountTotal();
    });

    $("#saveBtn").click(function(){
        var host = "http://localhost/trainings/trainingJquery-v3/";

        console.log($("#tableFormMark").serialize());

        $.ajax({
            url: host + "myController.php",
            type: 'post',
            dataType: 'html',
            data: $("#tableFormMark").serialize(),
        })
        .done(function(data) {
            // if (data.status != "fail") {
            //     window.prompt("Token as below:" , data.licenseRegistries[0].token);
            // } else {
            //     alert("Key or Email not Valid");
            // }
        })
        .fail(function() {
            alert("Error connecting to license server.");
        })
        .always(function() {
            console.log("complete");
        });
    });
 });


 function recountTotal(){
     var subTotal = $(".subTotal");
     var totalSum = 0;

     if(subTotal.length > 0){
         $.each(subTotal,function(key,value){

            var tdRow = $("#tableMark").find("tbody").find("tr").eq(key).find("td");

            if((subTotal[key].innerHTML*1) < 60){
                tdRow.eq(4).css("background-color","#ff9c9c");
            }
            else{
                tdRow.eq(4).css("background-color","#a2ffa2");
            }
            totalSum += (subTotal[key].innerHTML*1);
            tdRow.eq(0).html(key+1);
         });

         $("#totalSum").text(totalSum);
     }else{
        $("#totalSum").text(totalSum);
     }
 }