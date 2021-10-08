(function ($, OC) {
    var logDiskSpaceChart,
        logCpuLoadChart,
        logFileChart,
        logUserChart,
        logShareUserChart,
        logShareGroupChart,
        logShareLinkChart;

	$(window).load(function(){ resizeSystemCharts(); });
    $(window).resize(function(){ resizeSystemCharts(); });

    $('#downloadPdf').submit(function(e) {
        e.preventDefault();
        let pdfctxX = 50;
        let pdfctxY = 50;
        const buffer = 100
        const allCanvas = $('.charts-container').find('canvas');

        // Size of pdf page
        const pageHeight = $(allCanvas[0]).innerHeight()*allCanvas.length + buffer*(allCanvas.length+1);
        const pageWidth = $(allCanvas[0]).innerWidth() + buffer;

        // create a new canvas object to populate with all other canvas objects
        let pdfCanvas = $('<canvas />').attr({
            id: "canvaspdf",
            width: pageWidth,
            height: pageHeight,
        });
        let pdfctx = $(pdfCanvas)[0].getContext('2d');

        // pdf title
        const $title = $('#servertitle');
        const headWidth = $title.innerWidth();
        const headHeight = $title.innerHeight();
        const titleX = (pageWidth-headWidth)/2;
        pdfctx.font = 'bold ' + $title.css('font-size') + ' sans-serif';
        pdfctx.fillText($title.text(), titleX, pdfctxY);
        const { width } = pdfctx.measureText($title.text());
        pdfctx.fillRect(titleX, pdfctxY, width+5, 2);
        pdfctxY += headHeight;

        const $time = $('#timestamp');
        const timeWidth = $time.innerWidth();
        const timeHeight = $time.innerHeight();
        const timeX = (pageWidth-timeWidth)/2;
        pdfctx.font = 'normal ' + $time.css('font-size') + ' sans-serif';
        pdfctx.fillStyle = '#515151';
        pdfctx.fillText($time.text(), timeX, pdfctxY);
        pdfctxY += timeHeight + 50;

        allCanvas.each(function() {
            var canvasHeight = $(this).innerHeight();
            var canvasWidth = $(this).innerWidth();
            // draw the chart into the new canvas
            pdfctx.drawImage($(this)[0], pdfctxX, pdfctxY, canvasWidth, canvasHeight);
            pdfctxY += canvasHeight + buffer;
        });

        // create new pdf and add our new canvas as an image
        const { jsPDF } = window.jspdf;
        let pdf = new jsPDF('p', 'pt', [pageWidth/96*72, pageHeight/96*72]); // px/96*72 = pt
        pdf.addImage($(pdfCanvas)[0], 'PNG', 0, 0);

        const filename = $(this).find('input').val() ?? '系統資訊查詢結果';
        pdf.save(filename + '.pdf');
    })

    $('#daysInterval').focus(function() {
        $(this).attr('prevval', this.value)
    })

    $('#daysInterval').on('input', function() {
        const inputDays = Number(this.value);
        if (!inputDays || inputDays < 1 || inputDays > 90) {
            $('.msg').html('有效查詢天數為 1-90 天').show();
            $('button[type=submit]').attr('disabled', 'disabled');
        } else {
            $('button[type=submit]').removeAttr('disabled');
            $('.msg').html('');
        }
    });

    $('button[data]').on('click',function() {
        $('#daysInterval').val($(this).attr('data'))
        $('#searchLogs').submit()
    })

    $('#searchLogs').submit(function(e) {
        e.preventDefault();
        const $msg = $('.msg');
        const $charts = $('.charts-container');
        const $input = $('#daysInterval');
        const inputDays = Number($input.val());
        if (inputDays === Number($input.attr('prevval'))) {
            $charts.css('opacity', '0.3');
            setTimeout(function(){
                $charts.css("opacity", 'unset');
              }, 150);
            return;
        };

        $.ajax({
            url: OC.generateUrl('/apps/serverinfo/log/' + inputDays),
            type: 'GET',
            context: this,
            beforeSend: function() {
                $charts.css('opacity', '0.3');
                $('.days-interval-wrapper').find('button, input').attr('disabled', 'disabled')
                $('.download-pdf-wrapper').hide();
                $msg.html('').hide()
            },
        })
        .done(function(resp) {
            if(Number(resp["days_interval"]) !== inputDays) {
                $msg.html('（目前僅有近' + resp["days_interval"] + '天的歷史記錄）').show()
            }
            $input.val(resp["days_interval"]).attr('prevval', resp["days_interval"]);
            updateDiskSpace(resp["disk_space"]);
            updateCupLoad(resp["cpu_load"]);
            updateFile(resp["files_num"]);
            updateUser(resp["users_num"]);
            updateShare('user', resp["share_user_num"]);
            updateShare('group', resp["share_group_num"]);
            updateShare('link', resp["share_link_num"]);
            $charts.show();
        })
        .fail(function(resp) {
            const msg = resp.responseJSON?.message ?? '無法查詢歷史記錄'
            $msg.html(msg).show()
            $charts.hide();
        })
        .always(function() {
            $charts.css('opacity', 'unset');
            $('.days-interval-wrapper').find('button, input').removeAttr('disabled')
        });
    })

    function getThemedPrimaryColor() {
        return OCA.Theming ? OCA.Theming.color : 'rgb(54, 129, 195)';
    }

    function _formatDate(date, fotmatStr) {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1) // .padStart(2,'0');
        const day = String(d.getDate()) // .padStart(2,'0');
        const hour = String(d.getHours()).padStart(2,'0');
        const min = String(d.getMinutes()).padStart(2,'0');
        const sec = String(d.getSeconds()).padStart(2,'0');
        fotmatStr = fotmatStr.replaceAll(/Y/g, year).replaceAll(/M/g, month).replaceAll(/D/g, day).replaceAll(/h/g, hour).replaceAll(/m/g, min).replaceAll(/s/g, sec);
        return fotmatStr;
    }

    function _formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    // X軸 標題名稱
    function _getScaleLabel(labels) {
        const labelYears = [], labelDays = [];
        labels.forEach(function(el) {
            const y = _formatDate(el, 'Y');
            const ymd = _formatDate(el, 'Y-M-D');
            if( !labelYears.includes(y) ) labelYears.push(y);
            if( !labelDays.includes(ymd) ) labelDays.push(ymd);
        })
        let str = _formatDate(labelDays[0],"西元Y年M月D日") + ' 至 ' + _formatDate(labelDays[labelDays.length-1],"西元Y年M月D日")
        if (labelDays.length === 1) {
            str = _formatDate(labelDays[0], '西元Y年M月D日');
        }
        else if (labelYears.length === 1) {
            str = `西元${labelYears[0]}年（${_formatDate(labelDays[0], 'M月D日')} 至 ${_formatDate(labelDays[labelDays.length-1], 'M月D日')}）`
        }
        return {display:true,labelString:str};
    }

    // X軸 標籤名稱們
    function _formatLabels(labels) {
        const labelYears = [], labelDays = [];
        labels.forEach(function(el) {
            const y = _formatDate(el, 'Y');
            const ymd = _formatDate(el, 'Y-M-D');
            if( !labelYears.includes(y) ) labelYears.push(y);
            if( !labelDays.includes(ymd) ) labelDays.push(ymd);
        })
        let formatStr = '["Y年M月D日"]';
        if (labelDays.length === 1) formatStr = '["h時m分"]';
        else if (labelDays.length < 4) formatStr = '["M月D日", "h時m分"]';
        else if (labelYears.length === 1) formatStr = '["M月D日"]';
        let res = labels.map(el => JSON.parse(_formatDate(el, formatStr)))
        return res;
    }

    function resizeSystemCharts() {
        const canvasWidth = function(el) {
            const parent = el.parents('.infobox').width() - 30;
            el.width(parent);
            el.attr('width', parent);
        }

        canvasWidth($("#logdiskspacecanvas"));
        updateDiskSpace();

        canvasWidth($("#logcpuloadcanvas"));
        updateCupLoad();

        canvasWidth($("#logfilecanvas"));
        updateFile();

        canvasWidth($("#logusercanvas"));
        updateUser();

        canvasWidth($("#logshareusercanvas"));
        updateShare('user');

        canvasWidth($("#logsharegroupcanvas"));
        updateShare('group');

        canvasWidth($("#logsharelinkcanvas"));
        updateShare('link');
    }

    function _onChartComplete(ctx, chartObj, title) {
        $('.download-pdf-wrapper').show();
        const $a = $(ctx).siblings('.downloadPng').find('a')
        $a.show();
        $a.attr('href', chartObj.toBase64Image());
        $a.attr('download', title + '.png')
    }

    function updateDiskSpace(updatedata) {
        const dataObj = updatedata ?? $('#logdiskspacecanvas').data('logs');
        const logLabels = Object.keys(dataObj);
        const _getTooltipsTitle = (idx) => logLabels[idx];

        let logData = {'totalSpace':[], 'freeSpace':[]};
        for (const [key, value] of Object.entries(dataObj)) {
            logData['totalSpace'].push(value['totalSpace']);
            logData['freeSpace'].push(value['freeSpace']);
        }

        let stepSize = Math.max.apply(null, logData['totalSpace'])/5;
		if (typeof logDiskSpaceChart === 'undefined') {
            const canvasTitle = '硬碟空間';
            var ctx = document.getElementById("logdiskspacecanvas");
            var chartConfig = {
				type: 'line',
				options: {
                    animation: {
                        onComplete: function() {
                            _onChartComplete(ctx, logDiskSpaceChart, canvasTitle);
                        }
                    },
                    responsive: true,
                    title: {
                        display: true,
                        text: canvasTitle
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(tooltipItem, data) {
                                return _formatBytes(tooltipItem.yLabel);
                            },
                            title: function(tooltipItem, data) {
                                return _getTooltipsTitle(tooltipItem[0].index);
                            }
                        }
                    },
                    hover: {
                        mode: 'nearest',
                        intersect: true
                    },
                    elements: {
                        point: {
                            radius: 0
                        }
                    },
					scales: {
                        xAxes: [{
                            scaleLabel: _getScaleLabel(logLabels),
                            ticks: {
                                autoSkip: true,
                                maxTicksLimit: 6,
                                maxRotation: 0,
                            }
                        }],
						yAxes: [{
							ticks: {
                                autoSkip: true,
                                minTicksLimit: 5,
                                min: 0,
                                suggestedMax: Math.max.apply(null, logData['totalSpace']) + stepSize,
                                callback: function(value, index, values) {
                                    return _formatBytes(value);
                                },
                            }
                        }],
					}
				},
				data: {
                    labels: _formatLabels(logLabels),
					datasets: [
                        {
                            label: "可用空間",
                            data: logData['freeSpace'],
                            fill: true,
                            showLine: true,
                            tension: 0.2,
                            backgroundColor: getThemedPrimaryColor(),
                            borderColor: 'rgb(0,0,0,0)',
                        },
                        {
                            label: "總空間",
                            data: logData['totalSpace'],
                            fill: true,
                            showLine: true,
                            tension: 0.2,
                            borderWidth: 2,
                            borderDashOffset: 0.1,
                        },
                    ]
				},
            }
            logDiskSpaceChart = new Chart(ctx, chartConfig);
        } else if (updatedata) {
            logDiskSpaceChart.config.data.datasets[0].data = logData['freeSpace'];
            logDiskSpaceChart.config.data.datasets[1].data = logData['totalSpace'];
            logDiskSpaceChart.config.data.labels = _formatLabels(logLabels);
            logDiskSpaceChart.config.options.scales['xAxes'][0].scaleLabel = _getScaleLabel(logLabels);
            logDiskSpaceChart.config.options.tooltips.callbacks.title = (tooltipItem, data) => _getTooltipsTitle(tooltipItem[0].index);

            stepSize = (logDiskSpaceChart.scales['y-axis-0']?.ticksAsNumbers[0] - logDiskSpaceChart?.scales['y-axis-0']?.ticksAsNumbers[1]) ?? stepSize;
            logDiskSpaceChart.config.options.scales.yAxes[0].ticks.suggestedMax = Math.max.apply(null, logData['totalSpace']) + stepSize;
        }
        logDiskSpaceChart.update();
    }

    function updateCupLoad(updatedata) {
		const dataObj = updatedata ?? $('#logcpuloadcanvas').data('logs')
        const logData = Object.values(dataObj)
        const logLabels = Object.keys(dataObj)
        const _getTooltipsTitle = (idx) => logLabels[idx];

		if (typeof logCpuLoadChart === 'undefined') {
            const canvasTitle = '負載';
            var ctx = document.getElementById("logcpuloadcanvas");
            var chartConfig = {
                type: 'line',
                options: {
                    animation: {
                        onComplete: function() {
                            _onChartComplete(ctx, logCpuLoadChart, canvasTitle);
                        }
                    },
                    responsive: true,
					legend: { display: false },
                    title: {
                        display: true,
                        text: canvasTitle,
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            title: function(tooltipItem, data) {
                                return _getTooltipsTitle(tooltipItem[0].index);
                            }
                        }
                    },
                    hover: {
                        mode: 'nearest',
                        intersect: true
                    },
                    elements: {
                        point: {
                            radius: 0
                        }
                    },
                    scales: {
                        xAxes: [{
                            scaleLabel: _getScaleLabel(logLabels),
                            ticks: {
                                autoSkip: true,
                                maxTicksLimit: 6,
                                maxRotation: 0,
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                autoSkip: true,
                                maxTicksLimit: 5,
                                max: Math.max.apply(null, logData) + 0.5,
                                min: 0,
                            }
                        }],
                    }
                },
                data: {
                    labels: _formatLabels(logLabels),
                    datasets: [{
                        label: "負載",
                        data: logData,
                        fill: true,
                        fillOpacity: 0.3,
                        tension: 0.2,
                        backgroundColor: getThemedPrimaryColor(),
                        borderColor: 'rgb(0,0,0,0)',
                    }]
                },
            }
			logCpuLoadChart = new Chart(ctx, chartConfig);
		} else if (updatedata) {
            logCpuLoadChart.config.data.datasets[0].data = logData;
            logCpuLoadChart.config.data.labels = _formatLabels(logLabels);
            logCpuLoadChart.config.options.scales['xAxes'][0].scaleLabel = _getScaleLabel(logLabels);
            logCpuLoadChart.config.options.tooltips.callbacks.title = (tooltipItem, data) => _getTooltipsTitle(tooltipItem[0].index);
        }
		logCpuLoadChart.update();
    }

    function updateFile(updatedata) {
		const dataObj = updatedata ?? $('#logfilecanvas').data('logs')
        const logData = Object.values(dataObj)
        const logLabels = Object.keys(dataObj)
        const _getTooltipsTitle = (idx) => logLabels[idx];

		if (typeof logFileChart === 'undefined') {
            const canvasTitle = '檔案總數';
            var ctx = document.getElementById("logfilecanvas");
            var chartConfig = {
                type: 'line',
                options: {
                    animation: {
                        onComplete: function() {
                            _onChartComplete(ctx, logFileChart, canvasTitle);
                        }
                    },
                    responsive: true,
					legend: { display: false },
                    title: {
                        display: true,
                        text: canvasTitle,
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            title: function(tooltipItem, data) {
                                return _getTooltipsTitle(tooltipItem[0].index);
                            }
                        }
                    },
                    hover: {
                        mode: 'nearest',
                        intersect: true
                    },
                    elements: {
                        point: {
                            radius: 0
                        }
                    },
                    scales: {
                        xAxes: [{
                            scaleLabel: _getScaleLabel(logLabels),
                            ticks: {
                                autoSkip: true,
                                maxTicksLimit: 6,
                                maxRotation: 0,
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                autoSkip: true,
                                maxTicksLimit: 5,
                                suggestedMax: Math.max.apply(null, logData) + 1,
                            }
                        }],
                    }
                },
                data: {
                    labels: _formatLabels(logLabels),
                    datasets: [
                        {
                            label: "檔案總數",
                            data: logData,
                            fill: true,
                            tension: 0.2,
                            backgroundColor: getThemedPrimaryColor(),
                            borderColor: 'rgb(0,0,0,0)',
                        }
                    ]
                },
            }
			logFileChart = new Chart(ctx, chartConfig);
		} else if (updatedata) {
            logFileChart.config.data.datasets[0].data = logData;
            logFileChart.config.data.labels = _formatLabels(logLabels);
            logFileChart.config.options.scales['xAxes'][0].scaleLabel = _getScaleLabel(logLabels);
            logFileChart.config.options.tooltips.callbacks.title = (tooltipItem, data) => _getTooltipsTitle(tooltipItem[0].index);
        }
		logFileChart.update();
    }

    function updateUser(updatedata) {
		const dataObj = updatedata ?? $('#logusercanvas').data('logs')
        const logLabels = Object.keys(dataObj);
        const _getTooltipsTitle = (idx) => logLabels[idx];

        let logData = { 'totalUser':[], 'hourActiveUser':[] };
        for (const [key, value] of Object.entries(dataObj)) {
            logData['totalUser'].push(value['totalUser']);
            logData['hourActiveUser'].push(value['hourActiveUser']);
        }

		let	stepSize = 0;
		if (Math.max.apply(null, logData['totalUser']) < 10) {
			stepSize = 1;
		}

		if (typeof logUserChart === 'undefined') {
            const canvasTitle = '使用者數量';
            var ctx = document.getElementById("logusercanvas");
            var chartConfig = {
                type: 'line',
                options: {
                    animation: {
                        onComplete: function() {
                            _onChartComplete(ctx, logUserChart, canvasTitle);
                        }
                    },
                    responsive: true,
                    title: {
                        display: true,
                        text: canvasTitle,
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            title: function(tooltipItem, data) {
                                return _getTooltipsTitle(tooltipItem[0].index);
                            }
                        }
                    },
                    hover: {
                        mode: 'nearest',
                        intersect: true
                    },
                    elements: {
                        point: {
                            radius: 0
                        }
                    },
                    scales: {
                        xAxes: [{
                            scaleLabel: _getScaleLabel(logLabels),
                            ticks: {
                                autoSkip: true,
                                maxTicksLimit: 6,
                                maxRotation: 0,
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                stepSize: stepSize,
                                autoSkip: !(stepSize === 1),
                                maxTicksLimit: 5,
                                suggestedMax: Math.max.apply(null, logData['totalUser']) + (stepSize === 1 ? 1:5),
                            }
                        }],
                    }
                },
                data: {
                    labels: _formatLabels(logLabels),
                    datasets: [
                        {
                            label: "小時活動人數",
                            data: logData['hourActiveUser'],
                            fill: true,
                            showLine: true,
                            tension: 0.2,
                            backgroundColor: getThemedPrimaryColor(),
                            borderColor: 'rgb(0,0,0,0)',
                        },
                        {
                            label: "總使用者",
                            data: logData['totalUser'],
                            fill: true,
                            showLine: true,
                            tension: 0.2,
                            borderWidth: 2,
                            borderDashOffset: 0.1,
                        },
                    ]
                },
            }
			logUserChart = new Chart(ctx, chartConfig);
		} else if (updatedata) {
            logUserChart.config.data.datasets[0].data = logData["hourActiveUser"];
            logUserChart.config.data.datasets[1].data = logData["totalUser"];
            logUserChart.config.data.labels = _formatLabels(logLabels);
            logUserChart.config.options.scales['xAxes'][0].scaleLabel = _getScaleLabel(logLabels);
            logUserChart.config.options.tooltips.callbacks.title = (tooltipItem, data) => _getTooltipsTitle(tooltipItem[0].index);
        }
		logUserChart.update();
    }

    function updateShare(type, updatedata) {
        let canvasId = null;
        let canvasTitle = '每小時分享數量';
        switch (type) {
            case 'user':
                canvasId = 'logshareusercanvas';
                canvasTitle += ' (使用者)';
                break;
            case 'group':
                canvasId = 'logsharegroupcanvas';
                canvasTitle += ' (群組)';
                break;
            case 'link':
                canvasId = 'logsharelinkcanvas';
                canvasTitle += ' (外部連結)';
                break;
            default:
                return;
        }

		const dataObj = updatedata ?? $('#' + canvasId).data('logs')
        const logData = Object.values(dataObj)
        const logLabels = Object.keys(dataObj)
        const _getTooltipsTitle = (idx) => logLabels[idx];

		let	stepSize = 0;
		if (Math.max.apply(null, logData) < 10) {
			stepSize = 1;
        }

        var chartConfig = {
            type: 'line',
            options: {
                animation: {
                    onComplete: function() {
                        const ctx = document.getElementById(canvasId);
                        if(type === 'user') _onChartComplete(ctx, logShareUserChart, canvasTitle);
                        if(type === 'group') _onChartComplete(ctx, logShareGroupChart, canvasTitle);
                        if(type === 'link') _onChartComplete(ctx, logShareLinkChart, canvasTitle);
                    }
                },
                responsive: true,
                legend: { display: false },
                title: {
                    display: true,
                    text: canvasTitle
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        title: function(tooltipItem, data) {
                            return _getTooltipsTitle(tooltipItem[0].index);
                        }
                    }
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                elements: {
                    point: {
                        radius: 0
                    }
                },
                scales: {
                    xAxes: [{
                        scaleLabel: _getScaleLabel(logLabels),
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 6,
                            maxRotation: 0,
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            min: 0,
                            stepSize: stepSize,
                            autoSkip: !(stepSize === 1),
                            maxTicksLimit: 5,
                            suggestedMax: Math.max.apply(null, logData) + (stepSize === 1 ? 1:5),
                        }
                    }],
                }
            },
            data: {
                labels: _formatLabels(logLabels),
                datasets: [
                    {
                        label: "分享數量",
                        data: logData,
                        fill: true,
                        tension: 0.2,
                        backgroundColor: getThemedPrimaryColor(),
                        borderColor: 'rgb(0,0,0,0)',
                    }
                ]
            },
        }

        const newLabelTitle = _getScaleLabel(logLabels);
        const newLabelItem = _formatLabels(logLabels);
        if (type === 'user') {
            if (typeof logShareUserChart === 'undefined') {
                var ctx = document.getElementById(canvasId);
                logShareUserChart = new Chart(ctx, chartConfig);
            } else if (updatedata) {
                logShareUserChart.config.data.labels = newLabelItem;
                logShareUserChart.config.data.datasets[0].data = logData;
                logShareUserChart.config.options.scales['xAxes'][0].scaleLabel = newLabelTitle;
                logShareUserChart.config.options.tooltips.callbacks.title = (tooltipItem, data) => _getTooltipsTitle(tooltipItem[0].index);
            }
            logShareUserChart.update();
        }
        else if (type === 'group') {
            if (typeof logShareGroupChart === 'undefined') {
                var ctx = document.getElementById(canvasId);
                logShareGroupChart = new Chart(ctx, chartConfig);
            } else if (updatedata) {
                logShareGroupChart.config.data.labels = newLabelItem;
                logShareGroupChart.config.data.datasets[0].data = logData;
                logShareGroupChart.config.options.scales['xAxes'][0].scaleLabel = newLabelTitle;
                logShareGroupChart.config.options.tooltips.callbacks.title = (tooltipItem, data) => _getTooltipsTitle(tooltipItem[0].index);
            }
            logShareGroupChart.update();
        }
        else if (type === 'link') {
            if (typeof logShareLinkChart === 'undefined') {
                var ctx = document.getElementById(canvasId);
                logShareLinkChart = new Chart(ctx, chartConfig);
            } else if (updatedata) {
                logShareLinkChart.config.data.labels = newLabelItem;
                logShareLinkChart.config.data.datasets[0].data = logData;
                logShareLinkChart.config.options.scales['xAxes'][0].scaleLabel = newLabelTitle;
                logShareLinkChart.config.options.tooltips.callbacks.title = (tooltipItem, data) => _getTooltipsTitle(tooltipItem[0].index);
            }
            logShareLinkChart.update();
        }

    }
})(jQuery, OC);
