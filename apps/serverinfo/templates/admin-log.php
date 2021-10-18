<?php
$error = isset($_['error']) ? $_['error'] : null;
if(!$error) {
    script('serverinfo', 'jspdf.min.2.4.0');
    script('serverinfo', 'Chart.min.2.5.0');
    script('serverinfo', 'log');
    style('serverinfo', 'log');
    $resultDate = "近" . $_['days_number'] . "天";
    $resultDate .= "（" . $_['days_duration'] . "）";
}
?>

<div class="section server-info-log-wrapper">
    <h2>系統資訊 歷史記錄</h2>

    <?php if ($error): ?>
    <p><?php p($error); ?></p>
    <?php else: ?>

    <div class="search-wrapper">
        <div>
            <form id="searchLogs">
                <span>
                    查詢近
                    <input type="number" id="daysNumber" name="daysNumber" require min="1" max="90"
                        prevval="<?php p($_['days_number']) ?>" value="<?php p($_['days_number']) ?>"/>
                    天的紀錄
                </span>
                <button type="submit">查詢</button>
            </form>
            <div class="msg"></div>
            <em>快速查詢：<button data="1">1天</button> | <button data="7">7天</button> | <button data="30">30天</button> | <button data="60">60天</button> | <button data="90">90天</button></em>
        </div>
    </div>

    <div class="result-controller">
        <div>查詢結果：<b><?php p($resultDate) ?></b></div>
        <div>
            <input type="checkbox" id="hideNullData"/>
            <label for="hideNullData">隱藏無數據資料</label>
        </div>
        <div>
            <form id="downloadPdf">
                將結果下載為 PDF，檔案名稱：
                <span><input type="text" value="系統資訊查詢結果"/>.pdf</span>
                <button type="submit">下載</button>
            </form>
            <div class="pdfHead">
                <span id="servertitle"><?php p($_['server_overview']); ?></span>
                <span id="timestamp">查詢日期：<?php p($_['create_at']); ?></span>
            </div>
        </div>
    </div>

    <div class="charts-container">
        <div class="chart-wrapper">
            <div class="infobox">
                <div class="canvas-wrapper">
                    <div class="downloadPng"><a>下載此圖表(PNG)</a></div>
                    <canvas data-logs="<?php p(json_encode($_['disk_space'])) ?>"
                            id="logdiskspacecanvas"
                            style="width:100%; height:200px"
                            width="300" height="300"
                    ></canvas>
                </div>
            </div>
        </div>
        <div class="chart-wrapper">
            <div class="infobox">
                <div class="canvas-wrapper">
                    <div class="downloadPng"><a>下載此圖表(PNG)</a></div>
                    <canvas data-logs="<?php p(json_encode($_['files_num'])) ?>"
                            id="logfilecanvas"
                            style="width:100%; height:200px"
                            width="300" height="300"
                    ></canvas>
                </div>
            </div>
        </div>

        <div class="chart-wrapper">
            <div class="infobox">
                <div class="canvas-wrapper">
                    <div class="downloadPng"><a>下載此圖表(PNG)</a></div>
                    <canvas data-logs="<?php p(json_encode($_['users_num'])) ?>"
                            id="logusercanvas"
                            style="width:100%; height:200px"
                            width="300" height="300"
                    ></canvas>
                </div>
            </div>
        </div>

        <div class="chart-wrapper">
            <div class="infobox">
                <div class="canvas-wrapper">
                    <div class="downloadPng"><a>下載此圖表(PNG)</a></div>
                    <canvas data-logs="<?php p(json_encode($_['share_link_num'])) ?>"
                            id="logsharelinkcanvas"
                            style="width:100%; height:200px"
                            width="300" height="300"
                    ></canvas>
                </div>
            </div>
        </div>

        <div class="chart-wrapper">
            <div class="infobox">
                <div class="canvas-wrapper">
                    <div class="downloadPng"><a>下載此圖表(PNG)</a></div>
                    <canvas data-logs="<?php p(json_encode($_['share_user_num'])) ?>"
                            id="logshareusercanvas"
                            style="width:100%; height:200px"
                            width="300" height="300"
                    ></canvas>
                </div>
            </div>
        </div>

        <div class="chart-wrapper">
            <div class="infobox">
                <div class="canvas-wrapper">
                    <div class="downloadPng"><a>下載此圖表(PNG)</a></div>
                    <canvas data-logs="<?php p(json_encode($_['share_group_num'])) ?>"
                            id="logsharegroupcanvas"
                            style="width:100%; height:200px"
                            width="300" height="300"
                    ></canvas>
                </div>
            </div>
        </div>

        <div class="chart-wrapper">
            <div class="infobox">
                <div class="canvas-wrapper">
                    <div class="downloadPng"><a>下載此圖表(PNG)</a></div>
                    <canvas data-logs="<?php p(json_encode($_['cpu_load'])) ?>"
                            id="logcpuloadcanvas"
                            style="width:100%; height:200px"
                            width="300" height="300"
                    ></canvas>
                </div>
            </div>
        </div>
    </div>
    <?php endif; ?>
</div>