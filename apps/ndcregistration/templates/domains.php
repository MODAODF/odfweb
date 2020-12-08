<?php
\OCP\Util::addStyle('ndcregistration', 'style');
\OCP\Util::addScript('ndcregistration', 'script');
?>
<ul class="error-wide">
	<li class='error'><?php p($l->t('Registration is only allowed for the following domains:')); ?>
	<?php
	foreach ($_['domains'] as $domain) {
		echo "<p class='hint'>";
		p($domain);
		echo "</p>";
	}
	?>
	</li>
</ul>
<p><a id="goback"><?php p($l->t('Back to previous page')); ?></a></p>
