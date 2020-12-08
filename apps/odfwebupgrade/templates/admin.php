<?php
script('odfwebupgrade', 'uploadZip');
/** @var array $_ */
?>
<div id="odfwebupgrade" class="section">
    <h3><b>Odfweb <?php p($l->t('Upgrade')) ?></b></h3>
    <form class="uploadForm" method="post" action="<?php p($_['uploadRoute']) ?>" style="display: inline-block;">
        <span style="font-size:15px;"><?php p($l->t('Select a file (.zip)')) ?></span>
		<input id="uploadZip" class="fileupload" name="uploadZip" type="file">
	</form>
    <button class="button openUpdater" disabled><?php p($l->t('Open updater')) ?></button>
    <span class="msg"></span>
</div>
