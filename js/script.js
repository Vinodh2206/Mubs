 
$(document).ready(function(){
    $(function () {



        $("#addRowMt").click(function () {
            console.log("Hello");
            //var row = $("<tr><td>1</td><td>E</td><td>E</td><td>E</td><td>E</td><td>E</td></tr>");
    		var row = $("<tr><td><input name='name' type='text' placeholder='Qualification' class='form-control input-md'  /> </td><td><input name='name' type='text' placeholder='Specialization' class='form-control input-md'  /> </td><td><input name='name' type='text' placeholder='University' class='form-control input-md'  /> </td><td><input name='name' type='text' placeholder='MM/YYYY' class='form-control input-md'  /> </td><td><input name='name' type='text' placeholder='MM/YYYY' class='form-control input-md'  /> </td><td><input name='name' type='text' placeholder='Marks%' class='form-control input-md'  /> </td></tr>");
            $("#mt > tbody").append(row);
        });
    });
});

$(document).ready(function(){
    $(function () {

        $("#addRowWh").click(function () {
            //var row = $("<tr><td>1</td><td>E</td><td>E</td><td>E</td><td>E</td><td>E</td></tr>");
    		var row = $("<tr><td><input name='name' type='text' placeholder='Employer' class='form-control input-md'  /> </td><td><input name='name' type='text' placeholder='Position' class='form-control input-md'  /> </td><td><input name='name' type='text' placeholder='Location' class='form-control input-md'  /> </td><td><input name='name' type='text' placeholder='MM/YYYY' class='form-control input-md'  /> </td><td><input name='name' type='text' placeholder='MM/YYYY' class='form-control input-md'  /> </td></tr>");
            $("#wh > tbody").append(row);
        });
    });
});
