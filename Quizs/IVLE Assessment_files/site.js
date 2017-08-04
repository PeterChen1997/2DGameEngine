/*
 * You may include other useful javascript code.
 * This JS has been included in MasterPage_Base.master. 
 */

$(document).ready(function () {

    //Start - Popover tooltip
    $("[data-toggle='popover']").mouseenter(function () {
        $(this).popover("show");
    });

    $("[data-toggle='popover']").mouseleave(function () {
        $(this).popover("hide");
    });
    //End - Popover tooltip

});

//Start - Modal
function ShowModal(id) {
    $('#' + id).modal('show');
}

function HideModal(id) {
    $('#' + id).modal('hide');
}
//End - Modal

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search.toLowerCase());
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

//parameters 
//inputSelector: jquery selector for the input field, input field has to follow bootstrap form-group layout
//buttonSelectorForValidate: jquery selector for the button or other control which needs to be disabled when validation fail
function requireFieldValidator(inputSelector, buttonSelectorForValidate) {
    $(inputSelector).focusin(function () {
        if ($(this).parent().hasClass("has-error"))
            $(this).parent().removeClass("has-error");
        if (buttonSelectorForValidate != undefined && buttonSelectorForValidate != "") {
            $(buttonSelectorForValidate).prop("disabled", false);
            $(".form-group").each(function () {
                if ($(this).hasClass("has-error")) {
                    $(buttonSelectorForValidate).prop("disabled", true);
                    return;
                }
            });
        }
    });
    $(inputSelector).focusout(function () {
        if ($(this).val().length == 0) {
            if (!$(this).parent().hasClass("has-error"))
                $(this).parent().addClass("has-error");
            if (buttonSelectorForValidate != undefined && buttonSelectorForValidate != "")
                $(buttonSelectorForValidate).prop('disabled', true);
        }
    });
}
//parameters 
//inputSelector: jquery selector for the input field, input field has to follow bootstrap form-group layout
//buttonSelectorForValidate: jquery selector for the button or other control which needs to be disabled when validation fail
function MaxLengthValidator(inputSelector, buttonSelectorForValidate, maxlength) {
    $(inputSelector).focusin(function () {
        if ($(this).parent().hasClass("has-error"))
            $(this).parent().removeClass("has-error");
        if (buttonSelectorForValidate != undefined && buttonSelectorForValidate != "") {
            $(buttonSelectorForValidate).prop("disabled", false);
            $(".form-group").each(function () {
                if ($(this).hasClass("has-error")) {
                    $(buttonSelectorForValidate).prop("disabled", true);
                    return;
                }
            });
        }
    });
    $(inputSelector).focusout(function () {
        if ($(this).val().length > maxlength) {
            if (!$(this).parent().hasClass("has-error"))
                $(this).parent().addClass("has-error");
            if (buttonSelectorForValidate != undefined && buttonSelectorForValidate != "")
                $(buttonSelectorForValidate).prop('disabled', true);
        }
    });
}

//check word limit for essay questions in survey and project
function CheckWordLimit(control) {
    var words = control.val().match(/\S+/g).length;
    var limit = parseInt(control.attr("wordlimit"));
    if (words > limit) {

        var trimmed = control.val().trim().split(/\s+/, limit).join(" ");
        // Add a space at the end to keep new typing making new words
        if (control.val() != trimmed) {
            control.val(trimmed + " ");
            control.change();
        }
        words = limit;
    }
    var id = control.attr("id");
    var left = limit - words;
    if ($("#cntdis" + id) == null) {
        $("#cntdis" + id).html(words);
        $("#cntleft" + id).html(left);
    } else {
        $("#info" + id).html("Total word count: <span id=\"cntdis" + id + "\">" + words + "</span> words. Words left: <span id=\"cntleft" + id + "\" class=\"text-danger\">" + left + "</span>");
    }
}