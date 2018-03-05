function disChooseLink(th) {
    var did = $(th).attr('did');
    $(th).remove('span[did="' + did + '"]');
}

// 1 编辑 2 删除
selectLinkModel = 1;

function addModifyLinkChoose(th) {
    var dom = $('#showChoosedLink');
    var did = $(th).attr('did');

    var bewrite = $(th).attr('bewrite');
    var url = $(th).attr('url');
    var detailHtml = '<small style="color: darkgray">Url</small><br><a href="' + url + '">' + url + '</a><br><br>';
    detailHtml += '<small style="color: darkgray">链接说明</small><br>';
    if (!isStrEmpty_(bewrite))
        detailHtml += '<small>' + bewrite + '</small>';
    else detailHtml += '无';
    $('#showChoosedLinkDetail').html(detailHtml);

    if ($(dom).find('span[did="' + did + '"]').length !== 0) {
        return;
    }

    var title = $(th).html();
    var span = '<span did="' + did + '" class="modify-item-choosed" ' +
        'onclick="disChooseLink(this)">' + title + ' <span style="opacity: 0.5">x</span></span>';
    if (selectLinkModel === 1 && dom.html() !== '') {
        // 编辑时只能选择一个
        dom.html(span);
    } else dom.html(dom.html() + span);
}


function exeLinkUpdate(th, bloggerId, funWhenEditLinkSuccess) {
    if (checkHtmlEmpty('showChoosedLink')) {
        error('请选择链接', 'modifyLinkErrorMsg', true)
        return;
    }

    var newTitle = $('#editLinkTitle').val();
    var newUrl = $('#editLinkUrl').val();
    var newBewrite = $('#editLinkBewrite').val();
    if (isStrEmpty(newTitle) && isStrEmpty(newBewrite) && isStrEmpty(newUrl)) {
        error('请至少更新标题、url和说明其中之一', 'modifyLinkErrorMsg', true);
        return;
    }

    var data = '';
    if (!isStrEmpty(newTitle)) {
        data += 'title=' + newTitle + '&';
    }

    if (!isStrEmpty(newUrl)) {
        data += 'url=' + newUrl + '&';
    }

    if (!isStrEmpty(newBewrite)) {
        data += 'bewrite=' + newBewrite + '&';
    }

    data = data.substr(0, data.length - 1);
    var id = $('#showChoosedLink > span').attr('did');
    $.ajax({
        url: '/blogger/' + bloggerId + '/link/' + id,
        data: data,
        type: 'put',
        success: function (result) {
            if (result.code === 0) {
                disableButton(false, 'modifyEditLinkBtn', '修改成功', "button-disable");

                setTimeout(function () {
                    disableButton(true, 'modifyEditLinkBtn', '提交', "button-disable");
                    funWhenEditLinkSuccess();

                    $('#modifyLinkDialog').modal('hide');
                    $('#editLinkTitle').val('');
                    $('#editLinkBewrite').val('');

                    clearDiv('showChoosedLink');
                }, 1000);

            } else {
                error(result.msg, 'modifyLinkErrorMsg', false);
            }
        }
    });

}

function exeLinkDelete(th, bloggerId, funWhenDeleteLinkSuccess) {
    if (checkHtmlEmpty('showChoosedLink')) {
        error('请选择链接', 'modifyLinkErrorMsg', true)
        return;
    }

    var doms = $('#showChoosedLink > span');

    disableButton(false, 'modifyDeleteLinkBtn', '正在删除...', "button-disable");
    var i = 0;
    var fail = false;
    var msg = '';
    for (; i < doms.length; i++) {
        var id = $(doms[i]).attr('did');

        $.ajax({
            url: '/blogger/' + bloggerId + '/link/' + id,
            async: false,
            type: 'delete',
            success: function (result) {
                if (result.code !== 0) {
                    fail = true;
                    msg = result.msg;
                }
            }
        });

        if (fail) {
            error(msg, 'modifyLinkErrorMsg', true);
            return;
        }
    }

    disableButton(false, 'modifyDeleteLinkBtn', '删除成功', "button-disable");
    setTimeout(function () {
        disableButton(true, 'modifyDeleteLinkBtn', '删除', "button-disable");
        funWhenDeleteLinkSuccess();

        $('#modifyLinkDialog').modal('hide');
        clearDiv('showChoosedLink');
    }, 1000);

}