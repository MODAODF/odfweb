<?php
script('ndcversionstatus', 'result');
style('ndcversionstatus', 'index');
?>

<div id="ndcversionstatus">
	<h2><?php p($l->t('Ndc Version Status')) ?></h2>
	<h3><?php p($l->t('Version Check Result')) ?></h3>
	<ul>

		<?php if (isset($_['odfweb'])) { ?>
		<li>
			<b><?php p($l->t('【Odfweb】'))?></b> -
			<span><?php p($_['odfweb']['msg']) ?> </span>
			<span style="color:<?php p($_['odfweb']['color']) ?> ;">
				<?php p($_['odfweb']['result']); ?>
			</span>
		</li>
		<?php }?>

		<?php if (isset($_['ndcodfweb'])) { ?>
		<li>
			<b><?php p($l->t('【NDCODFWEB】'))?></b> -
			<span><?php p($_['ndcodfweb']['msg']) ?> </span>
			<span style="color:<?php p($_['ndcodfweb']['color']) ?> ;">
				<?php p($_['ndcodfweb']['result']); ?>
			</span>
		</li>
		<?php }?>

	</ul>

	<br /><br />
	<h3><?php p($l->t('Email members of admin group about check result: ')); ?></h3>
	<div><span class="msg"></span></div>
	<ul class="mailResult"></ul>
</div>
