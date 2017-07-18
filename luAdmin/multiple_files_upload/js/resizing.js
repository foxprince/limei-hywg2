// JavaScript Document

$.blueimp.fileupload.prototype.processActions.duplicateImage = function (data, options) {
    if (data.canvas) {
        data.files.push(data.files[data.index]);
    }
    return data;
};

$('#fileupload').fileupload({
    processQueue: [
        {
            action: 'loadImage',
            fileTypes: /^image\/(gif|jpeg|png)$/,
            maxFileSize: 20000000 // 20MB
        },
        {
            action: 'resizeImage',
            maxWidth: 1950,
            maxHeight: 1144
        },
        {action: 'saveImage'}
        
      
    ]
});
/**/