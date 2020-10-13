<?php
script('ndcversionstatus', 'index');
style('ndcversionstatus', 'index');
?>

<div id="ndcversionstatus">

	<h2><?php p($l->t('Ndc Version Status')) ?></h2>

	<?php if($_['lastCheckTime']) { ?>
		<span>（<?php p($l->t('Last Time'))?>: <?php p($_['lastCheckTime'])?>）</span>
	<?php }?>

	<h3><?php p($l->t('Version Infos')) ?></h3>
	<ul>
		<li>
			<b><?php p($l->t('【NDCODFWEB】'))?></b> - <span><?php p($_['ndcodfweb'] ?? $l->t('Fail to get version.') )  ?></span>
		</li>
		<li>
			<b><?php p($l->t('【Odfweb】'))?></b> - <span><?php p($_['odfweb'] ?? $l->t('Fail to get version.') )?></span>
		</li>
	</ul>
	<br>

	<form id="hiddenForm" method="post" action="<?php p($_['redirectUrl']) ?>" >
		<input type="hidden" name="ndcodfweb" value="<?php p($_['ndcodfweb']) ?>" />
		<input type="hidden" name="odfweb" value="<?php p($_['odfweb']) ?>" />
		<input type="hidden" name="odfwebReferrer" value="<?php p($_['odfwebReferrer'])?>" />
	</form>

	<?php if($_['showButton']){ ?>
	<button url="<?php p($_['redirect_url']) ?>" id="checkBtn"><?php p($l->t('Check')) ?></button>
	<?php }?>

</div>
