/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

var jpdbBaseURL = 'http://api.login2explore.com:5577';
var jpdbIRL ='/api/irl';
var jpdbIML ='/api/iml';
var DBName ='SCHOOL-DB';
var RelationName ='STUDENT-TABLE';
var connToken ='90931289|-31949327943897364|90961126';
$("#rollno").focus();

function saveRecNo2LS(jsonObj) {
    var tvData = JSON.parse(jsonObj.data);
    localStorage.setItem('recno', tvData.rec_no);
    
}

function getrollnoAsJsonObj() {
    var rollno = $('#rollno').val();
    var jsonStr = {
        id: rollno
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj){
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $("#name").val(record.name);
    $("#clas").val(record.class); 
    $("#birth").val(record.birth);
    $("#address").val(record.address);
    $("#date").val(record.dateion);
}

function resetForm() {
    $("#emoid").val("");
    $("#name").val("");
    $("#clas").val("");
    $("#birth").val("");
    $("#address").val("");
    $("#date").val("");
    $("#rollno").prop("disabled", false);
    $("#save").prop("disabled", true);
    $("#change").prop("disabled", true);
    $("#reset").prop("disabled", true);
    $("#rollno").focus();
}

function validateData() {
    var rollno, name, clas, birth, address, date;
    rollno = $("#rollno").val();
    name = $("#name").valueOf();
    clas = $("#clas").val();
    birth = $("#birth").val();
    address = $("#address").val();
    date = $("#date").val();
    if (rollno === '') {
        alert('Student roll missing');
        $("#rollno").focus();
        return "";
    }
    if (name === '') {
        alert('Student Name missing');
        $("#name").focus();
        return "";
    }
    if (clas === '') {
        alert('Student class missing');
        $("#clas").focus();
        return "";
    }
    if (birth === '') {
        alert('birth missing');
        $("#birth").focus();
        return "";
    }
    if (address === '') {
        alert('address missing');
        $("#address").focus();
        return "";
    }
    if (date === '') {
        alert('date  missing');
        $("#date").focus();
        return "";
    }
    var jsonStrObj = {
        id: rollno,
        name: name,
        class: clas,
        birth: birth,
        address: address,
        dateion: date
    };
    return JSON.stringify(jsonStrObj);
}



function getStd() {
    var rollnoJsonObj = getrollnoAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken,DBName,RelationName,rollnoJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest,jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async: true});
    if (resJsonObj.status === 400) {
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#name").focus();
    } else if (resJsonObj.status === 200) {
        $("#rollno").prop("disabled", true);
        fillData(resJsonObj);
        
        $("#change").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#name").focus();
    }
}


function saveData() {
    var jsonStrObj = validateData();
    if (jsonStrObj === '') {
        return "";
    }
    var putRequest = createPUTRequest(connToken,jsonStrObj,DBName,RelationName);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest,jpdbBaseURL,jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $("#rollno").focus();
}

function changeData() {
    $("#change").prop("disabled", true);
    jsonChg = validateData();
    var updateRequest = createUPDATERecordRequest(connToken,jsonChg,DBName,RelationName,localStorage.getItem("recno"));
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest,jpdbBaseURL,jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    resetForm();
    $("#rollno").focus();
}








